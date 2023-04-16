import { Button, Stack, Text, Flex, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import z from 'zod';
import styledToast from '../../../components/core/StyledToast';
import { FormInput, useForm } from '../../../components/forms';
import { trpc } from '../../../utils/trpc';

const updateContractorValidationSchema = z.object({
  grossSalary: z.number().min(1, { message: 'GrossSalary is Required' }),
  signinBonus: z.number().min(1, { message: 'SigningBonus Role is Required' }),
});

type FormInputOptions = z.infer<typeof updateContractorValidationSchema>;

const EditedFormInput = ({
  name,
  rightElementText,
  color,
  disabled,
}: {
  name: string;
  rightElementText: string;
  color: string;
  disabled?: boolean;
}) => {
  return (
    <FormInput
      name={name}
      rightElementText={rightElementText}
      rightElementTextStyle={{
        fontSize: '12px',
        height: '32px',
        width: 'fit-content',
        color: '#666666',
      }}
      disabled={disabled}
      variant="unstyled"
      border="0"
      borderBottom="1px solid #666666"
      borderRadius={0}
      px="0"
      py="1"
      style={{ height: '32px', color: color }}
      bg="transparent"
      fontSize="sm"
      placeholder="$5,500"
      type="number"
    />
  );
};

export default function CompensationForm() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  const { data: contractor, refetch } = trpc.team.getSingleContractor.useQuery(id as string, {
    refetchOnMount: true,
  });

  // mutation hook from TRPC for updating an contractor's data on the server.
  const { mutate: updateContractor, isLoading } = trpc.team.updatePersonnel.useMutation({
    onSuccess() {
      refetch();
      styledToast({
        status: 'success',
        description: 'Compensation has been updated successfully',
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

  const handleSubmit = async (data: FormInputOptions) => {
    try {
      updateContractor({
        id: contractor?.id ?? '', // pass the ID of the contractor that you want to update
        data: {
          firstName: contractor?.firstName ?? '',
          lastName: contractor?.lastName ?? '',
          email: contractor?.email,
          department: contractor?.department,
          jobRole: contractor?.jobRole,
          salary: data.grossSalary ? String(data.grossSalary) : '', // convert number to string,
          signBonus: data.signinBonus ? String(data.signinBonus) : '',
          status: contractor?.status as boolean | undefined,
          category: contractor?.teamCategory,
          payrollMethod: contractor?.payrollMethod,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const { renderForm, setFormValue } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: updateContractorValidationSchema,
  });

  // hook that's called when the component mounts or when the contractor or setFormValue variables change. It sets the initial form values based on the retrieved contractor data
  useEffect(() => {
    if (contractor) {
      setFormValue('signinBonus', parseFloat(contractor.signBonus ?? ''));
      setFormValue('grossSalary', parseFloat(contractor.salary ?? ''));
    }
  }, [contractor, setFormValue]);

  return (
    <Flex
      flexDirection="column"
      borderRadius="15px"
      border="1px solid"
      borderColor="bordergrey"
      p="4"
      bg="white"
      flex="1"
      marginInlineStart="0">
      <Text fontWeight="bold" fontSize="18px" mb="4">
        Compensation Details
      </Text>
      {renderForm(
        <Stack fontSize="sm" textTransform="capitalize" spacing="4">
          <Stack spacing={0} marginTop="0">
            <Text fontWeight="semibold">Gross Payment</Text>
            <EditedFormInput name="grossSalary" rightElementText="USD" color="#0AAF60" />
          </Stack>
          <Stack spacing={0}>
            <Text fontWeight="semibold">Bonus</Text>
            <EditedFormInput name="signinBonus" rightElementText="USD" color="#0AAF60" />
          </Stack>
          <Stack spacing={0}>
            <Text fontWeight="semibold">Commission</Text>
            <EditedFormInput name="commission" rightElementText="USD" color="#0AAF60" disabled />
          </Stack>
          <Stack spacing={0}>
            <Text fontWeight="semibold">Deduction</Text>
            <EditedFormInput name="deduction" rightElementText="USD" color="#E71D36" disabled />
          </Stack>

          <Stack pt="6">
            <Button variant="darkBtn" isLoading={isLoading} w="100%" mt="10" py="15px" type="submit">
              Update Compensation
            </Button>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
}
