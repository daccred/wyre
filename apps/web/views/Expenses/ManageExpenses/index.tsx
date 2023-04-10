import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import type { Column } from 'react-table';
import { trpc } from 'utils/trpc';
import { EmptyEmployeeImage } from 'views/Employees/ProviderIcons';
import { manageExpensePath } from 'views/Payroll/routes';

import { CustomTable } from '../../../components/CustomTable';
import ViewLayout from '../../../components/core/ViewLayout';
import { manageExpensesColumn } from '../utils/tableColumns';

const View = () => {
  const {
    isOpen: viewImageModalIsOpen,
    onOpen: openViewImageModal,
    onClose: closeViewImageModal,
  } = useDisclosure();

  const {
    isOpen: manageExpenseModalIsOpen,
    onOpen: openManageExpenseModal,
    onClose: closeManageExpenseModal,
  } = useDisclosure();

  const { pathname } = useRouter();

  const [tableData, setTableData] = useState<any[]>([]);

  const [selectedRowData, setSelectedRowData] = useState(null);

  const { data: expenses, isLoading, refetch } = trpc.expenses.getExpenses.useQuery();

  useEffect(() => {
    if (!expenses) {
      return;
    }

    setTableData(expenses);
  }, [expenses]);

  return (
    <ViewLayout title="Expenses">
      <Breadcrumb
        fontSize="sm"
        separator={<FiChevronRight color="#d2d2d2" fontSize="16px" />}
        pb="2"
        fontWeight="semibold"
        color="lightgrey">
        <BreadcrumbItem>
          <BreadcrumbLink href="/expenses">Expenses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={manageExpensePath}
            color={pathname === manageExpensePath ? 'black' : 'lightgrey'}
            isCurrentPage={true}>
            Manage Expenses
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack rounded="md" p={6} bg="white" w="100%" mt={3} border="1px solid #D2D2D2">
        <Heading as="h4" size="xs" fontSize="xl">
          Expense List
        </Heading>
        {isLoading ? (
          <Center>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        ) : (
          <>
            {tableData?.length > 0 ? (
              <CustomTable
                columns={
                  manageExpensesColumn(
                    viewImageModalIsOpen,
                    openViewImageModal,
                    closeViewImageModal,
                    manageExpenseModalIsOpen,
                    openManageExpenseModal,
                    closeManageExpenseModal,
                    selectedRowData,
                    setSelectedRowData,
                    refetch
                  ) as unknown as Column<any>[]
                }
                data={tableData}
              />
            ) : (
              <Center w="100%" p="8" flexDirection="column">
                <EmptyEmployeeImage />
                <Text pr="12" pt={2}>
                  You currently have no expenses
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
