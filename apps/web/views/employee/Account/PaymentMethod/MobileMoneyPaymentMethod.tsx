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
import { FormInput, FormSelect, useForm } from '@wyrecc/components';
import Header from '@wyrecc/components/core/Header';

const manageProfileValidationSchema = z.object({
  mobileMoneyProvider: z.string().min(1, 'Mobile Money Provider is required'),
  phoneNumber: z.number().min(1, 'Phone Number is required'),
  salaryPercentage: z.number().min(1, 'Wallet Address is required'),
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
        <Link href="/employee/account/payment-method" color="brand.700" fontWeight={700}>
          <Flex align="center">
            <Icon as={FiChevronLeft} />
            <Text ml={2}>Back</Text>
          </Flex>
        </Link>
        <Heading as="h4" size="xs" fontSize="xl" color="brand.700">
          Add Mobile Wallet
        </Heading>
        {renderForm(
          <Stack spacing="6" pb="4">
            <Grid gap={4}>
              <GridItem>
                <FormSelect
                  label="Select Mobile Money Provider"
                  name="mobileMoneyProvider"
                  options={[
                    { value: 'MTN', label: 'MTN' },
                    { value: 'VODAFONE', label: 'VODAFONE' },
                    { value: 'AIRTELTIGO', label: 'AIRTELTIGO' },
                  ]}
                />
              </GridItem>
              <GridItem>
                <FormInput
                  name="phoneNumber"
                  type="number"
                  label="Phone Number"
                  placeholder="e.g. 0987456321"
                />
              </GridItem>
              <GridItem>
                <FormInput
                  type="number"
                  name="salaryPercentage"
                  label="Salary Allocation in %  (no decimal)"
                  placeholder="e.g 15"
                />
              </GridItem>
            </Grid>
            <Button bg="primary.500" color="white" _hover={{ hover: 'none' }}>
              Add Mobile Wallet
            </Button>
          </Stack>
        )}
      </VStack>
    </Header>
  );
};

export default View;
