import React from "react";
import z from "zod";
import { useForm } from "../components/forms";
import { Meta } from "../layouts";
import View from "../views/Reset";

const ValidationSchema = z.object({
  email: z.string(),
});

type FormInputOptions = z.infer<typeof ValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: { email: "" },
    schema: ValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
