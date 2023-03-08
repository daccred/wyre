import React, { useEffect } from "react";
import { Meta } from "../layouts";
import View from "../views/Verify";
import z from "zod";
import { useForm } from "../components/forms";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

const verifyEmailSchema = z.object({});

type FormInputOptions = z.infer<typeof verifyEmailSchema>;

export default function Page() {
  const router = useRouter();
  const { code, email, userType } = router.query;

  const { mutate: verifyEmail } = trpc.auth.verifyAdminEmail.useMutation({
    onSuccess() {
      router.push("/login");
    },
    onError(error: any) {
      console.log(error);
    },
  });

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
