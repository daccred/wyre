import { ChakraProvider } from "@chakra-ui/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";

import "../styles/globals.css";
import { theme } from "../theme/index";
import { trpc } from "../utils/trpc";
import ErrorBoundary from "../views/ErrorBoundary";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ErrorBoundary>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
