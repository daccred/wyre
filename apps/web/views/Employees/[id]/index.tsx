import {
  HStack,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import ViewLayout from "../../../components/core/ViewLayout";
import EmployeeForm from "./EmployeeForm";
import CompensationForm from "./CompensationForm";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

const ManageEmployee = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: employee } = trpc.employees.getSingleEmployee.useQuery("");
  console.log(employee);

  return (
    <>
      <ViewLayout title="Employees">
        <Breadcrumb
          fontSize={"xs"}
          separator={<FiChevronRight color="#d2d2d2" fontSize={"16px"} />}
          pb="2"
          fontWeight={"semibold"}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/employees" color={"lightgrey"}>
              Employee
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{id}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack gap="4" alignItems={"flex-start"}>
          <Stack
            borderRadius={"15px"}
            border={"1px solid"}
            borderColor="bordergrey"
            p="4"
            bg={"white"}
            w="70%"
          >
            <EmployeeForm />
          </Stack>
          <CompensationForm />
        </HStack>
      </ViewLayout>
    </>
  );
};

export default ManageEmployee;
