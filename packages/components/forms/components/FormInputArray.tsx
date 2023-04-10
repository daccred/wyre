import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import type { ComponentWithAs, IconProps } from '@chakra-ui/react';
import {
  FormErrorMessage,
  Icon,
  Button,
  InputLeftElement,
  Stack, // InputProps,
} from '@chakra-ui/react';
import type { PropsWithoutRef, ComponentPropsWithoutRef } from 'react';
import React, { forwardRef } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';

export interface InputFieldArrayProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string;

  /** Add more text. */
  addMoreText?: string;

  /** array limit numer  */
  limit?: number;

  /** Field label. */
  label?: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'file';
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  leftElement?: boolean;
  icon?: ComponentWithAs<'svg', IconProps>;
  props?: ComponentPropsWithoutRef<typeof Input>;
}

/**
 * @see https://react-hook-form.com/api/useformcontext
 * @name FormInputArray
 * @description a form input that can create array fields with react hook form
 */
export const FormInputArray = forwardRef<HTMLInputElement, InputFieldArrayProps>(
  ({ label, outerProps, icon, limit, labelProps, addMoreText, name, leftElement, ...props }, ref) => {
    const {
      register,
      control,
      formState: { isSubmitting, errors },
    } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name: name,
    });

    const _handleArrayAppend = () => limit && fields.length < limit && append(' ');
    const error = Array.isArray(errors) ? errors[name]?.message : errors[name]?.message?.toString();
    const isErrorInField = errors[name] ? true : false;

    return (
      <FormControl ref={ref} {...outerProps} isInvalid={isErrorInField}>
        {label && (
          <FormLabel color="default" fontSize="sm" {...labelProps}>
            {label}
          </FormLabel>
        )}
        <Stack>
          {fields.map((field, index) => (
            <fieldset key={field.id}>
              <InputGroup>
                {leftElement && (
                  <InputLeftElement>
                    <Icon as={icon} color="primary.500" />
                  </InputLeftElement>
                )}
                <Input
                  size="lg"
                  fontSize="md"
                  _placeholder={{ fontSize: 'sm' }}
                  _hover={{ borderColor: 'primary' }}
                  _focus={{ borderColor: 'primary' }}
                  isDisabled={isSubmitting}
                  {...register(`${name}.${index}`)}
                  {...props}
                />

                <InputRightElement>
                  <Icon
                    p={1}
                    fontSize="lg"
                    border="1px"
                    rounded="full"
                    cursor="pointer"
                    mt={2}
                    onClick={() => remove(index)}
                    as={CgClose}
                  />
                </InputRightElement>
              </InputGroup>
            </fieldset>
          ))}
          <Button
            size="sm"
            isDisabled={fields.length == limit}
            variant="ghost"
            colorScheme="orange"
            justifySelf="flex-end"
            justifyContent="flex-end"
            w="max-content"
            onClick={_handleArrayAppend}>
            {addMoreText ?? '+'}
          </Button>
        </Stack>
        <FormErrorMessage fontSize="sm" role="alert" color="red.500">
          {error?.toString()}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

FormInputArray.displayName = 'FormInputArray';

export default FormInputArray;
