import { Button, Stack, Text, Flex, useToast, Input, HStack, Circle } from "@chakra-ui/react";
import { useState } from "react";
import z from "zod";

import styledToast from "../../components/core/StyledToast";
import { FormInput, useForm } from "../../components/forms";
import { MonoIcon } from "./ProviderIcons";

const apiFormValidationSchema = z.object({});

type FormInputOptions = z.infer<typeof apiFormValidationSchema>;

const EditedFormInput = ({ name, type }: { name: string; type?: string }) => {
  return (
    <FormInput
      name={name}
      variant={"unstyled"}
      border={"0"}
      borderBottom="1px solid #666666"
      borderRadius={0}
      px="0"
      py="1"
      style={{ height: "28px" }}
      bg="transparent"
      fontSize={"sm"}
      type={type}
    />
  );
};

export default function APIForm() {
  const toast = useToast();

  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));
    styledToast({
      status: "success",
      description: !connected ? "API connected successfully" : "API disconnected successfully",
      toast: toast,
    });
    setConnected(!connected);
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    schema: apiFormValidationSchema,
  });

  const [connected, setConnected] = useState(false);

  return (
    <Flex
      flexDirection={"column"}
      borderRadius={"15px"}
      border={"1px solid"}
      borderColor="bordergrey"
      p="4"
      bg={"white"}
      flex="1"
      marginInlineStart="0">
      <Text fontWeight="bold" fontSize="18px" mb="1">
        API Integrations
      </Text>
      <HStack
        justifyContent={"space-between"}
        fontSize="sm"
        fontWeight={"semibold"}
        alignItems="flex-end"
        my="4">
        <Stack spacing={"0"}>
          <MonoIcon />
          <Text color={"bordergrey"}>Mono</Text>
        </Stack>
        <Stack textAlign={"right"} spacing={"0"}>
          <Text>Status</Text>
          <HStack>
            <Circle size="2" bg={connected ? "#0AAF60" : "#E71D36"} />
            <Text color={"bordergrey"}>{connected ? "Connected" : "Disconnected"}</Text>
          </HStack>
        </Stack>
      </HStack>
      {renderForm(
        <Stack fontSize="sm" textTransform={"capitalize"} spacing={"4"}>
          <Stack spacing={0} marginTop="0">
            <Text fontWeight={"semibold"}>URL</Text>
            <EditedFormInput name="url" />
          </Stack>
          <Stack spacing={0} marginTop="0">
            <Text fontWeight={"semibold"}>Public Key</Text>
            <EditedFormInput name="publicKey" />
          </Stack>
          <Stack spacing={0} marginTop="0">
            <Text fontWeight={"semibold"}>Private Key</Text>
            <EditedFormInput name="privateKey" type="password" />
          </Stack>

          <Stack pt="6">
            <Button
              variant={"darkBtn"}
              w="100%"
              mt="10"
              py="15px"
              type="submit"
              bg={connected ? "rgba(33, 13, 53, 0.15)" : "brand.700"}
              color={connected ? "brand.700" : "white"}>
              {!connected ? "Connect" : "Disconnect"}
            </Button>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
}
