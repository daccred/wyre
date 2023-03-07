import {
  Avatar,
  Button,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import styledToast from "../../../components/core/StyledToast";
import z from "zod";
import {
  FormInput,
  FormNativeSelect,
  useForm,
} from "../../../components/forms";
import { ProfileIcon } from "./ProviderIcons";

const addEmployeeValidationSchema = z.object({});

type FormInputOptions = z.infer<typeof addEmployeeValidationSchema>;

export default function EmployeeForm() {
  const toast = useToast();

  const handleSubmit = async (data: FormInputOptions) => {
    console.log(JSON.stringify(data));
    styledToast({
      status: "success",
      description: "Profile has been updated successfully",
      toast: toast,
    });
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    schema: addEmployeeValidationSchema,
  });

  return renderForm(
    <Stack spacing={"6"} pb="4" mt="-0.5rem">
      <Text fontWeight="bold" fontSize="18px">
        Personal Details
      </Text>

      <Stack spacing={3}>
        <Avatar
          size={"xl"}
          src={
            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          }
        />
        <HStack>
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
        </HStack>
        <HStack>
          <FormInput
            name="email"
            label="Email Address"
            placeholder="Email Address"
          />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
          />
        </HStack>
        <HStack>
          <FormInput name="city" label="City" placeholder="City" />
          <FormInput name="country" label="Country" placeholder="Country" />
        </HStack>
      </Stack>
      <Stack spacing={3}>
        <Text fontWeight="bold" fontSize="18px">
          Contract Details
        </Text>
        <HStack>
          <FormNativeSelect
            name="category"
            label="Category"
            placeholder="Select Category"
            options={[
              { label: "Tech", value: "tech" },
              { label: "Time", value: "time" },
            ]}
          />
          <FormInput
            name="payrollMethod"
            label="Payroll Method"
            placeholder="Payroll Method"
          />
        </HStack>
        <HStack>
          <FormNativeSelect
            name="department"
            label="Department"
            placeholder="Select Department"
            options={[
              { label: "Tech", value: "tech" },
              { label: "Time", value: "time" },
            ]}
          />
          <FormNativeSelect
            name="jobRole"
            label="Job Role"
            placeholder="Job Role"
            options={[
              { label: "Tech", value: "tech" },
              { label: "Time", value: "time" },
            ]}
          />
        </HStack>
      </Stack>

      <HStack spacing={"4"} pt="4">
        <Button
          variant={"darkBtn"}
          rightIcon={<ProfileIcon fill={"#fff"} stroke={"#fff"} />}
          iconSpacing="3"
          w="fit-content"
          type="submit"
        >
          Update Profile
        </Button>
        <Button
          variant={"greyBtn"}
          rightIcon={<ProfileIcon fill={"#210D35"} stroke={"#210D35"} />}
          iconSpacing="3"
          w="fit-content"
          type="submit"
        >
          Terminate Employee
        </Button>
      </HStack>
    </Stack>
  );
}
