import { Avatar, Button, HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import z from 'zod';
import styledToast from '../../../components/core/StyledToast';
import { FormInput, FormNativeSelect, useForm } from '../../../components/forms';
import { trpc } from '../../../utils/trpc';
import { ProfileIcon } from './ProviderIcons';
import Terminate from './terminateEmployee';

const addEmployeeValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is Required' }),
  lastName: z.string().min(1, { message: 'Last name is Required' }),
  email: z.string().email(),
  department: z.string().min(1, { message: 'Department is Required' }),
  jobRole: z.string().min(1, { message: 'Job Role is Required' }),
  category: z.enum(['CONTRACTOR', 'EMPLOYEE']),
  payrollMethod: z.enum(['CRYPTO', 'BANK', 'MOBILEMONEY']),
});

type FormInputOptions = z.infer<typeof addEmployeeValidationSchema>;

export default function EmployeeForm() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  const { data: employee, refetch } = trpc.team.getSinglePersonnel.useQuery(id as string, {
    refetchOnMount: true,
  });

  console.log(employee);
  const { firstName, lastName } = employee ?? {};

  // mutation hook from TRPC for updating an employee's data on the server.
  const { mutate: updateEmployee, isLoading } = trpc.team.updatePersonnel.useMutation({
    onSuccess() {
      refetch();
      styledToast({
        status: 'success',
        description: 'Profile has been updated successfully',
        toast: toast,
      });
    },
    onError(error: unknown) {
      toast({
        status: 'error',
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
    },
  });
  // asynchronous function that's called when the user submits the form. It calls the updateEmployee function with the ID of the employee being updated
  const handleSubmit = async (data: FormInputOptions) => {
    try {
      updateEmployee({
        id: employee?.id ?? '', // pass the ID of the employee that you want to update
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          department: data.department,
          jobRole: data.jobRole,
          salary: employee?.salary ?? '',
          signBonus: employee?.signBonus ?? '',
          status: employee?.status as boolean | undefined,
          category: data.category,
          payrollMethod: data.payrollMethod,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { renderForm, setFormValue } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: addEmployeeValidationSchema,
  });
  // hook that's called when the component mounts or when the employee or setFormValue variables change. It sets the initial form values based on the retrieved employee data
  useLayoutEffect(() => {
    if (employee) {
      setFormValue('firstName', employee.firstName ?? '');
      setFormValue('lastName', employee.lastName ?? '');
      setFormValue('email', employee.email ?? '');
      setFormValue('department', employee.department ?? '');
      setFormValue('jobRole', employee.jobRole ?? '');
      setFormValue('category', employee.teamCategory ?? '');
      setFormValue('payrollMethod', employee.payrollMethod ?? '');
    }
  }, [employee, setFormValue]);

  return renderForm(
    <Stack spacing="6" p="4" mt="-0.5rem">
      <Text fontWeight="bold" fontSize="18px">
        Personal Details
      </Text>

      <Stack spacing={3}>
        <Avatar size="xl" src="" name={firstName + ' ' + lastName || ''} />
        <HStack>
          <FormInput name="firstName" label="First Name" placeholder="First Name" />
          <FormInput name="lastName" label="Last Name" placeholder="Last Name" />
        </HStack>
        <HStack>
          <FormInput name="email" label="Email Address" placeholder="Email Address" />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            defaultValue={employee?.phone}
            disabled
          />
        </HStack>
        <HStack>
          <FormInput name="city" label="Address" placeholder="address" disabled />
          <FormInput
            name="country"
            label="Country"
            placeholder="Country"
            defaultValue={employee?.country}
            disabled
          />
        </HStack>
      </Stack>
      <Stack spacing={3}>
        <Text fontWeight="bold" fontSize="18px">
          Contract Details
        </Text>
        <HStack>
          <FormNativeSelect
            name="category"
            label="Category"
            placeholder="Select Category"
            options={[
              { label: 'Contractor', value: 'CONTRACTOR' },
              { label: 'Employee', value: 'EMPLOYEE' },
            ]}
          />
          <FormNativeSelect
            name="payrollMethod"
            label="Payroll Method"
            placeholder="Payroll Method"
            options={[
              { label: 'Crypto', value: 'CRYPTO' },
              { label: 'Bank', value: 'BANK' },
              { label: 'Mobile Money', value: 'MOBILEMONEY' },
            ]}
          />
        </HStack>
        <HStack>
          <FormInput name="department" label="Department" placeholder="Enter Department" />
          <FormInput name="jobRole" label="Job Role" placeholder="Job Role" />
        </HStack>
      </Stack>

      <HStack spacing="4">
        <Button
          variant="darkBtn"
          rightIcon={<ProfileIcon fill="#fff" stroke="#fff" />}
          iconSpacing="3"
          w="fit-content"
          type="submit"
          isLoading={isLoading}
          _hover={{ bg: '' }}
          loadingText="Updating">
          Update Profile
        </Button>
        <Terminate />
      </HStack>
    </Stack>
  );
}
