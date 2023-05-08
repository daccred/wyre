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
import { FormNativeSelect, FormInput, useForm } from 'components';
import CustomTab from 'components/customTab';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from 'utils/trpc';
import z from 'zod';
import styledToast from '../../../components/core/StyledToast';

const addPaymentValidationSchema = z.object({
  mobileMoneyProvider: z.string().min(1, { message: 'Mobile Money Provider is Required' }),
  mobileMoneyNumber: z.number({
    required_error: 'Mobile number is required',
    invalid_type_error: 'Mobile number must be a number',
  }),
  mobileMoneyAllocation: z
    .number({
      required_error: 'Mobile allocation is required',
      invalid_type_error: 'Mobile number must be a number',
    })
    .max(100, { message: 'Mobile allocation must be less or equal to 100' }),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.number({
    required_error: 'Account number is required',
    invalid_type_error: 'Mobile number must be a number',
  }),
  bankCountry: z.string(),
  bankAllocation: z
    .number({
      required_error: 'Bank allocation is required',
      invalid_type_error: 'Mobile number must be a number',
    })
    .max(100, { message: 'Bank allocation must be less or equal to 100' }),
  cryptocurrency: z.enum(['BTC', 'ETH', 'BNB', 'USDC']),
  walletAddress: z.string().min(1, 'Wallet Address is required'),
  crytoAllocation: z
    .number({
      required_error: 'Crypto allocation is required',
      invalid_type_error: 'Mobile number must be a number',
    })
    .max(100, { message: 'Crypto allocation must be less or equal to 100' }),
  // cryptoNetwork: z.string(),
});

type FormInputOptions = z.infer<typeof addPaymentValidationSchema>;

const ManageEmployee = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const { data: employee, refetch } = trpc.team.getSinglePersonnel.useQuery(
    { personnelId: id as string },
    {
      refetchOnMount: true,
    }
  );
  // console.log(employee);
  const {
    firstName,
    lastName,
    status,
    email,
    department,
    jobRole,
    teamCategory,
    signBonus,
    salary,
    payrollMethod,
  } = employee ?? {};
  const { mutate: updateEmployee, isLoading } = trpc.team.updatePersonnel.useMutation({
    onSuccess() {
      refetch();
      styledToast({
        status: 'success',
        description: 'Profile has been updated successfully',
        toast: toast,
      });
    },
    onError(error: unknown) {
      toast({
        status: 'error',
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = async (data: FormInputOptions) => {
    // console.log(JSON.stringify(data));
    try {
      updateEmployee({
        id: employee?.id ?? '', // pass the ID of the employee that you want to update
        data: {
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          email: email ?? '',
          department: department ?? '',
          jobRole: jobRole ?? '',
          salary: salary ?? '',
          signBonus: signBonus ?? '',
          status: status as boolean | undefined,
          category: teamCategory,
          payrollMethod: payrollMethod,
          bank: {
            name: data.bankName ?? '',
            accountNumber: data.accountNumber?.toString(),
            country: data.bankCountry ?? '',
            allocation: data.bankAllocation ?? 0,
            personnelId: employee?.id ?? '',
            bankCode: '1234', // example value
            swiftCode: '5678', // example value
            routingNumber: '9012', // example value
            accountType: 'Savings', // example value
          },
          mobileMoney: {
            provider: data.mobileMoneyProvider ?? '',
            phoneNumber: data.mobileMoneyNumber?.toString(),
            allocation: data.mobileMoneyAllocation ?? 0,
            personnelId: employee?.id ?? '',
          },
          cryptoWallet: {
            currency: data.cryptocurrency ?? '',
            address: data.walletAddress ?? '',
            network: 'Testnet',
            allocation: data.crytoAllocation || 0,
            personnelId: employee?.id ?? '',
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const { renderForm, setFormValue } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    // defaultValues: {
    //   mobileMoneyProvider: '',
    //   mobileMoneyNumber: 0,
    //   mobileMoneyAllocation: 0,
    //   bankName: '',
    //   accountNumber: 0,
    //   bankAllocation: 0,
    //   walletAddress: '',
    //   crytoAllocation: 0,
    // },
    schema: addPaymentValidationSchema,
  });

  return renderForm(
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

        <TabPanels>
          <TabPanel>
            <Stack>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem>
                  <FormNativeSelect
                    label="Select Country"
                    name="bankCountry"
                    options={[
                      { value: 'GH', label: 'Ghana' },
                      { value: 'NIG', label: 'Nigeria' },
                    ]}
                  />
                </GridItem>
                <GridItem>
                  <FormNativeSelect
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
                    name="bankAllocation"
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
                  <FormNativeSelect
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
                {/* <GridItem>
                    <FormNativeSelect
                      name="cryptoNetwork"
                      label="Select Network"
                      options={[
                        { value: 'BTC', label: 'Bitcoin(BTC)' },
                        { value: 'ETH', label: 'Ethereum(ETH)' },
                        { value: 'BNB', label: 'Binance Coin (BNB)' },
                        { value: 'USDC', label: 'U.S. Dollar Coin (USDC)' },
                      ]}
                    />
                  </GridItem> */}
                <GridItem colSpan={2}>
                  <FormInput
                    type="number"
                    name="crytoAllocation"
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
                  <FormNativeSelect
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
                    name="mobileMoneyNumber"
                    type="number"
                    label="Phone Number"
                    placeholder="e.g. 0987456321"
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    type="number"
                    name="mobileMoneyAllocation"
                    label="Salary Allocation in %  (no decimal)"
                    placeholder="e.g 15"
                  />
                </GridItem>
              </Grid>
            </Stack>
          </TabPanel>
        </TabPanels>
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
