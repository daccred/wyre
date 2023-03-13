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
import { IoCloseCircleOutline } from 'react-icons/io5';
import { trpc } from "utils/trpc";
import { useToast } from "@chakra-ui/react";


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

    const toast = useToast()

    const { mutate: addEmployee, isLoading,  } = trpc.employee.createEmployee.useMutation({
        onSuccess(data: any) {
        // Reset the form data to empty values
        
        openAddEmployeeSuccessModal();
        closeAddEmployeeModal()
            
        },
        onError(error: any) {
            toast({
                status: "error",
                description: `${error}`,
                isClosable: true,
                duration: 5000,
                position: 'top-right'
              });
          console.log('Error creating employee:', error);
        },
    })
    
  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));

    addEmployee({
        name: '',
        email: data.email,
        department: data.department,
        jobRole: data.jobRole,
        salary: data.grossSalary,
        signBonus: data.signingBonus,
        status: true,
        category: "EMPLOYEE",
      });
  };


  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
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
                            <FormInput
                            name="department"
                            label="Department"
                            placeholder="Select Department"
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

                    <Button 
                        isLoading={isLoading}
                        loadingText='Submitting' 
                        variant={"darkBtn"} 
                        rightIcon={<PeopleIcon fill={"white"} />} 
                        iconSpacing="3" 
                        w="fit-content" 
                        type="submit" 
                        _hover={{ bg: '' }}
                        // spinner={<BeatLoader size={8} color='white' />}
                    >
                    Add Employee
                    </Button>

                </Stack>)
                }
            </ModalBody>
            </ModalContent>
        </Modal>
        
    )
}
