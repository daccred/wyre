import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import ViewLayout from "../../../components/core/ViewLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { managePayrollPath } from "../routes";
import { managePayrollColumns } from "../utils/tableColumns";
import { Payroll } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import { CustomTable } from "../../../components/CustomTable";

const ManagePayroll = () => {
  const { pathname } = useRouter();

  const [tableData, setTableData] = useState<Payroll[]>([]);

  const columns = [
    ...managePayrollColumns,
    {
      Header: "Action",
      accessor: (row: any) => (
        <Link
          href={{
            pathname: "/payroll/manage-payroll/monthly-employee-salary",
            query: row,
          }}
        >
          <Button
            bg="brand.700"
            color="white"
            iconSpacing="3"
            w="fit-content"
            _hover={{ hover: "none" }}
          >
            Manage
          </Button>
        </Link>
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
        {isLoading ? (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <CustomTable
            // @ts-ignore
            columns={columns}
            data={tableData}
          />
        )}
      </Stack>
    </ViewLayout>
  );
};

export default ManagePayroll;
