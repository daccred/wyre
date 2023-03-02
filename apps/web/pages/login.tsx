import React from "react";
import { Meta } from "../layouts";
import View from "../views/Login";
import z from "zod";
import { useForm } from "../components/forms";
import { useToast } from "@chakra-ui/react"
import { trpc } from "../utils/trpc";
import styledToast from "../components/core/StyledToast";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";


const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string()
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters"),
});

type FormInputOptions = z.infer<typeof loginValidationSchema>;

export default function Page() {
  const router = useRouter();
  const toast = useToast();

  // const query = trpc.useQuery(undefined, {
  //   enabled: false,
  //   onSuccess: (data: any) => {
  //   },
  // });

  const { isLoading, mutate: loginUser } = trpc.auth.adminSignUp.useMutation({
    onSuccess() {
      styledToast({
        status: "success",
        description: "Logged in successfully",
        toast: toast,
      });
      // query.refetch();
      // router.push("/dashboard");
    },
    onError(error: any) {
      styledToast({
        status: "error",
        description: `${error}`,
        toast: toast,
      });
    },
  });

  const handleSubmit = (data: FormInputOptions) => {
   
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: loginValidationSchema,
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