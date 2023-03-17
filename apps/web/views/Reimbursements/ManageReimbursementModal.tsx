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
} from "@chakra-ui/react";
// import { trpc } from "../../utils/trpc";
import { useToast } from "@chakra-ui/react";
import { BsCheck2Circle } from "react-icons/bs";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import z from "zod";

import { FormInput, useForm } from "../../components/forms";

const addContractorValidationSchema = z.object({
  // name: z.string().min(1, { message: "Name is Required" }),
  // email: z.string().email(),
  // department: z.string().min(1, { message: "Deparment is Required" }),
  // jobRole: z.string().min(1, { message: "JobRole is Required" }),
  // grossSalary: z.string().min(1, { message: "Gross salary is Required" }),
  // signingBonus: z.string().min(1, { message: "Bonus is Required" }),
});

type FormInputOptions = z.infer<typeof addContractorValidationSchema>;

type ManageReimbursementModalTypes = {
  openManageReimbursementModal: () => void;
  manageReimbursementModalIsOpen: boolean;
  closeManageReimbursementModal: () => void;
  openApproveReimbursementSuccessModal: () => void;
  data: { [key: string]: string };
};

export default function ManageReimbursementModal({
  openManageReimbursementModal,
  manageReimbursementModalIsOpen,
  closeManageReimbursementModal,
  openApproveReimbursementSuccessModal,
  data,
}: ManageReimbursementModalTypes) {
  const toast = useToast();

  // const { mutate: addContractor, isLoading } =
  //   trpc.employee.createEmployee.useMutation({
  //     onSuccess(data: any) {
  //       // Reset the form data to empty values

  //       openAddContractorSuccessModal();
  //       closeAddContractorModal();
  //     },
  //     onError(error: any) {
  //       toast({
  //         status: "error",
  //         description: `${error}`,
  //         isClosable: true,
  //         duration: 5000,
  //         position: "top-right",
  //       });
  //       console.log("Error creating contractor:", error);
  //     },
  //   });

  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));

    // addContractor({
    //   name: data.name,
    //   email: data.email,
    //   department: data.department,
    //   jobRole: data.jobRole,
    //   salary: data.grossSalary,
    //   signBonus: data.signingBonus,
    //   status: true,
    //   category: "CONTRACTOR",
    // });
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    schema: addContractorValidationSchema,
  });

  return (
    <Modal
      onClose={closeManageReimbursementModal}
      isOpen={manageReimbursementModalIsOpen}
      closeOnOverlayClick={false}
      isCentered
      size="3xl">
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalHeader fontWeight="bold" fontSize="18px">
          Manage Reimbursement
        </ModalHeader>
        <ModalCloseButton m="1">
          <IoCloseCircleOutline fontSize="28px" />
        </ModalCloseButton>
        <ModalBody>
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
                    value={data?.fullName}
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
                  // w="fit-content"
                  type="submit"
                  fontSize="sm"
                  px="6"
                  _hover={{ bg: "" }}
                  onClick={openApproveReimbursementSuccessModal}>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
