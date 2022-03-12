import "../styles/globals.css";
import "@ucm/ui/dist/button/index.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
