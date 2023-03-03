import React from "react";
import { Meta } from "../layouts";
import View from "../views/Verify";
import z from "zod";
import { useForm } from "../components/forms";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";


const verifyEmailSchema = z.object({
  email: z.string(),
});

type FormInputOptions = z.infer<typeof verifyEmailSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: verifyEmailSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
