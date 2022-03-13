import { gql, useQuery } from "@apollo/client";
import type { CarsQuery } from "@ucm/api/dist/car/resolver";
import { Button } from "@ucm/ui/dist/button";
import { CarCard } from "@ucm/ui/dist/car-card";
import { Container } from "@ucm/ui/dist/container";
import { Grid } from "@ucm/ui/dist/grid";
import { Toolbar } from "@ucm/ui/dist/toolbar";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const carsQueryFields = [
    "image",
    "model",
    "make",
    "price",
    "mileage",
    "firstRegistration",
    "fuel",
    "power",
    "consumptionCombined",
    "consumptionUnit",
    "co2",
  ] as const;
  const { data, loading } = useQuery<{ cars: CarsQuery<typeof carsQueryFields[number]> }>(gql`
    query Cars($take: Int, $skip: Int, $filters: [String!]) {
      cars(take: $take, skip: $skip, filters: $filters) {
        result {
          ${carsQueryFields.join("\n")}
        }
        filters {
          name
          type
          label
          values
        }
      }
    }
  `);

  console.log({ data });

  return (
    <Container>
      <Toolbar itemsAlignment="space-around">
        <Button stretch>Filters</Button>
        <Button stretch>Sort Options</Button>
      </Toolbar>
      <Grid>
        {loading
          ? "Loading"
          : !data
          ? "Error Loading, please try again later :("
          : data.cars.result.map((car, index) => (
              <CarCard
                key={index}
                image={car.image}
                make={car.make}
                model={car.model}
                price={car.price}
                description={`${car.power} HP ${car.fuel} engine, ran for ${car.mileage} Km since ${car.firstRegistration}, with a combined consumption of ${car.consumptionCombined} (${car.consumptionUnit}) and CO2 emission of ${car.co2} (g/Km)`}
              />
            ))}
      </Grid>
    </Container>
  );
};

export default Home;
