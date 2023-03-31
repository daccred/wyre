import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "utils/trpc";

import styledToast from "../../../components/core/StyledToast";
import { ProfileIcon } from "./ProviderIcons";

const Terminate = () => {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const { data: employee, refetch } = trpc.team.getSingleEmployee.useQuery(id as string, {
    refetchOnMount: true,
  });
  const { firstName, email, department, jobRole, teamCategory, signBonus, salary } = employee ?? {};

  const { mutate: terminateEmployee, isLoading: isTerminating } = trpc.team.updateEmployee.useMutation({
    onSuccess() {
      refetch();
      styledToast({
        status: "success",
        description: `Employee has been ${employee?.status ? "terminated" : "activated"} successfully}`,
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

  const handleTerminate = async () => {
    try {
      if (teamCategory === undefined) {
        throw new Error("teamCategory is undefined");
      }
      terminateEmployee({
        id: employee?.id ?? "",
        data: {
          name: firstName ?? "",
          email: email ?? "",
          department: department ?? "",
          jobRole: jobRole ?? "",
          salary: salary ?? "",
          signBonus: signBonus ?? "",
          status: !employee?.status, // toggle the status of the employee
          category: teamCategory,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const buttonText = employee?.status ? "Terminate Employee" : "Activate Employee";

  return (
    <>
      <Button
        onClick={handleTerminate}
        isLoading={isTerminating}
        loadingText={employee?.status ? "Activating" : "Terminating"}
        variant="greyBtn"
        rightIcon={<ProfileIcon fill="#210D35" stroke="#210D35" />}
        iconSpacing="3"
        w="fit-content"
        _hover={{ bg: "" }}>
        {buttonText}
      </Button>
    </>
  );
};

export default Terminate;