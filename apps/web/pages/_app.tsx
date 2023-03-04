import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";
import { theme } from "../theme/index";

import "../styles/globals.css";
import ErrorBoundary from "../views/ErrorBoundary";

import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile, isBrowser, isTablet } from "react-device-detect";
import MobilePrompt from "../components/core/MobilePrompt";
import { ProtectedLayout } from "components/protected";
import type { AppProps } from 'next/app';


type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

const MyApp: AppType<{ session: Session | null } & AppPropsWithAuth> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [smallerThan640] = useMediaQuery("(max-width: 640px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const [allowDisplay, setAllowDisplay] = useState("loading");

  useEffect(() => {
    console.log(
      `isMobile: ${isMobile}, isBrowser: ${isBrowser}, isTablet: ${isTablet}`
    );
    if (isBrowser || isTablet) {
      setAllowDisplay("web");
    }
    if (isMobile && !isTablet && !isBrowser) {
      setAllowDisplay("mobile");
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
      {Component.requireAuth ? (
        <ProtectedLayout>
          <ChakraProvider theme={theme}>
            {allowDisplay === "web" && !smallerThan640 && (
              <Component {...pageProps} />
            )}
            {(allowDisplay === "mobile" || smallerThan640) && <MobilePrompt />}
          </ChakraProvider>
        </ProtectedLayout>
        ) : (
          <ChakraProvider theme={theme}>
            {allowDisplay === "web" && !smallerThan640 && (
              <Component {...pageProps} />
            )}
            {(allowDisplay === "mobile" || smallerThan640) && <MobilePrompt />}
          </ChakraProvider>
        )}
        
      </ErrorBoundary>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
