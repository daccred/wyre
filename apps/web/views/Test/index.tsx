import ViewLayout from "../../components/core/ViewLayout";
import { Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile, isBrowser, isTablet } from "react-device-detect";

const Test = () => {
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
    <>
      <ViewLayout>
        {allowDisplay === "web" && !smallerThan640 && (
          <Text>This is a test page</Text>
        )}
        {(allowDisplay === "mobile" || smallerThan640) && (
          <Text>mobile page</Text>
        )}
      </ViewLayout>
    </>
  );
};

export default Test;
