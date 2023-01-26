import * as React from "react";
import type { PropsWithoutRef, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import type { FormControlProps } from "@chakra-ui/form-control";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import type { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { FormErrorMessage, Icon, InputLeftElement } from "@chakra-ui/react";

export interface LabeledTextFieldProps
  extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string;
  /** Field label. */
  label?: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number" | "tel" | "date" | "file";
  outerProps?: PropsWithoutRef<FormControlProps>;
  labelProps?: ComponentPropsWithoutRef<"label">;
  leftElement?: boolean;
  rightElement?: boolean;
  icon?: ComponentWithAs<"svg", IconProps>;
  leftElementBank?: boolean;
  leftElementBankElement?: JSX.Element;
  props?: ComponentPropsWithoutRef<typeof Input>;
}

export const FormInput = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  (
    {
      label,
      outerProps,
      type,
      icon,
      labelProps,
      name,
      leftElement,
      rightElement,
      leftElementBank,
      leftElementBankElement,
      ...props
    },
    ref
  ) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();
    // const error = Array.isArray(errors[name]) ? errors[name]?.types?.join(', ') : errors[name]?.message || errors[name];
    const error = Array.isArray(errors)
      ? errors[name]?.message || Object.entries(errors[name]?.types || {})
      : errors[name]?.message?.toString();
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
              <Center
                style={{ borderRadius: "50%" }}
                bg={"#161616"}
                h="12"
                w="12"
              >
                <Icon as={icon} color="primary.500" />
              </Center>
            </InputLeftElement>
          )}
          {leftElementBank && (
            <InputLeftElement>
              <Center
                style={{ borderRadius: "50%" }}
                bg={"#161616"}
                h="12"
                w="12"
              >
                {leftElementBankElement}
              </Center>
            </InputLeftElement>
          )}
          <Input
            size={"lg"}
            fontSize="16px"
            rounded={"3xl"}
            _placeholder={{ fontSize: "sm" }}
            _hover={{ borderColor: "primary" }}
            _focus={{ borderColor: "primary" }}
            isDisabled={isSubmitting}
            {...register(name, {
              valueAsNumber: type === "number",
            })}
            style={{ borderRadius: "100px" }}
            type={type}
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

FormInput.displayName = "FormInput";

export default FormInput;
