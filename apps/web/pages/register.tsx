import React from "react";
import { Meta } from "../layouts";
import View from "../views/Register";
import z from "zod";
import { useForm } from "../components/forms";

const signUpValidationSchema = z.object({
  company: z.string().min(1) ,
  country: z.string() ,
  name: z.string().min(1) ,
  email: z.string().email(),
  role: z.string().min(1) ,
  password: z.string().min(8) ,
  confirmPassword: z.string().min(8) ,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormInputOptions = z.infer<typeof signUpValidationSchema>;

export default function Page() {
  const handleSubmit = async (data: FormInputOptions) => {
    
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: signUpValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View />
    </>
  );
}
