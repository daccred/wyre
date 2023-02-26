import React from "react";
import Head from "next/head";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Stack, useColorModeValue } from "@chakra-ui/react";
import {
  FormInput,
  FormUpload,
  FormNativeSelect,
  FormSelect,
} from "../components/forms";

import { useColorMode, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import * as Layout from "../layouts";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      position="fixed"
      top={4}
      right={4}
      icon={isDark ? <FaSun /> : <FaMoon />}
      aria-label="Toggle Theme"
      colorScheme="green"
      onClick={toggleColorMode}
    />
  );
};

export default function Page() {
  const methods = useForm<any>();

  const onSubmit = (data: any) => {
    console.warn(data);
  };

  return (
    <Layout.NextPageLayout>
      <Head>
        <title>Chakra Components DEMO</title>
        <meta name="description" content="Chakra DEMO App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DarkModeSwitch />

      <Layout.Mobile>
        <FormProvider {...methods}><form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <FormUpload name="idUpload" />
          
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name ..."
              />
              <FormInput
                name="last"
                label="Last Names"
                placeholder="Enter last name ..."
              />
              <FormInput
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number ..."
              />
              <FormInput
                name="email"
                label="Email Address"
                placeholder="Enter first name ..."
              />
              <FormInput
                name="twitter"
                label="Twitter handle"
                placeholder="Enter twitter handle ..."
              />
              <FormSelect
                label="Select country"
                name="country"
                options={[
                  { value: "gh", label: "Ghana" },
                  { value: "ng", label: "Nigeria" },
                ]}
              />
              <FormNativeSelect
                label="Select country"
                name="country"
                options={[
                  { value: "gh", label: "Ghana" },
                  { value: "ng", label: "Nigeria" },
                ]}
              />
              <FormNativeSelect
                label="Select state"
                name="countryState"
                options={[
                  { value: "acc", label: "Accra" },
                  { value: "abu", label: "Abuja" },
                ]}
              />
              <FormInput
                name="address"
                label="Residential address"
                placeholder="Enter address ..."
                labelProps={{ color: useColorModeValue("black", "white") }}
              />{" "}
              <FormInput
                name="polygonWallet"
                label="Polygon wallet address"
                placeholder="Enter wallet address ..."
                labelProps={{ color: useColorModeValue("black", "white") }}
              />
              <Button rounded={"3xl"} type="submit" fontWeight="bold">
                Submit
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Layout.Mobile>
    </Layout.NextPageLayout>
  );
}
