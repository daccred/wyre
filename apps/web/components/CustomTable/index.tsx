import { Table, Thead, Tbody, Tr, Th, Td, Button, Stack, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import type { Column } from "react-table";
import { useTable, usePagination } from "react-table";

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
}

export function CustomTable<T extends object>({ data, columns }: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <Stack spacing={16}>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th fontSize="md" py={4} bg="transparent" borderTop="none" px={0}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()} py={2} px={0}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justify="space-between" mt={20}>
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          <Flex align="center">
            <Icon as={AiOutlineLeft} />
            <Text ml={2}>Previous</Text>
          </Flex>
        </Button>
        <Text>
          Page {pageIndex + 1} of {pageOptions.length}
        </Text>
        <Button onClick={nextPage} disabled={!canNextPage}>
          <Flex align="center">
            <Text mr={2}>Next</Text>
            <Icon as={AiOutlineRight} />
          </Flex>
        </Button>
      </Flex>
    </Stack>
  );
}
