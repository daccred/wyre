import type { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { darken, mode, transparentize } from "@chakra-ui/theme-tools";

const baseStyle = {
  ":focus:not(:focus-visible)": {
    boxShadow: "none",
  },
  colorScheme: "orange",
  fontWeight: "medium",
  borderRadius: "lg",
};

const sizes = {
  lg: {
    fontSize: "md",
  },
};

const variants = {
  primary: (props: StyleFunctionProps) =>
    props.theme.components.Button.variants.solid({
      ...props,
      variant: "solid",
      colorScheme: "primary",
    }),
  "primary-on-accent": () => ({
    bg: "primary.50",
    color: "primary.600",
    _hover: { bg: "primary.100" },
    _active: { bg: "primary.100" },
  }),
  gradient: () => ({
    color: "black",
    bgGradient: "linear(to-r, #78FFD6, #A8FF78)",
    _hover: {
      bgGradient: "linear(to-l, #78FFD6, #A8FF78)",
    },
  }),
  brand: (props: StyleFunctionProps) =>
    props.theme.components.Button.variants.solid({
      ...props,
      colorScheme: "brand",
    }),
  outline: (props: StyleFunctionProps) => ({
    color: "emphasized",
    bg: mode("white", "gray.800")(props),
    _hover: {
      bg: mode(
        darken("gray.50", 1)(props.theme),
        transparentize("gray.700", 0.4)(props.theme)
      )(props),
    },
    _checked: {
      bg: mode("gray.100", "gray.700")(props),
    },
    _active: {
      bg: mode("gray.100", "gray.700")(props),
    },
  }),
  ghost: (props: StyleFunctionProps) => ({
    color: "emphasized",
    _hover: {
      bg: mode(
        darken("gray.50", 1)(props.theme),
        darken("gray.700", 4)(props.theme)
      )(props),
    },
    _active: {
      bg: mode(
        darken("gray.50", 1)(props.theme),
        darken("gray.700", 4)(props.theme)
      )(props),
    },
    _activeLink: {
      bg: mode("gray.100", "gray.700")(props),
    },
  }),
  "ghost-on-accent": (props: StyleFunctionProps) => ({
    color: "brand.50",
    _hover: {
      bg: transparentize("brand.600", 0.67)(props.theme),
    },
    _activeLink: {
      color: "white",
      bg: "bg-accent-subtle",
    },
  }),
  link: (props: StyleFunctionProps) => {
    if (props.colorScheme === "gray") {
      return {
        color: "muted",
        _hover: {
          textDecoration: "none",
          color: "default",
        },
        _active: {
          color: "default",
        },
      };
    }
    return {
      color: mode(
        `${props.colorScheme}.600`,
        `${props.colorScheme}.200`
      )(props),
      _hover: {
        color: mode(
          `${props.colorScheme}.700`,
          `${props.colorScheme}.300`
        )(props),
        textDecoration: "none",
      },
      _active: {
        color: mode(
          `${props.colorScheme}.700`,
          `${props.colorScheme}.300`
        )(props),
      },
    };
  },
  "link-on-accent": () => ({
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: "brand.50",
    _hover: {
      color: "white",
    },
    _active: {
      color: "white",
    },
  }),
  "darkBtn": () => ({
    padding: "10px",
    lineHeight: "normal",
    color: "white",
    background:"brand.700",
    borderRadius:"5px",
    fontSize:"12px",
    fontWeight:"bold",
    height:"44px",

    _hover: {
      color: "white",
      background:"#2a1143",
    },
    _active: {
      color: "white",
      background:"#2d104a",
    },
  }),
  "greyBtn": () => ({
    padding: "10px",
    lineHeight: "normal",
    color: "#210D35",
    background:"#D9D9D9",
    borderRadius:"5px",
    fontSize:"12px",
    fontWeight:"bold",
    height:"44px",

    // _hover: {
    //   color: "white",
    //   background:"#2a1143",
    // },
    // _active: {
    //   color: "white",
    //   background:"#2d104a",
    // },
  }),
};

const button = {
  baseStyle,
  variants,
  defaultProps: {
    size: "lg",
    borderRadius: "24px",
  },
  sizes,
};

export default button;
