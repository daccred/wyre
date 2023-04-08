import type { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { mode, transparentize } from "@chakra-ui/theme-tools";

const variants = {
  outline: (props: StyleFunctionProps) => ({
    field: {
      borderRadius: "xl",
      border: "0.2px solid transparent",
      bg: mode("white", "#1F1F1F")(props),
    },
    addon: {
      borderRadius: "lg",
      bg: mode("gray.50", "gray.700")(props),
    },
  }),
  "outline-on-accent": (props: StyleFunctionProps) => ({
    field: {
      bg: "white",
      borderRadius: "lg",
      color: "gray.900",
      borderWidth: "1px",
      borderColor: "brand.50",
      _placeholder: {
        color: "gray.500",
      },
      _hover: {
        borderColor: "brand.100",
      },
      _focus: {
        borderColor: "brand.200",
        boxShadow: `0px 0px 0px 1px ${transparentize(`brand.200`, 1.0)(props.theme)}`,
      },
    },
  }),
  filled: (props: StyleFunctionProps) => {
    if (props.colorScheme === "gray") {
      return {
        field: {
          bg: mode("white", "gray.800")(props),
          _hover: {
            borderColor: mode("gray.200", "gray.700")(props),
            bg: mode("white", "gray.700")(props),
          },
          _focus: {
            borderColor: "accent",
            bg: mode("white", "gray.800")(props),
          },
        },
      };
    }
    return {
      field: {
        bg: "bg-accent-subtle",
        color: "on-accent",
        _placeholder: {
          color: "on-accent",
        },
        _hover: {
          borderColor: "brand.400",
          bg: "bg-accent-subtle",
        },
        _focus: {
          bg: "bg-accent-subtle",
          borderColor: "brand.300",
        },
      },
    };
  },
};

const inputs = {
  variants,
  defaultProps: {
    colorScheme: "gray",
    size: "lg",
    fontSize: "16px",
    borderRadius: "3xl",
    rounded: "3xl",
  },
};
export default inputs;
