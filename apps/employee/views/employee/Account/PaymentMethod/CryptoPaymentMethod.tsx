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
} from "@chakra-ui/react";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import z from "zod";

import { FormInput, FormSelect, useForm } from "@wyrecc/components";
import Header from "@wyrecc/components/core/Header";

const manageProfileValidationSchema = z.object({
  cryptocurrency: z.string().min(1, "Crypto Currency is required"),
  walletAddress: z.string().min(1, "Wallet Address is required"),
  salaryPercentage: z.number().min(1, "Wallet Address is required"),
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
          Add Crypto Wallet
        </Heading>
        {renderForm(
          <Stack spacing="6" pb="4">
            <Grid gap={4}>
              <GridItem>
                <FormSelect
                  label="Select Cryptocurrency"
                  name="cryptocurrency"
                  options={[
                    { value: "BTC", label: "Bitcoin(BTC)" },
                    { value: "ETH", label: "Ethereum(ETH)" },
                    { value: "USDT", label: "Tether (USDT)" },
                    { value: "BNB", label: "Binance Coin (BNB)" },
                    { value: "USDC", label: "U.S. Dollar Coin (USDC)" },
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
              <GridItem>
                <FormInput
                  type="number"
                  name="salaryPercentage"
                  label="Salary Allocation in %  (no decimal)"
                  placeholder="e.g 15"
                />
              </GridItem>
            </Grid>
            <Button bg="primary.500" color="white" _hover={{ hover: "none" }}>
              Add Wallet
            </Button>
          </Stack>
        )}
      </VStack>
    </Header>
  );
};

export default View;
