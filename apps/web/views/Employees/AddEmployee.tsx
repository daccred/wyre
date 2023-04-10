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
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import z from 'zod';

import { FormInput, useForm, FormNativeSelect } from '../../components/forms';
import { trpc } from '../../utils/trpc';
import { PeopleIcon } from './ProviderIcons';

const addEmployeeValidationSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  email: z.string().email(),
  department: z.string().min(1, { message: 'Required' }),
  jobRole: z.string().min(1, { message: 'Required' }),
  grossSalary: z.string().min(1, { message: 'Required' }),
  signingBonus: z.string().min(1, { message: 'Required' }),
  category: z.enum(['CONTRACTOR', 'EMPLOYEE']).default('EMPLOYEE'),
  payrollMethod: z.enum(['CRYPTO', 'BANK', 'MOBILEMONEY']),
});

type FormInputOptions = z.infer<typeof addEmployeeValidationSchema>;

type addEmployeeTypes = {
  openAddEmployeeSuccessModal: () => void;
  addEmployeeModalIsOpen: boolean;
  closeAddEmployeeModal: () => void;
};

export default function AddEmployee({
  openAddEmployeeSuccessModal,
  addEmployeeModalIsOpen,
  closeAddEmployeeModal,
}: addEmployeeTypes) {
  const toast = useToast();

  const handleSubmit = async (data: FormInputOptions) => {
    // console.log(JSON.stringify(data));
    addEmployee({
      name: data.name,
      email: data.email,
      department: data.department,
      jobRole: data.jobRole,
      salary: data.grossSalary,
      signBonus: data.signingBonus,
      status: true,
      category: 'EMPLOYEE',
      payrollMethod: data.payrollMethod,
    });
  };

  const { renderForm, resetForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: addEmployeeValidationSchema,
  });

  const { mutate: addEmployee, isLoading } = trpc.team.createPersonnel.useMutation({
    onSuccess() {
      // Reset the form data to empty values
      resetForm();
      openAddEmployeeSuccessModal();
      closeAddEmployeeModal();
    },
    onError(error: any) {
      toast({
        status: 'error',
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
    },
  });

  return (
    <Modal
      onClose={closeAddEmployeeModal}
      isOpen={addEmployeeModalIsOpen}
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
                  <FormNativeSelect
                    name="payrollMethod"
                    label="Payroll Method"
                    placeholder="Select Category"
                    options={[
                      { label: 'CRYPTO', value: 'CRYPTO' },
                      { label: 'Bank', value: 'BANK' },
                      { label: 'Mobile Money', value: 'MOBILEMONEY' },
                    ]}
                  />
                </HStack>
              </Stack>
              <Text fontSize="sm">
                An email invitation will be sent to the employee upon submission of this form. Subsequent
                information will be completed by the employee.
              </Text>

              <Button
                isLoading={isLoading}
                loadingText="Submitting"
                variant="darkBtn"
                rightIcon={<PeopleIcon fill="white" />}
                iconSpacing="3"
                w="fit-content"
                type="submit"
                _hover={{ bg: '' }}>
                Add Employee
              </Button>
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
