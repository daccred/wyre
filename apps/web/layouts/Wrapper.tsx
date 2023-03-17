import type { ContainerProps, FlexProps } from "@chakra-ui/react";
import { Flex, Container, Box, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

import type { WrapperInnerProps, WrapperEnum } from "./tokens";
import { MAX_WIDTH, withTokenForInnerWrapperVariant } from "./tokens";

/**
 * @name Layout
 * @description Layout to be used as NextPageLayout to be used to wrap parent elements
 */
export const NextPageLayout: React.FC<FlexProps> = (props): JSX.Element => {
  const bg = useColorModeValue("whiteAlpha.800", "gray.900");
  const color = useColorModeValue("text", "white");

  return (
    <Container
      as="main"
      mx={{ base: "0", md: "auto" }}
      px={0}
      minH="100vh"
      // w={'full'}
      maxW={MAX_WIDTH}
      direction="column"
      borderX="0px solid #44444412"
      willChange="background, color"
      transition="background 450ms ease 0s"
      bg={bg}
      color={color}
      {...props}
    />
  );
};
/**
 * @name Wrapper
 * @description Wrapper to be used to wrap inner html page sections and blocks to ensure consistent spacing
 * margins and paddings across all component blocks
 */
type WrapperProps = FlexProps & ContainerProps & { context?: WrapperEnum };

export const Fluid: React.FC<WrapperProps> = (props): JSX.Element => {
  const color = useColorModeValue("text", "white");

  return (
    <Flex
      w="100%"
      alignItems="center"
      direction="column"
      maxW={MAX_WIDTH}
      mx={0}
      px={0}
      willChange="background, color"
      transition="background 450ms ease 0s"
      color={color}
      {...props}
    />
  );
};

export const Contain: React.FC<WrapperProps> = (props): JSX.Element => {
  const color = useColorModeValue("text", "white");

  return (
    <Flex
      w="full"
      height="full"
      direction="column"
      mx={{ base: "0", md: "auto" }}
      px={{ base: 4, md: 8, lg: 12, xl: 12 }}
      willChange="background, color"
      transition="background 450ms ease 0s"
      color={color}
      {...props}
    />
  );
};

export const Mobile: React.FC<WrapperProps> = (props): JSX.Element => {
  return (
    <Container
      maxW="2xl"
      willChange="background, color"
      transition="background 450ms ease 0s"
      pb={{ base: 16, md: 24 }}
      px={{ base: 6, md: 8 }}
      {...props}
    />
  );
};

export const Inner: React.FC<WrapperProps> = (props): JSX.Element => {
  const color = useColorModeValue("text", "white");

  return (
    <Flex
      w="full"
      height="full"
      maxW="6xl"
      direction="column"
      pb={{ base: 24, md: 32 }}
      mx={{ base: "0", md: "auto" }}
      px={{ base: 4, md: 8, lg: 24, xl: 24 }}
      willChange="background, color"
      transition="background 450ms ease 0s"
      color={color}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*       Inner Wrapper uses the tokens to define custom containers            */
/* -------------------------------------------------------------------------- */

export const WrapperInner = (props: WrapperInnerProps) => {
  const token = withTokenForInnerWrapperVariant(props.variant);
  return (
    <Container py={{ base: "8", md: "12" }} maxWidth={token.maxWidth}>
      <Box
        bg="bg-surface"
        border="1px"
        borderColor={useColorModeValue(token.borderColor[0], token.borderColor[1])}
        boxShadow={useColorModeValue(token.shadow[0], token.shadow[1])}
        borderRadius="xl"
        px={token.px}
        py={token.py}
        {...props}>
        {props.children}
      </Box>
    </Container>
  );
};
