import React, { useState } from "react";
import { Meta } from "../layouts";
import View from "../views/Register";
import z from "zod";
import { useToast } from "@chakra-ui/react"
import { useForm } from "../components/forms";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";


const signUpValidationSchema = z.object({
  company: z.string().min(1,  "Company name is required"),
  companyPhone: z.number().min(11, ""),
  country: z.string(),
  name: z.string().min(1, "Full name is required"),
  email: z.string().email(),
  role: z.string().min(1,  "Job role is required"),
  password: z.string().min(1, "Password is required")
  .min(6, "Password must be more than 6 characters")
  .max(32, "Password must be less than 32 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormInputOptions = z.infer<typeof signUpValidationSchema>;

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const [isFormReset, setIsFormReset] = useState(false);
  const { mutate: signUp, isLoading } = trpc.auth.adminSignUp.useMutation({
    onSuccess: (data:any, variables:any, context:any) => {
      const { updatedAdmin } = data!;
      const { email, id  } = updatedAdmin;
      toast({
        status: "success",
        description: `Registration successful. Please check your email ${email} to verify your account.`,
        isClosable: true,
        duration: 5000,
        position: 'top-right'
      });
      setIsFormReset(true); // set the form reset status to true
      router.push({
        pathname: `/verify`,
        query: { id, email },
      });
      
    },
    onError(error: any) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: 'top-right'
      });
      console.log(error)
    },
  })

  const Submit = (data: FormInputOptions) => {
    signUp({
      email: data.email,
      password: data.password,
      name: data.name,
      companyName: data.company,
      country: data.country,
      jobRole: data.role,
      companyPhone: String((data as unknown as { companyPhone: unknown }).companyPhone)
    });
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: signUpValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View isSubmitting={isLoading}/>
    </>
  );
}