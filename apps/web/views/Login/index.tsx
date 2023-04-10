import { Center, Stack, Text, Button, Flex, Link, HStack, Image } from '@chakra-ui/react';
import * as React from 'react';

import { FormInput } from '../../components';

type Props = {
  isSubmitting: boolean;
};

const View: React.FC<Props> = (Props) => {
  const { isSubmitting } = Props;

  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
      <Stack flex={1}>
        <Link href="/">
          <Image src="/Zayroll Logo.png" alt="wyre logo" w={24} m={12} />
        </Link>

        <Flex flex={1} align={{ base: '', md: 'start' }} p={12}>
          <Stack spacing={8} w="full" maxW="md">
            <Stack>
              <Text color="#010C14" fontWeight="bold" fontSize={{ base: '3xl', md: '4xl' }}>
                Login
              </Text>
              <Text color="#010C14">
                Don’t have an account?{' '}
                <Link color="#8D1CFF" href="/sign-up">
                  Create Account
                </Link>
              </Text>
            </Stack>

            <Stack spacing="6" pb="4">
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
                  bg="#010C14"
                  color="white"
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  // _hover={{
                  //   bg: '#210D35',
                  // }}
                  _hover={{ bg: '' }}>
                  Login
                </Button>
                <Center>
                  Forgot Password?
                  <Link color="#8D1CFF" marginLeft={2} href="/forgot-password">
                    Reset
                  </Link>
                </Center>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Stack>

      <Flex position={'relative'} bgColor="#210D35" color="white" flex={3} align="center" justify="center">
        <HStack flex={1} align="start" justify="end">
          <Stack p={8} maxW="md">
            <Text fontWeight="600" fontSize={{ base: '5xl', md: '6xl' }}>
              WYRE
            </Text>
            <Text>The open-source payroll Infrastructure for African businesses.</Text>
          </Stack>

          <Image alt="Image" src="images/Payroll.png" />
        </HStack>
      </Flex>
    </Stack>
  );
};

export default View;
