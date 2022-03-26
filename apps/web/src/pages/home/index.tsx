import { gql, useQuery } from "@apollo/client";
import type { CarsQuery } from "@ucm/api/dist/car/resolver";
import { Button } from "@ucm/ui/dist/button";
import { CarCard } from "@ucm/ui/dist/car-card";
import { Container } from "@ucm/ui/dist/container";
import { Filter, Filters } from "@ucm/ui/dist/filters";
import { Grid } from "@ucm/ui/dist/grid";
import { InViewport } from "@ucm/ui/dist/in-viewport";
import { MediaQuery } from "@ucm/ui/dist/media-query";
import { Popup } from "@ucm/ui/dist/popup";
import { Toolbar } from "@ucm/ui/dist/toolbar";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { extractSelectedFilters } from "../../utils/filters";
import { isSSR } from "../../utils/ssr";
import { recordToURLQuery, urlQueryToRecord } from "../../utils/url-query";
import { carsQueryResultFiltersToHomePageFilters, urlQueryToGraphQLQueryFilters } from "./utils";

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
  "offerID",
] as const;
export const CARS_QUERY = gql`
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

export const HomePage: NextPage<{ graphQLFilters?: string[] }> = ({ graphQLFilters }) => {
  const [filters, setFilters] = useState<Filter[] | null>(null);
  const [shownPopups, setShownPopups] = useState({ filters: false });
  const [infiniteScroll, setInfiniteScroll] = useState({ eod: false });

  const router = useRouter();

  const { data, loading, refetch, fetchMore } = useQuery<{
    cars: CarsQuery<typeof carsQueryFields[number]>;
  }>(CARS_QUERY, {
    variables: {
      filters:
        graphQLFilters ||
        (isSSR() ? [] : useMemo(() => urlQueryToGraphQLQueryFilters(router.query), [router.query])),
      take: 12,
    },
  });

  // Update the Displayed filters schema, while preserving the already selected options:
  useEffect(() => {
    if (!data) return;
    const filtersOnURLQuery = urlQueryToRecord(router.query);
    setFilters(carsQueryResultFiltersToHomePageFilters(data.cars.filters, filtersOnURLQuery));
  }, [data?.cars.filters]);

  // DRYed the FiltersComponent for responsive rendering bellow:
  const FiltersComponent = () => (
    <Filters
      margin="1rem"
      filters={filters || []}
      onChange={(filterName, optionName, value) => {
        const newFilters = (filters || []).map((filter) => {
          if (filter.name !== filterName) return filter;
          switch (filter.type) {
            case "options":
              return {
                ...filter,
                options: filter.options.map((option) =>
                  option.name !== optionName ? option : { ...option, checked: value as boolean },
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
        const { newFiltersOnURLQuery, graphQLQueryFilters } = extractSelectedFilters(newFilters);

        refetch({ filters: graphQLQueryFilters });

        const newURL = `/${recordToURLQuery(newFiltersOnURLQuery)}`;
        router.push(newURL, undefined, { shallow: true });
      }}
    />
  );

  const loadMore = async () => {
    const skip = data?.cars.result.length || 0;
    const { graphQLQueryFilters } = extractSelectedFilters(filters || []);

    const moreResults = await fetchMore({ variables: { skip, graphQLQueryFilters } });
    setInfiniteScroll({ eod: moreResults.data.cars.result.length <= 0 });
  };
  const title = "Used Car Market";

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content="/home-og.jpg" />
      </Head>
      {/* Top Toolbar only shown/rendered on mobile */}
      <MediaQuery query="(max-width: 800px)">
        <Toolbar margin="1rem 0">
          <Button
            onClick={() => setShownPopups({ ...shownPopups, filters: true })}
            data-testid="filters-button"
          >
            Filters
          </Button>
        </Toolbar>
        <Popup
          shown={shownPopups.filters}
          onClose={() => setShownPopups({ ...shownPopups, filters: false })}
          containerProps={{ "data-testid": "popup-container" }}
        >
          <FiltersComponent />
        </Popup>
      </MediaQuery>
      <Grid>
        {/* Sidebar filters only shown/rendered on desktop */}
        <MediaQuery query="(min-width: 800px)">
          <FiltersComponent />
        </MediaQuery>
        <Grid margin="1rem">
          {loading
            ? "Loading"
            : !data
            ? "Error Loading, please try again later :("
            : data.cars.result.map((car) => (
                <CarCard
                  key={`${car.offerID}-`}
                  image={car.image}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                  description={`${car.power} HP ${car.fuel} engine, ran for ${car.mileage} Km since ${car.firstRegistration}, with a combined consumption of ${car.consumptionCombined} (${car.consumptionUnit}) and CO2 emission of ${car.co2} (g/Km)`}
                  LinkWrapper={(props) => (
                    <Link href={`/car/${car.offerID}`} shallow={true} {...props} />
                  )}
                />
              ))}
          {/* Visibility detection component, used to detect when user hits the bottom of the results */}
          <InViewport
            onVisibilityChanged={async (action) => {
              if (action === "entered" && !infiniteScroll.eod) {
                await loadMore();
              }
            }}
            style={{ width: "100%", textAlign: "center" }}
          >
            {infiniteScroll.eod ? null : <Button onClick={loadMore}>Load more</Button>}
          </InViewport>
        </Grid>
      </Grid>
    </Container>
  );
};
