import { Stack, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import z from 'zod';
import { FormCheckbox, FormInput, FormInputArray, FormTextArea, useForm } from '../components/forms';
import FormDateInput from '../components/forms/components/FormDateInput';
import { Meta } from '../layouts';
import * as Layout from '../layouts';

const formValidationSchema = z.object({
  question: z.string(),
  amount: z.string(),
  supply: z.string(),
  deadline: z.string(),
});

type FormInputOptions = z.infer<typeof formValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: { question: '' },
    schema: formValidationSchema,
  });

  return renderForm(
    <Layout.Mobile>
      <Meta />

      <Stack spacing={6} mt={12}>
        <FormTextArea name="question" label="Question" type="text" />
        <HStack minH="62px" align="flex-start">
          <FormInput type="number" name="amount" label="Amount ($MATIC)" />
          <FormDateInput name="deadline" label="Event deadline" />
        </HStack>
        <HStack minH="62px" align="flex-start">
          <FormDateInput name="time" label="Resolution Time" />
          <FormInput name="supply" type="string" label="Max Ticket Supply" />
        </HStack>

        <FormCheckbox label="Limit ticket supply" name="limitMaxTicketSupply" />
        <FormInputArray
          limit={4}
          addMoreText="Add more Outcomes"
          label="Event Outcomes"
          name="eventOutcomes"
        />

        <FormTextArea placeholder="DSTV website" name="resolutionSource" label="Resolution Source" />

        <FormInput name="resolutionLink" type="url" label="Resolution link" />
        <Button rounded="3xl" fontSize="lg" fontWeight="medium">
          Submit
        </Button>
      </Stack>
    </Layout.Mobile>
  );
}
