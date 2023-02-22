import React from "react";
import { Meta } from "../layouts";
import View from "../views/Verify";
import z from "zod";
import { useForm } from "../components/forms";

const loginValidationSchema = z.object({
  email: z.string(),
});

type FormInputOptions = z.infer<typeof loginValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: { email: "" },
    schema: loginValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
