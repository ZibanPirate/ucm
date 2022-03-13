import { gql, useQuery } from "@apollo/client";
import type { CarsQuery } from "@ucm/api/dist/car/resolver";
import { Button } from "@ucm/ui/dist/button";
import { CarCard } from "@ucm/ui/dist/car-card";
import { Container } from "@ucm/ui/dist/container";
import { Filter, Filters } from "@ucm/ui/dist/filters";
import { Grid } from "@ucm/ui/dist/grid";
import { Popup } from "@ucm/ui/dist/popup";
import { Toolbar } from "@ucm/ui/dist/toolbar";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { initializeApollo } from "../providers/apollo";

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
const carsQuery = gql`
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
`;

const Home: NextPage = () => {
  const { data, loading, refetch } =
    useQuery<{ cars: CarsQuery<typeof carsQueryFields[number]> }>(carsQuery);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [shownPopups, setShownPopups] = useState({ filters: false });

  useEffect(() => {
    if (!data) return;

    setFilters(
      data.cars.filters.map(({ label, name, type, values }) => {
        switch (type) {
          case "range":
            return {
              label,
              name,
              type,
              options: { min: 0, max: 0 },
            };
          case "options":
            return {
              label,
              name,
              type,
              options: values.map((value) => ({ name: value, checked: false })),
            };
        }
      }),
    );
  }, [data?.cars.filters]);

  return (
    <Container>
      <Toolbar itemsAlignment="space-around">
        <Button stretch onClick={() => setShownPopups({ ...shownPopups, filters: true })}>
          Filters
        </Button>
      </Toolbar>
      <br />
      <Popup
        shown={shownPopups.filters}
        onClose={() => setShownPopups({ ...shownPopups, filters: false })}
      >
        <Filters filters={filters} />
      </Popup>
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

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: carsQuery });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};

export default Home;
