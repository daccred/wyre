import { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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

interface Columns {
  Header: string;
  accessor?: string;
  Cell?: (row: any) => JSX.Element;
}

interface Props {
  columns: Columns[];
  data: any[];
}

interface Data {
  [key: string]: any;
}

export default function MainTable({ data, columns }: Props) {
  const columnsMemo = useMemo(() => columns, [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } = useTable<Data>(
    {
      // @ts-ignore
      columns: columnsMemo,
      data,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handlePageChange = (newPage: number) => {
    gotoPage(newPage - 1);
  };

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                  borderTop="none"
                  backgroundColor="transparent"
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            if (!row) {
              return null;
            }
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Pagination
        pagesCount={pageCount}
        currentPage={pageIndex + 1}
        isDisabled={false}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          py={2}
          w="full"
        >
          <PaginationPrevious
            variant={"outline"}
            h="40px"
            px="12px"
            leftIcon={<FiArrowLeft />}
            iconSpacing={3}
            border={"1px solid #D0D5DD"}
            borderRadius="8px"
            boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}
          >
            Previous
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                bg="#EAECF0"
                fontSize="sm"
                boxSize="10"
                jumpSize={11}
              />
            }
          >
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <PaginationPage
                w={7}
                bg="white"
                key={`pagination_page_${page}`}
                page={page - 1}
                fontSize="sm"
                boxSize="10"
                fontWeight="bold"
                _hover={{
                  bg: "#EAECF0",
                }}
                _current={{
                  bg: "#EAECF0",
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            variant={"outline"}
            h="40px"
            px="12px"
            rightIcon={<FiArrowRight />}
            iconSpacing={3}
            border={"1px solid #D0D5DD"}
            borderRadius="8px"
            boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}
          >
            Next
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </>
  );
}
