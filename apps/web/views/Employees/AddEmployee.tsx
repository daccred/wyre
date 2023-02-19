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
import { IoCloseCircleOutline } from 'react-icons/io5'

const addEmployeeValidationSchema = z.object({
  email: z.string().email(),
  department:z.string().min(1, { message: "Required" }),
  jobRole:z.string().min(1, { message: "Required" }),
  grossSalary:z.string().min(1, { message: "Required" }),
  signingBonus:z.string().min(1, { message: "Required" }),

});

type FormInputOptions = z.infer<typeof addEmployeeValidationSchema>;

type addEmployeeTypes={
    openAddEmployeeSuccessModal: ()=>void,
    addEmployeeModalIsOpen: boolean,
    closeAddEmployeeModal:()=>void,
}

export default function AddEmployee({
    openAddEmployeeSuccessModal,
    addEmployeeModalIsOpen,
    closeAddEmployeeModal,
}:addEmployeeTypes) {
  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));
    openAddEmployeeSuccessModal();
    closeAddEmployeeModal()
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    schema: addEmployeeValidationSchema,
  });

  return(
        <Modal onClose={closeAddEmployeeModal} isOpen={addEmployeeModalIsOpen} closeOnOverlayClick={false} isCentered size={"3xl"}>
            <ModalOverlay />
            <ModalContent w="100%">
            <ModalHeader fontWeight="bold" fontSize="18px">Contract Details</ModalHeader>
            <ModalCloseButton m="1">
                <IoCloseCircleOutline fontSize={"28px"}/>
            </ModalCloseButton>
            <ModalBody>
            {renderForm
                (<Stack spacing={"6"} pb="4">
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
                                {label:'Tech', value:'tech'},
                                {label:'Time', value:'time'}
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
                        <Text fontWeight="bold" fontSize="18px">Compensation Details</Text>
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
                    <Text fontSize={"sm"}>An email invitation will be sent to the employee upon submission of this form. Subsequent information will be completed by the employee.</Text>

                    <Button variant={"darkBtn"} rightIcon={<PeopleIcon fill={"white"} />} iconSpacing="3" w="fit-content" type="submit" >Add Employee</Button>

                </Stack>)
                }
            </ModalBody>
            </ModalContent>
        </Modal>
        
    )
}
