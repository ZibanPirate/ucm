import type { GetServerSideProps } from "next";

import { CAR_QUERY, CarPage } from "../../src/pages/car";
import { initializeApollo } from "../../src/providers/apollo";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: CAR_QUERY, variables: { offerID: query["offer-id"] } });

  return { props: { initialApolloState: apolloClient.cache.extract() } };
};

export default CarPage;
