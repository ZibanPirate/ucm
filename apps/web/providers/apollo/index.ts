import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createIsomorphLink = () => {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema"); // eslint-disable-line @typescript-eslint/no-var-requires
    const { schema } = require("@ucm/api/dist/schema"); // eslint-disable-line @typescript-eslint/no-var-requires
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require("@apollo/client/link/http"); // eslint-disable-line @typescript-eslint/no-var-requires
    return new HttpLink({ uri: "/api/graphql", credentials: "same-origin" });
  }
};

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });

export const initializeApollo = (initialState: NormalizedCacheObject | null = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Apollo Client, the initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};