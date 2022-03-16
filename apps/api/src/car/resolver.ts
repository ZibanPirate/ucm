import { Car } from "@ucm/models/dist/car";
import { FilterOption } from "@ucm/models/dist/filter-option";
import { Max, Min } from "class-validator";
import { Arg, Args, ArgsType, Field, Int, ObjectType, Query, Resolver } from "type-graphql";

import { RangeOption } from "../types";
import cars from "./cars.json";
import { getYearFromFirstRegistration, stretchRange } from "./utils";

@ArgsType()
class CarsArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field(() => [String])
  filters: string[] = []; // "[filterName]:[stringified filter values]"
}

@ObjectType()
export class CarsQuery<CarFields extends keyof Car = keyof Car> {
  @Field(() => [Car])
  result!: Pick<Car, CarFields>[];

  @Field(() => [FilterOption])
  filters!: FilterOption[];
}

export type CarQuery<CarFields extends keyof Car = keyof Car> = Pick<Car, CarFields>;

const allowedCarFilters = {
  make: true,
  model: true,
  firstRegistration: true,
  fuel: true,
  gearbox: true,
  exteriorColor: true,
  category: true,
  mileage: true,
  power: true,
  price: true,
} as const;

type CarFilterName = keyof typeof allowedCarFilters;

@Resolver()
export class CarResolver {
  @Query(() => Car)
  async car(@Arg("offerID") offerID: string): Promise<CarQuery | undefined> {
    return cars.find((car) => car.offerID === offerID);
  }

  @Query(() => CarsQuery)
  async cars<CarFields extends keyof Car>(
    @Args() { skip, take, filters }: CarsArgs,
  ): Promise<CarsQuery<CarFields>> {
    const makeOptions: Record<string, boolean> = {};
    const modelOptions: Record<string, boolean> = {};
    const firstRegistrationOptions: Record<string, boolean> = {};
    const fuelOptions: Record<string, boolean> = {};
    const gearboxOptions: Record<string, boolean> = {};
    const exteriorColorOptions: Record<string, boolean> = {};
    const categoryOptions: Record<string, boolean> = {};

    let mileageRange: RangeOption = [Number.MAX_VALUE, 0];
    let powerRange: RangeOption = [Number.MAX_VALUE, 0];
    let priceRange: RangeOption = [Number.MAX_VALUE, 0];

    const result = cars
      .filter((car) => {
        const filtersRecord = filters.reduce<Partial<Record<CarFilterName, string[]>>>((pV, cV) => {
          const [filterName, CSVs] = cV.split(":") as [CarFilterName, string];
          if (!allowedCarFilters[filterName]) {
            return pV;
          }
          return { ...pV, [filterName]: CSVs.split(",") };
        }, {});

        const matched = (Object.keys(filtersRecord) as Array<keyof typeof filtersRecord>).every(
          (filterName) => {
            switch (filterName) {
              case "mileage":
              case "power":
              case "price":
                return (
                  (Number(filtersRecord[filterName]?.[0]) === 0 ||
                    (car[filterName] as number) > Number(filtersRecord[filterName]?.[0])) &&
                  (Number(filtersRecord[filterName]?.[1]) === 0 ||
                    (car[filterName] as number) < Number(filtersRecord[filterName]?.[1]))
                );

              case "firstRegistration":
                if (
                  filtersRecord[filterName]?.includes(getYearFromFirstRegistration(car[filterName]))
                )
                  return true;
                break;

              default:
                if (filtersRecord[filterName]?.includes(car[filterName])) return true;
                break;
            }
            return false;
          },
        );

        (matched || filtersRecord["make"]) && (makeOptions[car.make] = true);
        (matched || filtersRecord["model"]) && (modelOptions[car.model] = true);
        (matched || filtersRecord["firstRegistration"]) &&
          (firstRegistrationOptions[getYearFromFirstRegistration(car.firstRegistration)] = true);
        (matched || filtersRecord["fuel"]) && (fuelOptions[car.fuel] = true);
        (matched || filtersRecord["gearbox"]) && (gearboxOptions[car.gearbox] = true);
        (matched || filtersRecord["exteriorColor"]) &&
          (exteriorColorOptions[car.exteriorColor] = true);
        (matched || filtersRecord["category"]) && (categoryOptions[car.category] = true);
        (matched || filtersRecord["mileage"]) &&
          (mileageRange = stretchRange(mileageRange, car.mileage));
        (matched || filtersRecord["power"]) && (powerRange = stretchRange(powerRange, car.power));
        (matched || filtersRecord["price"]) && (priceRange = stretchRange(priceRange, car.price));

        return matched;
      })
      .slice(skip, skip + take);

    await new Promise((resolve) => setTimeout(() => resolve({}), 0));

    return {
      result,
      filters: [
        { type: "options", label: "Make", name: "make", values: Object.keys(makeOptions) },
        {
          type: "options",
          label: "First Registration",
          name: "firstRegistration",
          values: Object.keys(firstRegistrationOptions),
        },
        { type: "options", label: "Fuel", name: "fuel", values: Object.keys(fuelOptions) },
        { type: "options", label: "Gearbox", name: "gearbox", values: Object.keys(gearboxOptions) },
        {
          type: "options",
          label: "Category",
          name: "category",
          values: Object.keys(categoryOptions),
        },
        {
          type: "range",
          label: "Mileage",
          name: "mileage",
          values: mileageRange.map((number) => String(number)),
        },
        {
          type: "range",
          label: "Power",
          name: "power",
          values: powerRange.map((number) => String(number)),
        },
        {
          type: "range",
          label: "Price",
          name: "price",
          values: priceRange.map((number) => String(number)),
        },
        { type: "options", label: "Model", name: "model", values: Object.keys(modelOptions) },
        {
          type: "options",
          label: "Exterior Color",
          name: "exteriorColor",
          values: Object.keys(exteriorColorOptions),
        },
      ],
    };
  }
}
