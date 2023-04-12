import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import z from 'zod';
import { useForm } from '@wyrecc/components/forms';
import { Meta } from '../../layouts';
import { trpc } from '../../utils/trpc';
import View from '../../views/employee/SignUp';

const signUpValidationSchema = z
  .object({
    lastName: z.string().min(1, 'Last name is required'),
    firstName: z.string().min(1, 'First name is required'),
    email: z.string().email(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be more than 6 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormInputOptions = z.infer<typeof signUpValidationSchema>;

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const { mutate: signUp, isLoading } = trpc.user.addUser.useMutation({
    onSuccess: (data: any, variables: any, context: any) => {
      const { updatedAdmin } = data;
      const { email, id } = updatedAdmin;
      toast({
        status: 'success',
        description: `Registration successful. Please check your email ${email} to verify your account.`,
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
      resetForm(); // set the form reset status to true
      router.push({
        pathname: `/verify`,
        query: { id, email },
      });
    },
    onError(error: any) {
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
    // signUp({});
  };

  const { renderForm, resetForm } = useForm<FormInputOptions>({
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
