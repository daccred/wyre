import { FormInput } from "../../components";
import {
  Button,
  Container,
  Divider,
  Heading,
  Box,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { GoogleIcon, TwitterIcon } from "./ProviderIcons";

const View = () => (
  <Box
    minH={"100vh"}
    bgGradient={{ sm: "linear(to-r, blue.600, purple.600)" }}
    py={{ base: "12", md: "24" }}
  >
    <Container
      maxW="md"
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
      boxShadow={{ base: "none", sm: "xl" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Stack spacing="3" textAlign="center">
            <Heading size="xs">Log in to your account</Heading>
            <Text color="muted">Start making your dreams come true</Text>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Button
            rounded={"3xl"}
            variant="outline"
            leftIcon={<GoogleIcon boxSize="5" />}
            iconSpacing="3"
          >
            Continue with Google
          </Button>
          <Button
            rounded={"3xl"}
            variant="outline"
            leftIcon={<TwitterIcon boxSize="5" />}
            iconSpacing="3"
          >
            Continue with Twitter
          </Button>
          <Divider />
          <Stack spacing="4">
            <FormInput
              name="email"
              label="Your email address"
              placeholder="Enter your email address..."
            />
            <Button variant="gradient" rounded={"3xl"} type="submit">
              Continue with email
            </Button>
          </Stack>
        </Stack>
        <Stack spacing="0.5" align="center">
          <Text fontSize="sm" color="muted">
            Having trouble logging in?
          </Text>
          <Button variant="link" colorScheme="blue" size="sm">
            Contact us
          </Button>
        </Stack>
        <Text fontSize="xs" color="subtle" textAlign="center">
          By continuing, you acknowledge that you have read, understood, and
          agree to our terms and condition
        </Text>
      </Stack>
    </Container>
  </Box>
);

export default View;
