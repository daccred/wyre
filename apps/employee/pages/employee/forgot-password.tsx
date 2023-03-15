import React from "react";
import { Meta } from "../../layouts";
import View from "../../views/employee/ForgotPassword";
import z from "zod";
import { useForm } from "components/forms";

const forgotValidationSchema = z.object({
  email: z.string(),
});

type FormInputOptions = z.infer<typeof forgotValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: { email: "" },
    schema: forgotValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
