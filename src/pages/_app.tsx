import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";
import { theme } from "@/theme/index";

import "../styles/globals.css";
import ErrorBoundary from "@/views/ErrorBoundary";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
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
