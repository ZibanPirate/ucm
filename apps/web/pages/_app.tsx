import "../styles/globals.css";
import "@ucm/ui/dist/button/index.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Script from "next/script";

import { useApollo } from "../src/providers/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <Script src="https://unpkg.com/delayed-scroll-restoration-polyfill@0.1.1/index.js" />
    </ApolloProvider>
  );
}

export default MyApp;
