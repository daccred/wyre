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
import z from "zod";
import { FormInput, FormNativeSelect, useForm } from "../../components/forms";
import { PeopleIcon } from "./ProviderIcons";
import { IoCloseCircleOutline } from "react-icons/io5";

const addContractorValidationSchema = z.object({
  email: z.string().email(),
  department: z.string().min(1, { message: "Required" }),
  jobRole: z.string().min(1, { message: "Required" }),
  grossSalary: z.string().min(1, { message: "Required" }),
  signingBonus: z.string().min(1, { message: "Required" }),
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
  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));
    openAddContractorSuccessModal();
    closeAddContractorModal();
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    schema: addContractorValidationSchema,
  });

  return (
    <Modal
      onClose={closeAddContractorModal}
      isOpen={addContractorModalIsOpen}
      closeOnOverlayClick={false}
      isCentered
      size={"3xl"}
    >
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalHeader fontWeight="bold" fontSize="18px">
          Contract Details
        </ModalHeader>
        <ModalCloseButton m="1">
          <IoCloseCircleOutline fontSize={"28px"} />
        </ModalCloseButton>
        <ModalBody>
          {renderForm(
            <Stack spacing={"6"} pb="4">
              <Stack>
                <FormInput
                  name="email"
                  label="Email Address"
                  placeholder="Email Address"
                />
                <HStack>
                  <FormNativeSelect
                    name="department"
                    label="Department"
                    placeholder="Select Department"
                    options={[
                      { label: "Tech", value: "tech" },
                      { label: "Time", value: "time" },
                    ]}
                  />

                  <FormInput
                    name="jobRole"
                    label="Job Role"
                    placeholder="Enter Job Role"
                  />
                </HStack>
              </Stack>
              <Stack>
                <Text fontWeight="bold" fontSize="18px">
                  Compensation Details
                </Text>
                <HStack>
                  <FormInput
                    name="grossSalary"
                    label="Gross Salary"
                    placeholder="$0"
                  />

                  <FormInput
                    name="signingBonus"
                    label="Signing Bonus"
                    placeholder="$0"
                  />
                </HStack>
              </Stack>
              <Text fontSize={"sm"}>
                An email invitation will be sent to the contractor upon
                submission of this form. Subsequent information will be
                completed by the contractor.
              </Text>

              <Button
                variant={"darkBtn"}
                rightIcon={<PeopleIcon fill={"white"} />}
                iconSpacing="3"
                w="fit-content"
                type="submit"
              >
                Add Contractor
              </Button>
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
