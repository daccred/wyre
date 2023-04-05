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
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import { trpc } from "utils/trpc";
import SuccessModal from "views/Payroll/modals/SuccessModal";
import z from "zod";

import { FormInput, useForm } from "../../../components/forms";

const manageExpenseValidationSchema = z.object({
  id: z.string().optional(),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Expense Type is required"),
  status: z.string().min(1, "Status is required"),
  employeeId: z.string().optional(),
  date: z.date().refine((value) => value !== null && !isNaN(value.getTime()), {
    message: "Date is required",
  }),
  attachment: z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().min(1, "Amount is required"),
  }),
});

type FormInputOptions = z.infer<typeof manageExpenseValidationSchema>;

type ManageExpenseModalTypes = {
  manageExpenseModalIsOpen: boolean;
  closeManageExpenseModal: () => void;
  data: any;
  refetch: () => void;
};

export default function ManageExpenseModal({
  manageExpenseModalIsOpen,
  closeManageExpenseModal,
  data,
  refetch,
}: ManageExpenseModalTypes) {
  const toast = useToast();
  const [status, setStatus] = useState(data?.status || "Pending");

  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    setModalData(data);
  }, [data]);

  const expenseId = modalData?.id;
  const successMessage =
    status === "Approved" ? "Expense Successfully Approved" : "Expense Request Disapproved";

  const {
    isOpen: successModalIsOpen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModal,
  } = useDisclosure();

  const { mutate: UpdateExpense, isLoading } = trpc.expenses.updateExpense.useMutation({
    onSuccess() {
      openSuccessModal();
      refetch();
    },
    onError(error: any) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
    },
  });

  const handleSubmit = async (data: FormInputOptions) => {
    try {
      UpdateExpense({
        expensId: expenseId,
        data: {
          amount: data?.amount,
          description: data?.description,
          type: data?.type as "Reimbursement",
          status: status as "Approved" | "Pending" | "Disapproved",
          employeeId: data?.employeeId as string,
          date: data?.date,
          attachment: {
            title: data?.attachment?.title,
            url: data?.attachment?.url,
          },
        },
      });
      closeManageExpenseModal();
    } catch (error) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
    }
  };

  const { renderForm, setFormValue } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: manageExpenseValidationSchema,
  });
  useEffect(() => {
    if (modalData) {
      setFormValue("employeeId", modalData?.employeeId || modalData?.employee?.id);
      setFormValue("amount", modalData?.amount);
      setFormValue("description", modalData?.description);
      setFormValue("type", modalData?.type);
      setFormValue("status", status);

      setFormValue("date", modalData?.date);
      setFormValue("attachment", modalData?.attachment);
    }
  }, [modalData, expenseId, setFormValue, status]);

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
                        value={modalData?.employee?.firstName || modalData?.employee?.lastName}
                        readOnly
                      />

                      <FormInput
                        name="amount"
                        label="Amount"
                        placeholder="Enter Amount"
                        px="4"
                        value={modalData?.amount}
                        sssss
                        readOnly
                      />
                    </HStack>
                    <FormInput
                      name="description"
                      label="Purpose"
                      placeholder="Enter Purpose"
                      px="4"
                      value={modalData?.description}
                      readOnly
                    />
                  </Stack>
                  <Stack>
                    <Text fontSize="sm">Attachment</Text>
                    <Center p="4" border="1px solid #d2d2d2" bg="#F7F7F7" borderRadius="5px">
                      <Image src={modalData?.attachment?.url} alt="" />
                    </Center>
                  </Stack>

                  <HStack>
                    <Button
                      variant="darkBtn"
                      rightIcon={<BsCheck2Circle color="white" fontSize="20px" />}
                      iconSpacing="3"
                      type="submit"
                      isLoading={isLoading}
                      loadingText="Submitting"
                      onClick={() => setStatus("Approved")}
                      fontSize="sm"
                      px="6"
                      _hover={{ bg: "" }}>
                      Approve
                    </Button>
                    <Button
                      loadingText="Submitting"
                      type="submit"
                      variant="outline"
                      rightIcon={<IoClose color="#210D35" fontSize="20px" />}
                      iconSpacing="3"
                      borderColor="#210D35"
                      w="fit-content"
                      height="44px"
                      fontSize="sm"
                      isLoading={isLoading}
                      onClick={() => setStatus("Disapproved")}>
                      Disapprove
                    </Button>
                  </HStack>
                </Stack>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SuccessModal
        successModalIsOpen={successModalIsOpen}
        closeSuccessModal={closeSuccessModal}
        message={successMessage}
        pathname="/expenses/manage-expenses"
      />
    </>
  );
}
