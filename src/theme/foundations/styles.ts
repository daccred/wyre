// import type { StyleFunctionProps } from "@chakra-ui/theme-tools";
// import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: () =>
    // props: StyleFunctionProps
    ({
      body: {
        // color: "default",
        bg: "black",
        color: "white",
      },
      "*::placeholder": {
        opacity: 1,
        color: "muted",
      },
      "*, *::before, &::after": {
        // borderColor: mode("gray.200", "gray.700")(props),
        borderColor: "transparent",
      },
      "html,body": {
        height: "100%",
      },
      "#__next, #root": {
        display: "flex",
        flexDirection: "column",
        minH: "100%",
      },
    }),
};
export default styles;
