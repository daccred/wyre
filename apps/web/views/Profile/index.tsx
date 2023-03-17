import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";
import z from "zod";

import styledToast from "../../components/core/StyledToast";
import ViewLayout from "../../components/core/ViewLayout";
import { FormInput, useForm } from "../../components/forms";
import { ProfileIcon } from "./ProviderIcons";

const addEmployeeValidationSchema = z.object({});

type FormInputOptions = z.infer<typeof addEmployeeValidationSchema>;

const Profile = () => {
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
    <ViewLayout title="Profile">
      <Stack spacing="6" p="4" mt="-0.5rem">
        <Stack spacing={1}>
          <Text fontWeight="bold" fontSize="18px">
            Personal Info
          </Text>
          <Text color="lightgrey" fontSize="sm">
            Update your photo and details here.
          </Text>
        </Stack>

        <Stack spacing={6}>
          <HStack spacing={6}>
            <Avatar
              size="2xl"
              src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            />
            <Stack
              color="lightgrey"
              borderRadius="15px"
              border="1px solid"
              borderColor="#9F9F9F"
              px="12"
              py="4"
              bg="white"
              alignItems="center"
              textAlign="center"
              fontSize="sm">
              <IconButton
                position="relative"
                boxSize="14"
                fontSize="24px"
                variant="ghost"
                aria-label="open menu"
                rounded="full"
                icon={<FiUploadCloud />}
                bg="#F7F7F7"
                color="#9F9F9F"
              />

              <Box>
                <Text style={{ color: "#8D1CFF" }} display="inline-block" fontWeight="bold">
                  Click to upload{" "}
                </Text>{" "}
                or drag and drop
                <Text>SVG, PNG, JPG or GIF (max. 800x400px)</Text>
              </Box>
            </Stack>
          </HStack>

          <Stack
            divider={<StackDivider bg="rgba(159, 159, 159, 0.3)" mt="6 !important" mb="4 !important" />}
            borderTop="1px solid rgba(159, 159, 159, 0.3)"
            borderBottom="1px solid rgba(159, 159, 159, 0.3)"
            pb="6"
            pt="4"
            width="70%"
            minW="700px">
            <HStack>
              <FormInput name="firstName" label="First Name" placeholder="First Name" />
              <FormInput name="lastName" label="Last Name" placeholder="Last Name" />
            </HStack>
            <HStack>
              <FormInput name="email" label="Email Address" placeholder="Email Address" />
              <FormInput name="phoneNumber" label="Phone Number" placeholder="Phone Number" />
            </HStack>
            <HStack>
              <FormInput name="city" label="Company Name" placeholder="Company Name" />
              <FormInput name="country" label="Country" placeholder="Country" />
            </HStack>
            <FormInput name="jobRole" label="Job Role" placeholder="Job Role" />
          </Stack>
        </Stack>

        <HStack spacing="4" pt="4">
          <Button
            variant="darkBtn"
            rightIcon={<ProfileIcon fill="#fff" stroke="#fff" />}
            iconSpacing="3"
            w="fit-content"
            type="submit">
            Update Profile
          </Button>
          <Button
            variant="greyBtn"
            rightIcon={<ProfileIcon fill="#210D35" stroke="#210D35" />}
            iconSpacing="3"
            w="fit-content"
            type="submit">
            Reset Password
          </Button>
        </HStack>
      </Stack>
    </ViewLayout>
  );
};

export default Profile;
