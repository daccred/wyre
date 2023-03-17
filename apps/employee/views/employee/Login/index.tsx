import { Center, Stack, Text, Button, Flex, Heading, Link, HStack, Image } from "@chakra-ui/react";
import { FormInput } from "components/forms";
import * as React from "react";

type Props = {
  isSubmitting: boolean;
};

const View: React.FC<Props> = (Props) => {
  const { isSubmitting } = Props;

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Stack flex={1}>
        <Image src="/Zayroll Logo.png" alt="wyre logo" w={24} m={12} />

        <Flex flex={1} align={{ base: "", md: "start" }} p={12}>
          <Stack spacing={8} w={"full"} maxW={"md"}>
            <Stack>
              <Text color={"primary.100"} fontWeight={"bold"} fontSize={{ base: "3xl", md: "4xl" }}>
                Login
              </Text>
              <Text color="primary.100">
                Don’t have an account?{" "}
                <Link color="#8D1CFF" fontWeight={600} href="/employee/sign-up">
                  Create Account
                </Link>
              </Text>
            </Stack>

            <Stack spacing={"6"} pb="4">
              <Stack spacing={4}>
                <FormInput
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="john-mcdonald@zayroll.com"
                />

                <FormInput name="password" label="Password" type="password" placeholder="***************" />
              </Stack>

              <Stack>
                <Button
                  bg={"primary.50"}
                  color={"white"}
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  // _hover={{
                  //   bg: '#210D35',
                  // }}
                  _hover={{ bg: "" }}>
                  Login
                </Button>
                <Center>
                  Forgot Password?
                  <Link color="primary.main" marginLeft={2} fontWeight={600} href="/employee/forgot-password">
                    Reset
                  </Link>
                </Center>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Stack>

      <Flex bgColor="primary.main" color="white" flex={1} align={"center"} justify={"center"}>
        <HStack flex={1} align={"start"} justify={"center"}>
          <Stack maxW={"xs"}>
            <Heading>Wyre</Heading>
            <Text>Get paid in mulitiple currencies across the world including cryptocurrency.</Text>
          </Stack>
          <Stack position={"relative"}>
            <Image alt={"Image"} src={"/Zayroll employee.png"} zIndex="1000" />
            <Image alt={"Image"} src={"/Ellipse.png"} position="absolute" bottom={"-20%"} left="-40%" />
          </Stack>
        </HStack>
      </Flex>
    </Stack>
  );
};

export default View;
