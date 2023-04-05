import { Button, Stack, Text, Flex, useToast } from "@chakra-ui/react";
import z from "zod";

import styledToast from "../../../components/core/StyledToast";
import { FormInput, useForm } from "../../../components/forms";

const addContractorValidationSchema = z.object({});

type FormInputOptions = z.infer<typeof addContractorValidationSchema>;

const EditedFormInput = ({
  name,
  rightElementText,
  color,
}: {
  name: string;
  rightElementText: string;
  color: string;
}) => {
  return (
    <FormInput
      name={name}
      rightElementText={rightElementText}
      rightElementTextStyle={{
        fontSize: "12px",
        height: "32px",
        width: "fit-content",
        color: "#666666",
      }}
      variant="unstyled"
      border="0"
      borderBottom="1px solid #666666"
      borderRadius={0}
      px="0"
      py="1"
      style={{ height: "32px", color: color }}
      bg="transparent"
      fontSize="sm"
      placeholder="$5,500"
      type="number"
    />
  );
};

export default function CompensationForm() {
  const toast = useToast();

  const handleSubmit = async (data: FormInputOptions) => {
    styledToast({
      status: "success",
      description: "Compensation has been updated successfully",
      toast: toast,
    });
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: addContractorValidationSchema,
  });

  return (
    <Flex
      flexDirection="column"
      borderRadius="15px"
      border="1px solid"
      borderColor="bordergrey"
      p="4"
      bg="white"
      flex="1"
      marginInlineStart="0">
      <Text fontWeight="bold" fontSize="18px" mb="4">
        Compensation Details
      </Text>
      {renderForm(
        <Stack fontSize="sm" textTransform="capitalize" spacing="4">
          <Stack spacing={0} marginTop="0">
            <Text fontWeight="semibold">Gross Payment</Text>
            <EditedFormInput name="grossPayment" rightElementText="USD" color="#0AAF60" />
          </Stack>
          <Stack spacing={0}>
            <Text fontWeight="semibold">Bonus</Text>
            <EditedFormInput name="bonus" rightElementText="USD" color="#0AAF60" />
          </Stack>
          <Stack spacing={0}>
            <Text fontWeight="semibold">Commission</Text>
            <EditedFormInput name="commission" rightElementText="USD" color="#0AAF60" />
          </Stack>
          <Stack spacing={0}>
            <Text fontWeight="semibold">Deduction</Text>
            <EditedFormInput name="deduction" rightElementText="USD" color="#E71D36" />
          </Stack>

          <Stack pt="6">
            <Button variant="darkBtn" w="100%" mt="10" py="15px" type="submit">
              Update Compensation
            </Button>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
}
