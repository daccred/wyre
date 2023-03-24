import React, { forwardRef } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import type { Input } from "@chakra-ui/input";

import { Flex, FormErrorMessage } from "@chakra-ui/react";
import type { PropsWithoutRef, ComponentPropsWithoutRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";

export interface OptionProps {
  readonly value: string;
  readonly label: string;
}

export interface LabeledSelectFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string;
  /** Field label. */
  label?: string;
  /** Field placeholder. */
  placeholder?: string;
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
  options: readonly OptionProps[];
  width?: string;
}

const FormSelect = forwardRef<HTMLInputElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, placeholder, width, options, ...props }, ref) => {
    const {
      formState: { isSubmitting, errors },
      control,
    } = useFormContext();
    const error = Array.isArray(errors[name])
      ? errors[name]?.message?.toString()
      : errors[name]?.message?.valueOf() || errors[name];

    return (
      <FormControl ref={ref} {...outerProps}>
        <Flex align="center" justify="space-between">
          <FormLabel color="#666666" fontSize="sm" {...labelProps}>
            {label}
          </FormLabel>
        </Flex>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              placeholder={placeholder}
              {...field}
              options={options}
              isDisabled={isSubmitting}
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={{
                menuList(provided) {
                  return {
                    ...provided,
                    backgroundColor: "",
                    color: "black",
                  };
                },
                valueContainer(provided) {
                  return {
                    ...provided,
                    color: "orange",
                    backgroundColor: "none",
                    width: width || "200px",
                    fontSize: "14px",
                  };
                },
                control(provided) {
                  return {
                    ...provided,
                    minHeight: "45px",
                    padding: "10px",
                    border: "1px solid #D2D2D2",
                    borderRadius: "5px",
                    backgroundColor: "#F7F7F7",
                    "&:hover": {
                      borderColor: "gray",
                    },
                  };
                },
              }}
              {...props}
            />
          )}
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

FormSelect.displayName = "FormSelect";

export default FormSelect;
