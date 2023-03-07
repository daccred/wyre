import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
} from "@chakra-ui/react";
import ViewLayout from "../../../components/core/ViewLayout";
import CustomTable from "../../../components/CustomTable";
import { useRouter } from "next/router";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { managePayrollPath } from "../routes";
import { payrollData } from "../utils/dummyData";
import { managePayrollColumns } from "../utils/tableColumns";

const ManagePayroll = () => {
  const { pathname } = useRouter();
  const router = useRouter();

  return (
    <ViewLayout title="Payroll">
      <Breadcrumb
        fontSize={"sm"}
        separator={<FiChevronRight color="#d2d2d2" fontSize={"16px"} />}
        pb="2"
        fontWeight={"semibold"}
        color="lightgrey"
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/payroll">Payroll</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={managePayrollPath}
            color={pathname === managePayrollPath ? "black" : "lightgrey"}
            isCurrentPage={true}
          >
            Manage Payroll
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack
        rounded="md"
        p={6}
        bg="white"
        w="100%"
        mt={10}
        border="1px solid #D2D2D2"
      >
        <Heading as="h4" size="xs" fontSize="xl">
          Active Payroll
        </Heading>
        <CustomTable
          // @ts-ignore
          columns={managePayrollColumns(() =>
            router.push("/payroll/manage-payroll/monthly-employee-salary")
          )}
          data={payrollData}
        />
      </Stack>
    </ViewLayout>
  );
};

export default ManagePayroll;
