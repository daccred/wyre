import type { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode('#010C14', 'whiteAlpha.900')(props),
      bg: "bg-canvas",
    },
    "*::placeholder": {
      opacity: 1,
      color: "muted",
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "gray.700")(props),
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
