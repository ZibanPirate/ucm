import type { GetServerSideProps } from "next";

import { CARS_QUERY, HomePage } from "../src/pages/home";
import { initializeApollo } from "../src/providers/apollo";
import { urlQueryToRecord } from "../src/utils/url-query";

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const isCSR = !req || (req.url && req.url.startsWith("/_next/data"));

  if (isCSR) {
    return { props: {} };
  }

  const apolloClient = initializeApollo();

  const filtersOnURLQuery = urlQueryToRecord(query);
  const filters = Object.keys(filtersOnURLQuery).map(
    (filterName) => `${filterName}:${filtersOnURLQuery[filterName].join(",")}`,
  );

  await apolloClient.query({ query: CARS_QUERY, variables: { filters, take: 12 } });

  return { props: { initialApolloState: apolloClient.cache.extract(), graphQLFilters: filters } };
};

export default HomePage;
