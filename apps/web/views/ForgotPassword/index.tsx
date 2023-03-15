import { Button, Flex, Heading, Link, HStack, Stack, Text, useColorModeValue, Image } from "@chakra-ui/react";
import * as React from "react";

import { FormInput } from "../../components";

// import Link from "next/link";

type ForgotPasswordFormInputs = {
  email: string;
};

const View = () => (
  <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
    <Stack flex={1}>
      <Image src="/Zayroll Logo.png" alt="wyre logo" w={24} m={12} />

      <Flex
        p={12}
        flex={1}
        align={"start"}
        justify={""}
        // bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Stack>
            <Heading
              color={"#010C14"}
              fontWeight={"bold"}
              lineHeight={1.1}
              fontSize={{ base: "3xl", md: "4xl" }}>
              Reset Password
            </Heading>
            <Text color="#010C14">
              Remember Password?{" "}
              <Link color="#8D1CFF" href="/login">
                Login
              </Link>
            </Text>
          </Stack>

          <Stack spacing={4}>
            <FormInput name="email" label="Email Address" placeholder="e.g. john.doe@zayroll.com" />
          </Stack>

          <Stack spacing={6}>
            <Button
              color="white"
              bgColor="#010C14"
              p="3"
              _hover={{
                bg: "#210D35",
              }}>
              Reset Password
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>

    <Flex bgColor="#210D35" color="white" flex={1} align={"center"} justify={"center"}>
      <HStack flex={1} align={"start"} justify={"end"}>
        <Stack p={8} maxW={"md"}>
          <Heading>Zayroll</Heading>
          <Text>The open-source payroll Infrastructure for African businesses.</Text>
        </Stack>

        <Image alt={"Image"} src={"images/Payroll.png"} />
      </HStack>
    </Flex>
  </Stack>
);

export default View;
