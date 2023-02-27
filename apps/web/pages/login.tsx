import React from "react";
import { Meta } from "../layouts";
import View from "../views/Login";
import z from "zod";
import { useForm } from "../components/forms";

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormInputOptions = z.infer<typeof loginValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: loginValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
