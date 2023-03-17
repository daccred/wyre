import type { FormControlProps } from "@chakra-ui/form-control";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import type { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
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
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number" | "tel" | "date" | "file";
  outerProps?: PropsWithoutRef<FormControlProps>;
  labelProps?: ComponentPropsWithoutRef<"label">;
  leftElement?: boolean;
  rightElement?: boolean;
  icon?: ComponentWithAs<"svg", IconProps>;
  leftElementBank?: boolean;
  leftElementBankElement?: JSX.Element;
  rightElementText?: string;
  rightElementTextStyle?: React.CSSProperties;
  children?: React.ReactNode;
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
      rightElementTextStyle,
      rightElementText,
    },
    ref
  ) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();
    // const error = Array.isArray(errors[name]) ? errors[name]?.types?.join(', ') : errors[name]?.message || errors[name];
    const error = Array.isArray(errors) ? errors[name]?.message : errors[name]?.message?.toString();
    const isErrorInField = errors[name] ? true : false;

    return (
      <FormControl ref={ref} {...outerProps} isInvalid={isErrorInField}>
        {label && (
          <FormLabel fontSize="sm" {...labelProps} color="#666666">
            {label}
          </FormLabel>
        )}
        <InputGroup
          style={{
            borderColor: "#9f9f9f",
          }}>
          {leftElement && (
            <InputLeftElement>
              <Center style={{ borderRadius: "50%" }} bg="#161616" h="12" w="12">
                <Icon as={icon} color="primary.500" />
              </Center>
            </InputLeftElement>
          )}
          {leftElementBank && (
            <InputLeftElement>
              <Center style={{ borderRadius: "50%" }} bg="#161616" h="12" w="12">
                {leftElementBankElement}
              </Center>
            </InputLeftElement>
          )}
          <Input
            size="lg"
            fontSize="sm"
            h="45px"
            p="7"
            border="1px solid #D2D2D2"
            rounded="5px"
            bg="#F7F7F7"
            color="#210D35"
            fontWeight="medium"
            _placeholder={{ fontSize: "sm", color: "#D2D2D2" }}
            _hover={{ borderColor: "primary" }}
            _focus={{ borderColor: "primary" }}
            isDisabled={isSubmitting}
            {...register(name, {
              valueAsNumber: type === "number",
            })}
            type={type}
          />
          {rightElement && (
            <InputRightElement>
              <Icon as={icon} color="primary.500" />
            </InputRightElement>
          )}
          {rightElementText && (
            <InputRightElement style={rightElementTextStyle}>{rightElementText}</InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage fontSize="sm" role="alert" color="red.500">
          {error?.toString()}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
