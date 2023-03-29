import {
  Button,
  FormControl,
  Flex,
  Stack,
  HStack,
  Image,
  Text,
  Link,
  Center,
  Heading,
  useToast,
  PinInputField,
  PinInput,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next/types";
import * as React from "react";

import { trpc } from "../../utils/trpc";

const View = () => {
  const [pinInputData, setPinInputData] = React.useState("");
  const toast = useToast();
  const router = useRouter();
  const { email, id } = router.query;

  console.log(id, email);

  const { mutate: verifyEmail, isLoading } = trpc.auth.verifyAdminEmail.useMutation({
    onSuccess() {
      toast({
        title: "Verification code confirmed.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      router.push("/login");
    },
    onError(error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      // console.log(error);
    },
  });

  const handleSubmit = () => {
    verifyEmail({ id: id as string, token: pinInputData as string });
  };

  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
      <Stack flex={1}>
        <Image src="/Zayroll Logo.png" alt="zayroll logo" w={24} m={12} />

        <Flex p={12} flex={1} align="start" justify={{ base: "", md: "", xl: "" }}>
          <Stack spacing={8} w="full" maxW="sm">
            <Stack>
              <Text color="#010C14" fontWeight="bold" fontSize={{ base: "3xl", md: "4xl" }}>
                Email Verification
              </Text>
              <Text color="#010C14">Kindly enter the verification code we sent to your email address</Text>
            </Stack>
            <Stack spacing={4} my={10}>
              <FormControl mb={4}>
                <Center>
                  <HStack>
                    <PinInput
                      size="lg"
                      mask
                      placeholder="-"
                      value={pinInputData}
                      onChange={(value) => setPinInputData(value)}>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </Center>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  bg="#010C14"
                  color="white"
                  type="submit"
                  isDisabled={pinInputData.length < 6}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  _hover={{ bg: "" }}>
                  Continue
                </Button>
              </Stack>

              <Text>
                {"Didn’t receive a verification code? "}
                <Link href="/" color="#8D1CFF">
                  Resend
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Stack>

      <Flex bgColor="#210D35" color="white" flex={1} align="center" justify="center">
        <HStack flex={1} align="start" justify="end">
          <Stack p={8} maxW="md">
            <Heading>Wyre</Heading>
            <Text>The open-source payroll Infrastructure for African businesses.</Text>
          </Stack>

          <Image alt="Image" src="images/Payroll.png" />
        </HStack>
      </Flex>
    </Stack>
  );
};

export default View;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const email = query.email as string;
  const id = query.id as string;

  return {
    props: {
      requireAuth: false,
      enableAuth: false,
      email,
      id: id,
    },
  };
};
