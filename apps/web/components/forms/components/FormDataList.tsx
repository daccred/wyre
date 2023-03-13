/* eslint-disable */
import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { HiSearch } from "react-icons/hi";
import Select, { CSSObjectWithLabel } from "react-select";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  /** Field name. */
  name: string;
  /** Field label. */
  label?: string;
  /** Field options. */
  options: string[];
  /** Field isMulti. */
  isMulti?: boolean;
  leftIcon?: boolean;
  placeholder?: string;
};

const DataListSelect = ({
  name,
  label,
  options,
  isMulti,
  placeholder,
  leftIcon = true,
}: Props) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  // const error = Array.isArray(errors[name]) ? errors[name].join(', ') : errors[name]?.message || errors[name];
  const error = Array.isArray(errors[name])
    ? errors[name]?.message?.toString()
    : errors[name]?.message?.valueOf() || errors[name];

  const getOptions = (options: any[]) => {
    return options.map((option: any) => ({
      value: option,
      label: option,
    }));
  };

  const optionsList = getOptions(options);

  return (
    <FormControl>
      {label && <FormLabel htmlFor="data-list-select">{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => {
          const handleSelectChange = (selectedOption: {
            map: (arg0: (option: any) => any) => any;
            value: any;
          }) => {
            isMulti
              ? onChange(
                  selectedOption.map((option: { value: any }) => option.value)
                )
              : onChange(selectedOption.value);
          };

          return (
            <>
              <FormLabel
                borderWidth={1}
                borderColor="gray.300"
                p={2}
                rounded="30px"
                color="grayLight"
                pos="relative"
                _hover={{ borderColor: "orangeDark" }}
                _focus={{ borderColor: "orangeDark" }}
              >
                <InputGroup display="flex" alignItems="center">
                  {leftIcon && (
                    <InputLeftElement pointerEvents="none">
                      <Icon as={HiSearch} color="grayLight" boxSize={6} />
                    </InputLeftElement>
                  )}
                  <Input
                    ref={ref}
                    bg="none"
                    w="full"
                    as={Select}
                    placeholder={placeholder}
                    options={getOptions(options)}
                    value={
                      isMulti
                        ? optionsList.filter((c: { value: any }) =>
                            value.includes(c.value)
                          )
                        : (optionsList.find(
                            (c: { value: any }) => c.value === value
                          ) as any)
                    }
                    onChange={handleSelectChange as any}
                    isMulti={isMulti}
                    components={{
                      IndicatorSeparator: () => null,
                      ClearIndicator: () => null,
                      // MultiValueContainer: () => null,
                    }}
                    styles={{
                      valueContainer(provided: CSSObjectWithLabel) {
                        return {
                          ...provided,
                          width: "100%",
                          fontSize: "14px",
                        };
                      },
                      control(provided: CSSObjectWithLabel) {
                        return {
                          ...provided,
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "none",
                          "&:hover": {
                            borderColor: "none",
                          },
                        };
                      },
                      menu(provided: CSSObjectWithLabel) {
                        return {
                          ...provided,
                          boxShadow: "none",
                          borderRadius: "10px",
                          marginLeft: isMulti ? "-40px" : "-15px",
                          marginTop: "15px",
                        };
                      },
                      option(provided: CSSObjectWithLabel) {
                        return {
                          ...provided,
                          backgroundColor: "none",
                          color: "#141414",
                          paddingInline: "30px",
                          "&:hover": {
                            backgroundColor: "#3E49B8",
                            color: "#fff",
                            borderRadius: "10px",
                          },
                        };
                      },
                      multiValue(provided: CSSObjectWithLabel | any) {
                        return {
                          ...provided,
                          backgroundColor: "none",
                          flexWrap: "none",
                        };
                      },
                    }}
                    borderWidth={0}
                    _hover={{ borderWidth: 0 }}
                    _focus={{ borderWidth: 0 }}
                  />
                </InputGroup>
              </FormLabel>
            </>
          );
        }}
      />
      {error && (
        <FormErrorMessage fontSize="sm" role="alert" color="red.500">
          {error.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default DataListSelect;
