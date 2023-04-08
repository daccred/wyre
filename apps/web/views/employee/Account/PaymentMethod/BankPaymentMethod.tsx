import { Flex, Heading, Link, Text, Icon, VStack, Stack, Grid, GridItem, Button } from '@chakra-ui/react';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import z from 'zod';

import { FormInput, FormSelect, useForm } from '@wyrecc/components';
import Header from '@wyrecc/components/core/Header';

const manageProfileValidationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  accountName: z.string().min(1, 'Account Name is required'),
  bankName: z.string().min(1, 'Bank Name is required'),
  accountNumber: z.number().min(1, 'Account Number is required'),
  swiftCode: z.string(),
  routingNumber: z.number(),
  accountType: z.string().min(1, 'Account Type is required'),
  salaryPercentage: z.number().min(1, 'Wallet Address is required'),
});

type FormInputOptions = z.infer<typeof manageProfileValidationSchema>;

const View = () => {
  const Submit = (data: FormInputOptions) => {
    // signUp({});
    console.log(data);
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: manageProfileValidationSchema,
  });
  return (
    <Header>
      <VStack width="100%" align="left" spacing={3}>
        <Link href="/employee/account/payment-method" color="brand.700" fontWeight={700}>
          <Flex align="center">
            <Icon as={FiChevronLeft} />
            <Text ml={2}>Back</Text>
          </Flex>
        </Link>
        <Heading as="h4" size="xs" fontSize="xl" color="brand.700">
          Add Bank Account
        </Heading>
        {renderForm(
          <Stack spacing="6" pb="4">
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem colSpan={2}>
                <FormSelect
                  label="Select Country"
                  name="country"
                  options={[
                    { value: 'GH', label: 'Ghana' },
                    { value: 'NIG', label: 'Nigeria' },
                  ]}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormInput name="accountName" type="text" label="Account Name" placeholder="e.g. John Doe" />
              </GridItem>
              <GridItem colSpan={2}>
                <FormSelect
                  label="Select Bank"
                  name="bankName"
                  options={[
                    { value: 'Access', label: 'Access Bank' },
                    { value: 'Stanbic', label: 'Stanbic Bank' },
                    { value: 'Ecobank', label: 'EcoBank' },
                    { value: 'Fidelity', label: 'Fidelity Bank' },
                  ]}
                />
              </GridItem>
              <GridItem>
                <FormInput
                  name="accountNumber"
                  type="number"
                  label="Account Number"
                  placeholder="e.g. 0123456789"
                />
              </GridItem>
              <GridItem>
                <FormInput name="swiftCode" label="Swift Code" placeholder="e.g. e.g. AB76839" />
              </GridItem>
              <GridItem>
                <FormInput
                  name="routingNumber"
                  type="number"
                  label="Routing Number"
                  placeholder="e.g. e.g. 0123456789"
                />
              </GridItem>
              <GridItem>
                <FormSelect
                  label="Account Type"
                  name="accountType"
                  options={[
                    { value: 'Savings', label: 'Savings Account' },
                    { value: 'Current', label: 'Current Account' },
                    { value: 'Ecobank', label: 'EcoBank' },
                    { value: 'Fidelity', label: 'Fidelity Bank' },
                  ]}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormInput
                  type="number"
                  name="salaryPercentage"
                  label="Salary Allocation in %  (no decimal)"
                  placeholder="e.g 15"
                />
              </GridItem>
            </Grid>
            <Button bg="primary.500" color="white" _hover={{ hover: 'none' }}>
              Add Bank Account
            </Button>
          </Stack>
        )}
      </VStack>
    </Header>
  );
};

export default View;
