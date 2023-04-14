import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from 'utils/trpc';
import z from 'zod';
import { useForm } from '@wyrecc/components/forms';
import { Meta } from '../layouts';
import View from '../views/ForgotPassword';

const forgotPasswordValidationSchema = z.object({
  email: z.string().email(),
});

type FormInputOptions = z.infer<typeof forgotPasswordValidationSchema>;

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const { mutate: ForgotPassword, isLoading } = trpc.auth.sendForgetPassword.useMutation({
    onSuccess: (data) => {
      if (data) {
        toast({
          status: 'success',
          description: `Successful! Please check your email, ${data?.To} to reset your password.`,
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        router.push({
          pathname: `/reset`,
          query: { data: data?.To },
        });
      }
    },
    onError(error: unknown) {
      toast({
        status: 'error',
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
    },
  });

  const Submit = (data: FormInputOptions) => {
    ForgotPassword({
      email: data.email,
    });
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: Submit,
    schema: forgotPasswordValidationSchema,
  });

  return renderForm(
    <>
      <Meta />
      <View isSubmitting={isLoading} />
    </>
  );
}
