import { ChakraProvider } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { isMobile, isBrowser, isTablet } from "react-device-detect";

import MobilePrompt from "../components/core/MobilePrompt";
import "../styles/globals.css";
import { theme } from "../theme/index";
import { trpc } from "../utils/trpc";
import ErrorBoundary from "../views/ErrorBoundary";

type MyAppProps = AppProps & {
  session: Session | null;
};

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const { session, ...restPageProps } = pageProps;

  const [smallerThan640] = useMediaQuery("(max-width: 640px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const [allowDisplay, setAllowDisplay] = useState("loading");

  useEffect(() => {
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
        <ChakraProvider theme={theme}>
          {allowDisplay === "web" && !smallerThan640 && <Component {...restPageProps} />}
          {allowDisplay === "mobile" && <MobilePrompt />}
        </ChakraProvider>
      </ErrorBoundary>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
