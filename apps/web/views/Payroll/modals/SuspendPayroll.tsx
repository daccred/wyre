import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { z } from 'zod';
import { FormInput, useForm } from '../../../components/forms';

interface ISuspendPayrolle {
  closeSuspendPayrollModal: () => void;
  suspendPayrolleModalIsOpen: boolean;
}

export const suspendPayrollValidationSchema = z.object({
  date: z.date(),
  time: z.date(),
});

type FormInputOptions = z.infer<typeof suspendPayrollValidationSchema>;

const SuspendPayroll = ({ closeSuspendPayrollModal, suspendPayrolleModalIsOpen }: ISuspendPayrolle) => {
  const { renderForm } = useForm<FormInputOptions>({
    // onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    // schema: addContractorValidationSchema,
  });

  return (
    <Modal
      onClose={closeSuspendPayrollModal}
      isOpen={suspendPayrolleModalIsOpen}
      closeOnOverlayClick={false}
      isCentered
      size="sm">
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalHeader fontWeight="bold" fontSize="18px">
          Run Payroll Later
        </ModalHeader>
        <ModalCloseButton m="1">
          <IoCloseCircleOutline fontSize="28px" />
        </ModalCloseButton>
        <ModalBody pb={6}>
          {renderForm(
            <Box>
              <Stack spacing={2} pb="4">
                <FormInput type="date" name="date" label="Date" />
                <FormInput type="time" name="time" label="Time" />
              </Stack>
              <Button mt={4} bg="brand.700" color="white" iconSpacing="3" w="100%" _hover={{ hover: 'none' }}>
                Schedule Payment
              </Button>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuspendPayroll;
