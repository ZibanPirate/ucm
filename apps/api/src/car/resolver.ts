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
class Cars {
  @Field(() => [Car])
  result!: Car[];

  @Field(() => [FilterOption])
  filters!: FilterOption[];
}

type CarFilterName = keyof Pick<
  Car,
  | "make"
  | "model"
  | "firstRegistration"
  | "fuel"
  | "gearbox"
  | "exteriorColor"
  | "category"
  | "mileage"
  | "power"
  | "price"
>;

@Resolver()
export class CarResolver {
  @Query(() => Car)
  async car(@Arg("id") id: string): Promise<Car | undefined> {
    return cars.find((car) => car.offerID === id);
  }

  @Query(() => Cars)
  cars(@Args() { skip, take, filters }: CarsArgs): Promise<Cars> {
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
          const [filterName, CSVs] = cV.split(":");
          return { ...pV, [filterName]: CSVs.split(",") };
        }, {});
        console.log({ filters, filtersRecord });

        const matched = (Object.keys(filtersRecord) as Array<keyof typeof filtersRecord>).every(
          (filterName) => {
            switch (filterName) {
              case "mileage":
              case "power":
              case "price":
                return (
                  (car[filterName] as number) > Number(filtersRecord[filterName]?.[0]) &&
                  (car[filterName] as number) < Number(filtersRecord[filterName]?.[1])
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

        if (!matched) return false;

        makeOptions[car.make] = true;
        modelOptions[car.model] = true;
        firstRegistrationOptions[getYearFromFirstRegistration(car.firstRegistration)] = true;
        fuelOptions[car.fuel] = true;
        gearboxOptions[car.gearbox] = true;
        exteriorColorOptions[car.exteriorColor] = true;
        categoryOptions[car.category] = true;
        mileageRange = stretchRange(mileageRange, car.mileage);
        powerRange = stretchRange(powerRange, car.power);
        priceRange = stretchRange(priceRange, car.price);

        return true;
      })
      .slice(skip, skip + take);

    return Promise.resolve({
      result,
      filters: [
        { type: "options", label: "Make", name: "make", values: Object.keys(makeOptions) },
        { type: "options", label: "Model", name: "model", values: Object.keys(modelOptions) },
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
          label: "Exterior Color",
          name: "exteriorColor",
          values: Object.keys(exteriorColorOptions),
        },
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
      ],
    });
  }
}
