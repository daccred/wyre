import { FormControl, FormLabel } from "@chakra-ui/form-control";
import type { Input } from "@chakra-ui/input";
import { Flex, FormErrorMessage, Textarea } from "@chakra-ui/react";
import type { PropsWithoutRef, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string;
  /** Field label. */
  label?: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
}

export const FormTextarea = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();

    const error = Array.isArray(errors) ? errors[name]?.message : errors[name]?.message?.toString();
    const isErrorInField = errors[name] ? true : false;

    return (
      <FormControl ref={ref} {...outerProps} isInvalid={isErrorInField}>
        <Flex align="center" justify="space-between">
          {label && (
            <FormLabel color="default" fontSize="sm" {...labelProps}>
              {label}
            </FormLabel>
          )}
        </Flex>
        <Textarea
          w="full"
          rounded="lg"
          _placeholder={{ fontSize: "md" }}
          _hover={{ borderColor: "primary" }}
          _focus={{ borderColor: "primary" }}
          disabled={isSubmitting}
          {...register(name)}
          {...props}
        />
        {error && (
          <FormErrorMessage fontSize="sm" role="alert" color="red.500">
            {error.toString()}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
