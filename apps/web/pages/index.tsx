import { gql, useQuery } from "@apollo/client";
import type { CarsQuery } from "@ucm/api/dist/car/resolver";
import { Button } from "@ucm/ui/dist/button";
import { CarCard } from "@ucm/ui/dist/car-card";
import { Container } from "@ucm/ui/dist/container";
import { Filter, Filters } from "@ucm/ui/dist/filters";
import { Grid } from "@ucm/ui/dist/grid";
import { InViewport } from "@ucm/ui/dist/in-viewport";
import { Popup } from "@ucm/ui/dist/popup";
import { Toolbar } from "@ucm/ui/dist/toolbar";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { initializeApollo } from "../providers/apollo";
import { extractSelectedFilters } from "./utils/filters";
import { recordToURLQuery, urlQueryToRecord } from "./utils/url-query";

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

const Home: NextPage<{ graphQLFilters?: string[] }> = ({ graphQLFilters }) => {
  const [filters, setFilters] = useState<Filter[] | null>(null);
  const [shownPopups, setShownPopups] = useState({ filters: false });
  const [infiniteScroll, setInfiniteScroll] = useState({ eod: false });

  const router = useRouter();

  const { data, loading, refetch, fetchMore } = useQuery<{
    cars: CarsQuery<typeof carsQueryFields[number]>;
  }>(carsQuery, {
    variables: {
      filters:
        graphQLFilters ||
        (filters ? extractSelectedFilters(filters).graphQLQueryFilters : undefined),
      take: 12,
    },
  });

  useEffect(() => {
    if (!data) return;

    const filtersOnURLQuery = urlQueryToRecord(router.query);

    setFilters(
      data.cars.filters.map(({ label, name, type, values }) => {
        switch (type) {
          case "range":
            return {
              label,
              name,
              type,
              options: {
                min: Number(filtersOnURLQuery[name]?.[0] || 0),
                max: Number(filtersOnURLQuery[name]?.[1] || 0),
              },
            };
          case "options":
            return {
              label,
              name,
              type,
              options: values.map((value) => ({
                name: value,
                checked: filtersOnURLQuery[name]?.includes(value),
              })),
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
        <Filters
          filters={filters || []}
          onChange={(filterName, optionName, value) => {
            const newFilters = (filters || []).map((filter) => {
              if (filter.name !== filterName) return filter;
              switch (filter.type) {
                case "options":
                  return {
                    ...filter,
                    options: filter.options.map((option) =>
                      option.name !== optionName
                        ? option
                        : { ...option, checked: value as boolean },
                    ),
                  };

                case "range":
                  return {
                    ...filter,
                    options: { ...filter.options, [optionName]: value },
                  };
              }
            });
            setFilters(newFilters);
            setInfiniteScroll({ eod: false });
            const { newFiltersOnURLQuery, graphQLQueryFilters } =
              extractSelectedFilters(newFilters);

            refetch({ filters: graphQLQueryFilters });

            const newURL = `/${recordToURLQuery(newFiltersOnURLQuery)}`;
            router.push(newURL, undefined, { shallow: true });
          }}
        />
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
      <InViewport
        onVisibilityChanged={async (action) => {
          if (action === "entered" && !infiniteScroll.eod) {
            const skip = data?.cars.result.length || 0;
            const moreResults = await fetchMore({ variables: { skip } });
            setInfiniteScroll({ eod: moreResults.data.cars.result.length <= 0 });
          }
        }}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo();

  const filtersOnURLQuery = urlQueryToRecord(query);
  const filters = Object.keys(filtersOnURLQuery).map(
    (filterName) => `${filterName}:${filtersOnURLQuery[filterName].join(",")}`,
  );

  await apolloClient.query({ query: carsQuery, variables: { filters, take: 12 } });

  return { props: { initialApolloState: apolloClient.cache.extract(), graphQLFilters: filters } };
};

export default Home;
