import type { ComponentPropsWithoutRef, PropsWithoutRef } from "react";
import { forwardRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

interface OptionProps {
  readonly value: string;
  readonly label: string;
}

export interface FormNativeSelectProps
  extends ComponentPropsWithoutRef<typeof Select> {
  /** Field name. */
  name: string;
  /** Field label. */
  label?: string;
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
  options: OptionProps[];
}

const FormNativeSelect = forwardRef<HTMLInputElement, FormNativeSelectProps>(
  ({ name, label, options, outerProps, labelProps }, ref) => {
    const {
      formState: { errors },
      control,
    } = useFormContext();

    const error = Array.isArray(errors)
      ? errors[name]?.message
      : errors[name]?.message?.toString();
    const isErrorInField = errors[name] ? true : false;

    const flex = "flex-start";

    return (
      <FormControl
        ref={ref}
        display="flex"
        flexDirection="column"
        isInvalid={isErrorInField}
        alignItems={flex}
        justifyContent={flex}
        {...outerProps}
      >
        <FormLabel {...labelProps} color="lightgrey">
          {label}
        </FormLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              size={"lg"}
              fontSize="sm"
              bg={"#F7F7F7"}
              // rounded={"3xl"}
              minH="57px"
              borderRadius={"5px"}
              borderColor="#9f9f9f"
              _placeholder={{ fontSize: "sm" }}
              _hover={{ borderColor: "primary" }}
              _focus={{ borderColor: "primary" }}
              {...field}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value} >
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        />
        <FormErrorMessage fontSize="sm" role="alert" color="red.500">
          {error?.toString()}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

FormNativeSelect.displayName = "FormNativeSelect";

export default FormNativeSelect;
