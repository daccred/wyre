import { Avatar, Button, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import z from "zod";

import styledToast from "../../../components/core/StyledToast";
import { FormInput, FormNativeSelect, useForm } from "../../../components/forms";
import { trpc } from "../../../utils/trpc";
import { ProfileIcon } from "./ProviderIcons";
import Terminate from "./terminateEmployee";

const addEmployeeValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  department: z.string(),
  jobRole: z.string(),
  category: z.string(),
});

type FormInputOptions = z.infer<typeof addEmployeeValidationSchema>;

export default function EmployeeForm() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  const { data: employee, refetch } = trpc.team.getSingleEmployee.useQuery(id as string, {
    refetchOnMount: true,
  });

  console.log(employee);
  const { firstName, lastName, email, department, jobRole, teamCategory } = employee ?? {};

  const { mutate: updateEmployee, isLoading } = trpc.team.updateEmployee.useMutation({
    onSuccess() {
      refetch();
      styledToast({
        status: "success",
        description: "Profile has been updated successfully",
        toast: toast,
      });
    },
    onError(error: unknown) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
      console.log(error);
    },
  });

  const handleSubmit = async (data: FormInputOptions) => {
    try {
      updateEmployee({
        id: employee?.id ?? "", // pass the ID of the employee that you want to update
        data: {
          name: data.name,
          email: data.email,
          department: data.department,
          jobRole: data.jobRole,
          salary: employee?.salary ?? "",
          signBonus: employee?.signBonus ?? "",
          status: true,
          category: data.category as "CONTRACTOR" | "EMPLOYEE", // cast the category to the correct type
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    defaultValues: {
      // firstName: firstName,
      email: email,
      department: department,
      jobRole: jobRole,
      category: teamCategory,
    },
    schema: addEmployeeValidationSchema,
  });

  return renderForm(
    <Stack spacing="6" pb="4" mt="-0.5rem">
      <Text fontWeight="bold" fontSize="18px">
        Personal Details
      </Text>

      <Stack spacing={3}>
        <Avatar size="xl" src="" name={firstName || ""} />
        <HStack>
          <FormInput name="name" label="First Name" placeholder="First Name" defaultValue={firstName} />
          <FormInput name="lastName" label="Last Name" placeholder="Last Name" defaultValue={lastName} />
        </HStack>
        <HStack>
          <FormInput name="email" label="Email Address" placeholder="Email Address" defaultValue={email} />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            defaultValue={employee?.phone}
          />
        </HStack>
        <HStack>
          <FormInput name="city" label="City" placeholder="City" />
          <FormInput name="country" label="Country" placeholder="Country" defaultValue={employee?.country} />
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
              { label: "Contractor", value: "CONTRACTOR" },
              { label: "Employee", value: "EMPLOYEE" },
            ]}
            defaultValue={employee?.teamCategory}
          />
          <FormInput name="payrollMethod" label="Payroll Method" placeholder="Payroll Method" />
        </HStack>
        <HStack>
          <FormInput
            name="department"
            label="Department"
            placeholder="Enter Department"
            defaultValue={department}
          />
          <FormInput name="jobRole" label="Job Role" placeholder="Job Role" defaultValue={jobRole} />
        </HStack>
      </Stack>

      <HStack spacing="4">
        <Button
          variant="darkBtn"
          rightIcon={<ProfileIcon fill="#fff" stroke="#fff" />}
          iconSpacing="3"
          w="fit-content"
          type="submit"
          isLoading={isLoading}
          _hover={{ bg: "" }}
          loadingText="Updating">
          Update Profile
        </Button>
        <Terminate />
      </HStack>
    </Stack>
  );
}
