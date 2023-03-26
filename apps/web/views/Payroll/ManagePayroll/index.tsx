import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Payroll } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import type { Column } from "react-table";
import { EmptyEmployeeImage } from "views/Employees/ProviderIcons";

import { CustomTable } from "../../../components/CustomTable";
import ViewLayout from "../../../components/core/ViewLayout";
import { trpc } from "../../../utils/trpc";
import { managePayrollPath } from "../routes";
import { managePayrollColumns } from "../utils/tableColumns";

const View = () => {
  const { pathname } = useRouter();

  const [tableData, setTableData] = useState<Payroll[]>([]);
  const router = useRouter();

  const columns = [
    ...managePayrollColumns,
    {
      Header: "Action",
      accessor: (row: any) => (
        <Button
          bg="brand.700"
          color="white"
          iconSpacing="3"
          w="fit-content"
          _hover={{ hover: "none" }}
          onClick={() =>
            router.push({
              pathname: "/payroll/manage-payroll/monthly-employee-salary",
              query: { id: row?.id },
            })
          }>
          Manage
        </Button>
      ),
    },
  ];

  const { data: payroll, isLoading } = trpc.payroll.getPayrolls.useQuery();

  useEffect(() => {
    if (!payroll) {
      return;
    }

    setTableData(payroll as Payroll[]);
  }, [payroll]);

  return (
    <ViewLayout title="Payroll">
      <Breadcrumb
        fontSize="sm"
        separator={<FiChevronRight color="#d2d2d2" fontSize="16px" />}
        pb="2"
        fontWeight="semibold"
        color="lightgrey">
        <BreadcrumbItem>
          <BreadcrumbLink href="/payroll">Payroll</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={managePayrollPath}
            color={pathname === managePayrollPath ? "black" : "lightgrey"}
            isCurrentPage={true}>
            Manage Payroll
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack rounded="md" p={6} bg="white" w="100%" mt={3} border="1px solid #D2D2D2">
        <Heading as="h4" size="xs" fontSize="xl">
          Active Payroll
        </Heading>
        {isLoading ? (
          <Center>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        ) : (
          <>
            {tableData?.length > 0 ? (
              <CustomTable columns={columns as Column<Payroll>[]} data={tableData} />
            ) : (
              <Center w="100%" p="8" flexDirection="column">
                <EmptyEmployeeImage />
                <Text pr="12" pt={2}>
                  You currently have no active payroll
                </Text>
              </Center>
            )}
          </>
        )}
      </Stack>
    </ViewLayout>
  );
};

export default View;
