import { useToast } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import z from "zod";

import { useForm } from "../components/forms";
import { Meta } from "../layouts";
import { trpc } from "../utils/trpc";
import View from "../views/Register";

const signUpValidationSchema = z
  .object({
    company: z.string().min(1, "Company name is required"),
    companyPhone: z.string().min(1, "Phone number is required"),
    country: z.string(),
    name: z.string().min(1, "Full name is required"),
    email: z.string().email(),
    role: z.string().min(1, "Job role is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormInputOptions = z.infer<typeof signUpValidationSchema>;

export default function Page() {
  const router = useRouter();
  const toast = useToast();

  type User = {
    id: string;
    email: string;
    // verifyId: string | null;
    // other properties
  };

  const { mutate: signUp, isLoading } = trpc.auth.adminSignUp.useMutation({
    onSuccess: (data) => {
      if (data) {
        const { admin } = data;
        const { email, id } = admin;
        toast({
          status: "success",
          description: `Registration successful. Please check your email ${email} to verify your account.`,
          isClosable: true,
          duration: 5000,
          position: "top-right",
        });
        router.push({
          pathname: `/verify`,
          query: { id, email },
        });
      }
    },
    onError(error: any) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
      console.log(error);
    },
  });

  const Submit = (data: FormInputOptions) => {
    signUp({
      email: data.email,
      password: data.password,
      name: data.name,
      companyName: data.company,
      companyPhone: data.companyPhone,
      country: data.country,
      jobRole: data.role,
    });
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: signUpValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View isSubmitting={isLoading} />
    </>
  );
}
