import React from 'react';
import z from 'zod';
import { useForm } from '@wyrecc/components/forms';
import { Meta } from '../../layouts';
import View from '../../views/employee/Reset';

const resetValidationSchema = z.object({
  email: z.string(),
});

type FormInputOptions = z.infer<typeof resetValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: { email: '' },
    schema: resetValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
