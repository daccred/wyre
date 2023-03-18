import { Button, Flex, Heading, Link, Stack, HStack, Image, Text } from "@chakra-ui/react";
import { FormInput } from "components/forms";
import * as React from "react";

type Props = {
  isSubmitting?: boolean;
};

const View: React.FC<Props> = (Props) => {
  const { isSubmitting } = Props;

  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
      <Stack flex={1}>
        <Image src="/Zayroll Logo.png" alt="zayroll logo" w={24} m={12} />

        <Flex flex={1} align={{ base: "", md: "start" }} p={12}>
          <Stack spacing={8} w="full" maxW="md">
            <Stack>
              <Text color="primary.100" fontWeight="bold" fontSize={{ base: "3xl", md: "4xl" }}>
                Create Account
              </Text>
              <Text color="muted">
                Already have an account?{" "}
                <Link color="primary.main" href="/employee/login">
                  Login
                </Link>
              </Text>
            </Stack>

            <Stack spacing={6}>
              <FormInput name="email" type="email" label="Email" placeholder="e.g. john.doe@zayroll.com" />
              <FormInput name="firstName" type="text" label="First Name" placeholder="Jane" />
              <FormInput name="lastName" type="text" label="Last Name" placeholder="Doe" />

              <FormInput name="password" type="password" label="Password" placeholder="***************" />
              <FormInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="***************"
              />

              <Button
                bg="primary.50"
                color="white"
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                _hover={{
                  bg: "primary.100",
                }}>
                Create Account
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>

      <Flex bgColor="primary.main" color="white" flex={1} align="center" justify="center">
        <HStack flex={1} align="start" justify="center">
          <Stack maxW="xs">
            <Heading>Wyre</Heading>
            <Text>Get paid in mulitiple currencies across the world including cryptocurrency.</Text>
          </Stack>
          <Stack position="relative">
            <Image alt="Image" src="/Zayroll employee.png" zIndex="1000" />
            <Image alt="Image" src="/Ellipse.png" position="absolute" bottom="-20%" left="-40%" />
          </Stack>
        </HStack>
      </Flex>
    </Stack>
  );
};

export default View;
