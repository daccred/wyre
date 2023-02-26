import React from "react";
import { Meta } from "../layouts";
import View from "../views/Register";
import z from "zod";
import { useForm } from "../components/forms";

const signUpValidationSchema = z.object({
  email: z.string(),
});

type FormInputOptions = z.infer<typeof signUpValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: { email: "" },
    schema: signUpValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
