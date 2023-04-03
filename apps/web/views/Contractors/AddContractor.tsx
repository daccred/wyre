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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import z from "zod";

import { FormInput, useForm } from "../../components/forms";
import { trpc } from "../../utils/trpc";
import { PeopleIcon } from "./ProviderIcons";

const addContractorValidationSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  department: z.string().min(1, { message: "Deparment is Required" }),
  jobRole: z.string().min(1, { message: "JobRole is Required" }),
  grossSalary: z.string().min(1, { message: "Gross salary is Required" }),
  signingBonus: z.string().min(1, { message: "Bonus is Required" }),
});

type FormInputOptions = z.infer<typeof addContractorValidationSchema>;

type addContractorTypes = {
  openAddContractorSuccessModal: () => void;
  addContractorModalIsOpen: boolean;
  closeAddContractorModal: () => void;
};

export default function AddContractor({
  openAddContractorSuccessModal,
  addContractorModalIsOpen,
  closeAddContractorModal,
}: addContractorTypes) {
  const toast = useToast();

  const handleSubmit = async (data: FormInputOptions) => {
    // console.log(JSON.stringify(data));
    addContractor({
      name: data.name,
      email: data.email,
      department: data.department,
      jobRole: data.jobRole,
      grossSalary: data.grossSalary,
      signingBonus: data.signingBonus,
      status: true,
      category: "CONTRACTOR",
    });
  };

  const { renderForm, resetForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: addContractorValidationSchema,
  });

  const { mutate: addContractor, isLoading } = trpc.contractor.createContractor.useMutation({
    onSuccess() {
      // Reset the form data to empty values
      resetForm();
      openAddContractorSuccessModal();
      closeAddContractorModal();
    },
    onError(error: any) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
      console.log("Error creating contractor:", error);
    },
  });

  return (
    <Modal
      onClose={closeAddContractorModal}
      isOpen={addContractorModalIsOpen}
      closeOnOverlayClick={false}
      isCentered
      size="3xl">
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalHeader fontWeight="bold" fontSize="18px">
          Contract Details
        </ModalHeader>
        <ModalCloseButton m="1">
          <IoCloseCircleOutline fontSize="28px" />
        </ModalCloseButton>
        <ModalBody>
          {renderForm(
            <Stack spacing="6" pb="4">
              <Stack>
                <FormInput name="name" label="Full Name" placeholder="John Doe" />

                <FormInput name="email" label="Email Address" placeholder="Email Address" />
                <HStack>
                  <FormInput name="department" label="Department" placeholder="Enter Department" />

                  <FormInput name="jobRole" label="Job Role" placeholder="Enter Job Role" />
                </HStack>
              </Stack>
              <Stack>
                <Text fontWeight="bold" fontSize="18px">
                  Compensation Details
                </Text>
                <HStack>
                  <FormInput name="grossSalary" label="Gross Salary" placeholder="$0" />

                  <FormInput name="signingBonus" label="Signing Bonus" placeholder="$0" />
                </HStack>
              </Stack>
              <Text fontSize="sm">
                An email invitation will be sent to the contractor upon submission of this form. Subsequent
                information will be completed by the contractor.
              </Text>

              <Button
                isLoading={isLoading}
                loadingText="Submitting"
                variant="darkBtn"
                rightIcon={<PeopleIcon fill="white" />}
                iconSpacing="3"
                w="fit-content"
                type="submit"
                _hover={{ bg: "" }}>
                Add Contractor
              </Button>
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
