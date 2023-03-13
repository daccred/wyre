import React from "react";
import { useTable, Column, usePagination } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  ButtonGroup,
  Button,
  Stack,
  Flex,
  Text,
  Box,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
} from "@ajna/pagination";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
}

export function CustomTable<T extends object>({
  data,
  columns,
}: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize },
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
                <Th fontSize="md" py={6}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
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
