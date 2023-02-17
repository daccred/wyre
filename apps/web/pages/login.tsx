import React from "react";
import { Meta } from "../layouts";
import View from "../views/Login";
import z from "zod";
import { useForm } from "../components/forms";
import { signIn } from "next-auth/react";

const loginValidationSchema = z.object({
  email: z.string().email(),
});

type FormInputOptions = z.infer<typeof loginValidationSchema>;

export default function Page() {
  const handleSubmit = React.useCallback(async (data: FormInputOptions) => {
    await signIn("credentials", {
      email: data.email,
      password: "admin",
      callbackUrl: "/demo",
    });
    // alert(JSON.stringify(data));
  }, []);
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
