import type { FormControlProps } from "@chakra-ui/form-control";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import type { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { FormErrorMessage, Icon, InputLeftElement } from "@chakra-ui/react";
import * as React from "react";
import type { PropsWithoutRef, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string;
  /** Field label. */
  label?: string;
  outerProps?: PropsWithoutRef<FormControlProps>;
  labelProps?: ComponentPropsWithoutRef<"label">;
  leftElement?: boolean;
  rightElement?: boolean;
  icon?: ComponentWithAs<"svg", IconProps>;
  props?: ComponentPropsWithoutRef<typeof Input>;
}

export const FormDateInput = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, icon, labelProps, name, leftElement, rightElement, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();
    const error = Array.isArray(errors) ? errors[name]?.message : errors[name]?.message?.toString();
    const isErrorInField = errors[name] ? true : false;

    return (
      <FormControl ref={ref} {...outerProps} isInvalid={isErrorInField}>
        {label && (
          <FormLabel color={"default"} fontSize="sm" {...labelProps}>
            {label}
          </FormLabel>
        )}
        <InputGroup>
          {leftElement && (
            <InputLeftElement>
              <Icon as={icon} color="primary.500" />
            </InputLeftElement>
          )}
          <Input
            size={"lg"}
            fontSize="md"
            bg={"#F7F7F7"}
            rounded="md"
            color={"#210D35"}
            _placeholder={{ fontSize: "sm" }}
            _hover={{ borderColor: "primary" }}
            _focus={{ borderColor: "primary" }}
            isDisabled={isSubmitting}
            type={"datetime-local"}
            {...register(name, {
              valueAsDate: true,
            })}
            {...props}
          />
          {rightElement && (
            <InputRightElement>
              <Icon as={icon} color="primary.500" />
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage fontSize="xs" role="alert" color="red.500">
          {error?.toString()}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

FormDateInput.displayName = "FormDateInput";

export default FormDateInput;
