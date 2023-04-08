import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Stack,
  Grid,
  GridItem,
  Text,
  useToast,
  HStack,
  Button,
} from '@chakra-ui/react';
import { FormSelect, FormInput, useForm } from 'components';
import CustomTab from 'components/customTab';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from 'utils/trpc';
import z from 'zod';

import styledToast from '../../../components/core/StyledToast';

const addEmployeeValidationSchema = z.object({});

type FormInputOptions = z.infer<typeof addEmployeeValidationSchema>;

const ManageEmployee = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const { data: employee, isLoading } = trpc.team.getSinglePersonnel.useQuery(id as string, {
    refetchOnMount: true,
  });
  // console.log(employee);

  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));
    styledToast({
      status: 'success',
      description: 'Compensation has been updated successfully',
      toast: toast,
    });
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    schema: addEmployeeValidationSchema,
  });

  return (
    <>
      <Tabs variant="unstyled">
        <Text fontWeight="bold" fontSize="18px" my={4} px={4}>
          Payment Method
        </Text>
        <TabList>
          <CustomTab>Bank Payment</CustomTab>
          <CustomTab>Crypto Payment</CustomTab>
          <CustomTab>Mobile Money</CustomTab>
        </TabList>

        {renderForm(
          <TabPanels>
            <TabPanel>
              <Stack>
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  <GridItem>
                    <FormSelect
                      label="Select Country"
                      name="bankCountry"
                      options={[
                        { value: 'GH', label: 'Ghana' },
                        { value: 'NIG', label: 'Nigeria' },
                      ]}
                    />
                  </GridItem>
                  <GridItem>
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
                    <FormInput
                      type="number"
                      name="salaryPercentage"
                      label="Salary Allocation in %  (no decimal)"
                      placeholder="e.g 15"
                    />
                  </GridItem>
                </Grid>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing="6">
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  <GridItem>
                    <FormSelect
                      label="Select Cryptocurrency"
                      name="cryptocurrency"
                      options={[
                        { value: 'BTC', label: 'Bitcoin(BTC)' },
                        { value: 'ETH', label: 'Ethereum(ETH)' },
                        { value: 'BNB', label: 'Binance Coin (BNB)' },
                        { value: 'USDC', label: 'U.S. Dollar Coin (USDC)' },
                      ]}
                    />
                  </GridItem>
                  <GridItem>
                    <FormInput
                      name="walletAddress"
                      type="text"
                      label="Wallet Address"
                      placeholder="e.g. Ox000000000000000000000000000000000..."
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
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing="6">
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
                      name="mobileNumber"
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
              </Stack>
            </TabPanel>
          </TabPanels>
        )}
        <HStack spacing="4" p={4}>
          <Button
            variant="darkBtn"
            iconSpacing="3"
            w="fit-content"
            type="submit"
            isLoading={isLoading}
            _hover={{ bg: '' }}
            loadingText="Updating">
            Update Payment
          </Button>
        </HStack>
      </Tabs>
    </>
  );
};

export default ManageEmployee;
