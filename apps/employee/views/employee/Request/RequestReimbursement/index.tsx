import {
  Breadcrumb,
  Flex,
  Icon,
  BreadcrumbLink,
  Text,
  Stack,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "components/core/Header";
import { FormInput, useForm, FormUpload } from "components/forms";
import React from "react";
import z from "zod";

import { ArrowRightIcon } from "../providerIcon";

const reimbursementValidationSchema = z.object({
  purpose: z.string().min(1, "Purpose is required"),
  amount: z.string().min(1, "Amount is required"),
  upload: z.array(z.string()),
});

type FormInputOptions = z.infer<typeof reimbursementValidationSchema>;

const Index = () => {
  const {
    isOpen: addSuccessModalIsOpen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModal,
  } = useDisclosure();

  const Submit = (data: FormInputOptions) => {
    openSuccessModal();
  };

  const { renderForm, formState } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: reimbursementValidationSchema,
  });

  const isFormValid = !formState.isValid;

  return (
    <>
      <Header>
        <Box w="100%" my="5">
          <Breadcrumb>
            <Flex alignItems="center">
              <Icon as={ArrowRightIcon} />
              <BreadcrumbLink mb={2} fontWeight="bold" color="#210D35" href="/employee/home">
                {" "}
                Back
              </BreadcrumbLink>
            </Flex>
          </Breadcrumb>
          <Text fontSize="20px" fontWeight="bold" color="#210D35" my="4">
            Request Reimbursement
          </Text>
          {renderForm(
            <Stack spacing={4}>
              <FormInput
                name="purpose"
                type="text"
                label="Purpose"
                placeholder="e.g. Flight ticket for tech summit"
              />

              <FormInput name="amount" type="text" label="Amount" placeholder="$0" />

              <FormUpload name="upload" label="Upload Receipt" required={true} />
              <Button
                bg="primary.main"
                color="white"
                type="submit"
                // isDisabled={isFormValid}
                // isLoading={isSubmitting}
                _hover={{ bg: "" }}
                py={8}>
                Make Request
              </Button>
            </Stack>
          )}
        </Box>
      </Header>
      <Modal
        onClose={closeSuccessModal}
        isOpen={addSuccessModalIsOpen}
        isCentered
        size="sm">
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalBody>
            <Stack alignItems="center" justifyContent="center" p="4" textAlign="center">
              <Text fontWeight="bold" fontSize="18px">
                You’ve successfully
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
