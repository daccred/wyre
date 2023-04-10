import { Button, Flex, Link, Stack, HStack, Image, Text } from '@chakra-ui/react';
import * as React from 'react';

import { FormInput, FormNativeSelect } from '../../components/forms';

type Props = {
  isSubmitting?: boolean;
};

const View: React.FC<Props> = (Props) => {
  const { isSubmitting } = Props;

  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Stack flex={1}>
        <Link href="/">
          <Image src="/Zayroll Logo.png" alt="zayroll logo" w={24} m={12} />
        </Link>

        <Flex flex={1} align={{ base: '', md: 'start' }} p={12}>
          <Stack spacing={8} w="full" maxW="md">
            <Stack>
              <Text color="#010C14" fontWeight="bold" fontSize={{ base: '3xl', md: '4xl' }}>
                Create Account
              </Text>
              <Text color="muted">
                Already have an account?{' '}
                <Link color="#8D1CFF" href="/login">
                  Login
                </Link>
              </Text>
            </Stack>

            <Stack spacing={6}>
              <FormInput name="company" type="text" label="Company Name" placeholder="e.g. Zayroll LLC" />
              <FormNativeSelect
                label="Country"
                name="country"
                options={[
                  { value: 'ghana', label: 'Ghana' },
                  { value: 'nigeria', label: 'Nigeria' },
                ]}
              />
              <FormInput name="firstName" type="text" label="First Name" placeholder="John" />
              <FormInput name="lastName" type="text" label="Last Name" placeholder="Doe" />
              <FormInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="john-mcdonald@zayroll.com"
              />
              <FormInput name="role" type="text" label="Job Role" placeholder="e.g. chief people officer" />
              <FormInput name="companyPhone" type="number" label="Company Phone" placeholder="phone number" />
              <FormInput name="password" type="password" label="Password" placeholder="***************" />
              <FormInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="***************"
              />

              <Button
                bg="#010C14"
                color="white"
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                _hover={{ bg: '' }}>
                Create Account
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>

      <Flex bgColor="#210D35" color="white" flex={1} align="center" justify="center">
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
