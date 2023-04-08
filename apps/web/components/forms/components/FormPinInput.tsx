import type { FormControlProps } from '@chakra-ui/form-control';
import { FormControl } from '@chakra-ui/form-control';
import { PinInput } from '@chakra-ui/react';
import { FormErrorMessage } from '@chakra-ui/react';
import * as React from 'react';
import type { PropsWithoutRef } from 'react';
import { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

export interface FormPinInputProps extends FormControlProps {
  name: string;
  otp?: boolean;
  placeholder?: string;
  outerProps?: PropsWithoutRef<FormControlProps>;
  size?: string;
  onChange?: () => void;
  mask?: boolean;
  manageFocus?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  errorBorderColor?: string;
  children?: React.ReactNode;
  spacing: number;
}

export const FormPinInput = forwardRef<HTMLInputElement, FormPinInputProps>(
  (
    {
      spacing,
      size,
      name,
      otp,
      placeholder,
      onChange,
      mask,
      manageFocus,
      isInvalid,
      isDisabled,
      errorBorderColor,
      outerProps,
      children,
    },
    ref
  ) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const error = errors[name]?.message;

    return (
      <FormControl ref={ref} {...outerProps} isInvalid={Boolean(error)}>
        <Controller
          control={control}
          name={name}
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <PinInput
              otp={otp}
              placeholder={placeholder}
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              errorBorderColor={errorBorderColor}
              mask={mask}
              manageFocus={manageFocus}
              isDisabled={isDisabled}
              size={size}>
              {children}
            </PinInput>
          )}
        />
        <FormErrorMessage fontSize="sm" role="alert" color="red.500">
          {error?.toString()}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

FormPinInput.displayName = 'FormPinInput';

export default FormPinInput;
