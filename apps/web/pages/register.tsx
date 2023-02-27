import React from "react";
import { Meta } from "../layouts";
import View from "../views/Register";
import z from "zod";
import { useToast } from "@chakra-ui/react"
import { useForm } from "../components/forms";
import { trpc } from "../utils/trpc";
import styledToast from "../components/core/StyledToast";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";


const signUpValidationSchema = z.object({
  company: z.string().min(1,  "Company name is required"),
  country: z.string() ,
  name: z.string().min(1, "Full name is required") ,
  email: z.string().email(),
  role: z.string().min(1,  "Job role is required"),
  password: z.string().min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
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

  const { mutate: signUp, isLoading } = trpc.auth.adminSignUp.useMutation({
    onSuccess(data) {
      styledToast({
        status: "success",
        description: "account has been created successfully",
        toast: toast,
      });
      router.push("/dashboard");
    },
    onError(error: any) {
      styledToast({
        status: "error",
        description: `${error}`,
        toast: toast,
      });
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
    });
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: signUpValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View isLoading={isLoading}/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      requireAuth: false,
      enableAuth: false,
    },
  };
};