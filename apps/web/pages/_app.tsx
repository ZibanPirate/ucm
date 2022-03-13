import "../styles/globals.css";
import "@ucm/ui/dist/button/index.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import { useApollo } from "../providers/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
