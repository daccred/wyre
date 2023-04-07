import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import z from "zod";

import { FormInput, FormSelect, useForm } from "@wyrecc/components";

import PaymentMethodType from "../Account/Modals/PaymentMethodType";

const paymentLinkValidationSchema = z.object({
  email: z.string().email(),
  amount: z.number().min(1, "Amount is required"),
  purpose: z.string().min(1, "Purpose is required"),
  paymentMethod: z.string().min(1, "Payment Method is required"),
});

type FormInputOptions = z.infer<typeof paymentLinkValidationSchema>;

const View = () => {
  const {
    isOpen: paymentMethodModalIsOpen,
    onOpen: openPaymentMethodModal,
    onClose: closePaymentMethodModal,
  } = useDisclosure();

  const Submit = (data: FormInputOptions) => {
    console.log(data);
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: paymentLinkValidationSchema,
  });

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" justifyContent="space-between" my={12}>
        <GridItem />
        <GridItem>
          <VStack>
            <Link href="/">
              <Image src="/Zayroll Logo.png" alt="Wyre" />
            </Link>
          </VStack>
          <VStack mt={6}>
            <Heading as="h4" size="xs" fontSize="2xl" color="brand.700">
              One-off Payment Link
            </Heading>
            <Text color="lightgrey">The link is valid for a single payment request.</Text>
          </VStack>
          {renderForm(
            <Box mt={6}>
              <Stack spacing={3}>
                {/* TODO: Email should be prefilled */}
                <FormInput name="email" type="email" label="Email" placeholder="e.g. john.doe@zayroll.com" />
                <FormInput name="amount" type="number" label="Amount($)" placeholder="0" />
                <FormInput name="lastName" type="text" label="Last Name" placeholder="Doe" />
                <FormInput
                  type="text"
                  name="purpose"
                  label="Purpose"
                  placeholder="e.g. Flight ticket for tech summit"
                />
                <FormInput name="country" label="Country" placeholder="Country" />
                {/* TODO: Payment method options are based on the options added by the user to their account */}
                <Box>
                  <FormSelect
                    label="Payment Method"
                    name="paymentMethod"
                    options={[
                      { value: "Crypto", label: "Crypto" },
                      { value: "Bank Transfer", label: "Bank Transfer" },
                      { value: "Mobile Money", label: "Mobile Money" },
                    ]}
                  />
                  <Box mt={2}>
                    Click to add a new{" "}
                    <Box
                      as="span"
                      color="primary.500"
                      fontWeight={700}
                      cursor="pointer"
                      onClick={() => openPaymentMethodModal()}>
                      payment method
                    </Box>
                  </Box>
                </Box>
              </Stack>
              <Button bg="primary.500" w="full" mt={6} color="white" _hover={{ hover: "none" }}>
                Submit
              </Button>
            </Box>
          )}
        </GridItem>
        <GridItem />
      </Grid>
      <PaymentMethodType
        paymentMethodModalIsOpen={paymentMethodModalIsOpen}
        closePaymentMethodModal={closePaymentMethodModal}
      />
    </>
  );
};

export default View;
