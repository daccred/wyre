import React from "react";
import { Meta } from "../layouts";
import View from "../views/Login";
import z from "zod";
import { useForm } from "../components/forms";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormInputOptions = z.infer<typeof loginValidationSchema>;

export default function Page() {
  const toast = useToast();
  const router = useRouter();
  const handleSubmit = React.useCallback(
    async (data: FormInputOptions) => {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/demo",
        redirect: false,
      });

      if (response?.status != 200) {
        toast({
          description: response?.error,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      } else {
        router.push("/demo");
      }
      // alert(JSON.stringify(data));
    },
    [toast, router]
  );

  const { renderForm, formState } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: { email: "", password: "" },

    schema: loginValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View isSubmitting={formState.isSubmitting} />
    </>
  );
}
