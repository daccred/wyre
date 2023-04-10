import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { trpc } from 'utils/trpc';
import z from 'zod';

import { useForm } from '../components/forms';
import { Meta } from '../layouts';
import View from '../views/Reset';

const ValidationSchema = z
  .object({
    otp: z.string(),
    email: z.string().email(),
    newPassword: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be more than 6 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormInputOptions = z.infer<typeof ValidationSchema>;

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const [pinInputData, setPinInputData] = React.useState('');

  const { mutate: ResetPassword, isLoading } = trpc.auth.resetPassword.useMutation({
    onSuccess: (data) => {
      if (data) {
        toast({
          status: 'success',
          description: `Your Password has been reset successfully`,
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        router.push({
          pathname: `/login`,
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
    ResetPassword({
      email: router.query.data as string,
      otp: pinInputData.toString(),
      newPassword: data.newPassword,
    });
  };

  const { renderForm, setFormValue } = useForm<FormInputOptions>({
    onSubmit: Submit,
    defaultValues: { email: router.query.data as string, otp: pinInputData, newPassword: '' },
    schema: ValidationSchema,
  });

  useEffect(() => {
    setFormValue('otp', pinInputData.toString());
    setFormValue('email', router.query.data as string);
  }, [pinInputData, router.query.data, setFormValue]);

  return renderForm(
    <>
      <Meta />
      <View isSubmitting={isLoading} pinInputData={pinInputData} setPinInputData={setPinInputData} />
    </>
  );
}
