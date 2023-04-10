/* eslint-disable import/default */
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import type { Input } from '@chakra-ui/input';
import { Checkbox, FormErrorMessage } from '@chakra-ui/react';
import type { ComponentPropsWithoutRef } from 'react';
import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string;
  label?: string;
  props?: ComponentPropsWithoutRef<'input'>;
}

const FormCheckbox = forwardRef<HTMLInputElement, LabeledTextFieldProps>(({ label, name, ...props }, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = Array.isArray(errors)
    ? errors[name]?.message || Object.entries(errors[name]?.type || {})
    : errors[name]?.message?.toString();
  const isErrorInField = errors[name] ? true : false;

  return (
    <FormControl ref={ref} {...props} isInvalid={isErrorInField}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox {...field} onChange={(e) => field.onChange(e.target.checked)}>
            <FormLabel htmlFor={name} fontSize="sm">
              {label ?? 'I agree to the Terms of use and Privacy Policy'}
            </FormLabel>
          </Checkbox>
        )}
      />
      {error && (
        <FormErrorMessage fontSize="sm" role="alert" color="red.500">
          {error.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
