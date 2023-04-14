import {
  Flex,
  Heading,
  Link,
  Text,
  Icon,
  VStack,
  Stack,
  Avatar,
  Grid,
  GridItem,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import z from 'zod';
import { FormInput, useForm } from '@wyrecc/components';
import Header from '@wyrecc/components/core/Header';

const manageProfileValidationSchema = z.object({
  lastName: z.string().min(1, 'Last name is required'),
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .regex(/^(\+)?[1-9]\d{1,14}$/)
    .transform((value) => (value.startsWith('+') ? value : `+${value}`)),
  country: z.string(),
  city: z.string(),
});

type FormInputOptions = z.infer<typeof manageProfileValidationSchema>;

const View = () => {
  const Submit = (data: FormInputOptions) => {
    // signUp({});
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: manageProfileValidationSchema,
  });
  return (
    <Header>
      <VStack width="100%" align="left" spacing={3}>
        <Link href="/employee/account/" color="brand.700" fontWeight={700}>
          <Flex align="center">
            <Icon as={FiChevronLeft} />
            <Text ml={2}>Back</Text>
          </Flex>
        </Link>
        <Heading as="h4" size="xs" fontSize="xl" color="brand.700">
          Manage Profile
        </Heading>
        {renderForm(
          <Stack spacing="6" pb="4">
            <Avatar
              name="Jane Doe"
              src="https://i.pinimg.com/736x/0c/79/4a/0c794af29e09b778dec90c73a2aeeb34.jpg"
              size="lg"
            />
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                <FormInput name="firstName" type="text" label="First Name" placeholder="Jane" />
              </GridItem>
              <GridItem>
                <FormInput name="lastName" type="text" label="Last Name" placeholder="Doe" />
              </GridItem>
              <GridItem colSpan={2}>
                <FormInput name="email" type="email" label="Email" placeholder="e.g. john.doe@zayroll.com" />
              </GridItem>
              <FormInput type="tel" name="phoneNumber" label="Phone Number" placeholder="Phone Number" />
              <FormInput name="country" label="Country" placeholder="Country" />
              <GridItem colSpan={2}>
                <FormInput name="city" label="City" placeholder="City" />
              </GridItem>
            </Grid>
            <Button bg="primary.500" color="white" _hover={{ hover: 'none' }}>
              Save Profile
            </Button>
          </Stack>
        )}
      </VStack>
    </Header>
  );
};

export default View;
