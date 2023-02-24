import type { ThemeConfig } from "@chakra-ui/react";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import * as components from "./components";
import * as foundations from "./foundations";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  cssVarPrefix: "wyre",
  useSystemColorMode: false,
};

export const theme: Record<string, any> = extendTheme({
  ...foundations,
  config,
  components: { ...components },
  colors: {
    ...baseTheme.colors,
    // brand: baseTheme.colors.blue ,
    brand: {
      100: "#F0E4FB",
      600: "#8D1CFF",
      700: "#210D35",
    },
    // primary: {
    //   main: "#ca9fff",
    //   50: "#f3e8ff",
    //   100: "#dfc6ff",
    //   200: "#ca9fff",
    //   300: "#b473ff",
    //   400: "#a14dff",
    //   500: "#8e1cff",
    //   600: "#8215f8",
    //   700: "#7100f0",
    //   800: "#6100eb",
    //   900: "#4200e5"
    // },
    boldgrey: "#9F9F9F",
    lightgrey: "#666666",
    dirtywhite: "#FDFFFC",
    bordergrey: "#D2D2D2",
  },
  space: {
    "4.5": "1.125rem",
  },
});
