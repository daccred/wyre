import { Avatar, Button, HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import z from 'zod';
import styledToast from '../../../components/core/StyledToast';
import { FormInput, FormNativeSelect, useForm } from '../../../components/forms';
import { trpc } from '../../../utils/trpc';
import { ProfileIcon } from './ProviderIcons';
import Terminate from './terminateContractor';

const addContractorValidationSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  email: z.string().email(),
  department: z.string().min(1, { message: 'Required' }),
  jobRole: z.string().min(1, { message: 'Required' }),
  category: z.enum(['CONTRACTOR', 'EMPLOYEE']),
  payrollMethod: z.enum(['CRYPTO', 'BANK', 'MOBILEMONEY']),
});

type FormInputOptions = z.infer<typeof addContractorValidationSchema>;

export default function ContractorForm() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const { data: contractor, refetch } = trpc.team.getSingleContractor.useQuery(id as string, {
    refetchOnMount: true,
  });

  const { firstName, lastName } = contractor ?? {};
  // hook to update the contractor data on the server API
  const { mutate: updateContractor, isLoading } = trpc.team.updatePersonnel.useMutation({
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
  // called when the form is submitted to update the contractor data on the server API
  const handleSubmit = async (data: FormInputOptions) => {
    try {
      updateContractor({
        id: contractor?.id ?? '', // pass the ID of the contractor that you want to update
        data: {
          firstName: data.name,
          lastName: data.name,
          email: data.email,
          department: data.department,
          jobRole: data.jobRole,
          salary: contractor?.salary ?? '',
          signBonus: contractor?.signBonus ?? '',
          status: true,
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
    schema: addContractorValidationSchema,
  });
  // hook to set the default form values when the contractor data is available.
  useEffect(() => {
    if (contractor) {
      setFormValue('name', contractor.firstName ?? '');
      setFormValue('email', contractor.email ?? '');
      setFormValue('department', contractor.department ?? '');
      setFormValue('jobRole', contractor.jobRole ?? '');
      setFormValue('category', contractor.teamCategory ?? '');
      setFormValue('payrollMethod', contractor.payrollMethod ?? '');
    }
  }, [contractor, setFormValue]);

  return renderForm(
    <Stack spacing="6" pb="4" mt="-0.5rem">
      <Text fontWeight="bold" fontSize="18px">
        Personal Details
      </Text>

      <Stack spacing={3}>
        <Avatar size="xl" src="" name={firstName ?? ''} />
        <HStack>
          <FormInput name="name" label="First Name" placeholder="First Name" />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            defaultValue={lastName}
            disabled
          />
        </HStack>
        <HStack>
          <FormInput name="email" label="Email Address" placeholder="Email Address" />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            defaultValue={contractor?.phone}
            disabled
          />
        </HStack>
        <HStack>
          <FormInput name="city" label="Address" placeholder="Address" disabled />
          <FormInput
            name="country"
            label="Country"
            placeholder="Country"
            defaultValue={contractor?.country}
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
              { label: 'contractor', value: 'contractor' },
            ]}
          />
          <FormInput name="payrollMethod" label="Payroll Method" placeholder="Payroll Method" disabled />
        </HStack>
        <HStack>
          <FormInput name="department" label="Department" placeholder="Select Department" />
          <FormInput name="jobRole" label="Job Role" placeholder="Job Role" />
        </HStack>
      </Stack>

      <HStack spacing="4" pt="4">
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
