import {
  Button,
  HStack,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  Image,
  Box,
} from "@chakra-ui/react";
import { BsCheck2Circle } from "react-icons/bs";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import z from "zod";

import { FormInput, useForm } from "../../../components/forms";

const manageExpenseValidationSchema = z.object({});

type FormInputOptions = z.infer<typeof manageExpenseValidationSchema>;

type ManageExpenseModalTypes = {
  manageExpenseModalIsOpen: boolean;
  closeManageExpenseModal: () => void;
  data: { [key: string]: string };
};

export default function ManageExpenseModal({
  manageExpenseModalIsOpen,
  closeManageExpenseModal,
  data,
}: ManageExpenseModalTypes) {
  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: manageExpenseValidationSchema,
  });

  return (
    <>
      <Modal
        onClose={closeManageExpenseModal}
        isOpen={manageExpenseModalIsOpen}
        closeOnOverlayClick={false}
        isCentered
        size="3xl">
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalHeader fontWeight="bold" fontSize="18px">
            Manage Expense
          </ModalHeader>
          <ModalCloseButton m="1">
            <IoCloseCircleOutline fontSize="28px" />
          </ModalCloseButton>
          <ModalBody>
            <Box>
              {renderForm(
                <Stack spacing="6" pb="4">
                  <Stack>
                    <HStack>
                      <FormInput
                        name="employee/contractor"
                        label="Employee/Contractor"
                        placeholder="Name"
                        style={{ textTransform: "capitalize" }}
                        px="4"
                        value={data?.name}
                        readOnly
                      />

                      <FormInput
                        name="amount"
                        label="Amount"
                        placeholder="Enter Amount"
                        px="4"
                        value={data?.amount}
                        readOnly
                      />
                    </HStack>
                    <FormInput
                      name="purpose"
                      label="Purpose"
                      placeholder="Enter Purpose"
                      px="4"
                      value={data?.purpose}
                      readOnly
                    />
                  </Stack>
                  <Stack>
                    <Text fontSize="sm">Attachment</Text>
                    <Center p="4" border="1px solid #d2d2d2" bg="#F7F7F7" borderRadius="5px">
                      <Image src="/images/invoice-wyre.png" alt="" />
                    </Center>
                  </Stack>

                  <HStack>
                    <Button
                      loadingText="Submitting"
                      variant="darkBtn"
                      rightIcon={<BsCheck2Circle color="white" fontSize="20px" />}
                      iconSpacing="3"
                      type="submit"
                      fontSize="sm"
                      px="6"
                      _hover={{ bg: "" }}>
                      Approve
                    </Button>
                    <Button
                      loadingText="Submitting"
                      variant="outline"
                      rightIcon={<IoClose color="#210D35" fontSize="20px" />}
                      iconSpacing="3"
                      borderColor="#210D35"
                      w="fit-content"
                      height="44px"
                      fontSize="sm">
                      Disapprove
                    </Button>
                  </HStack>
                </Stack>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
