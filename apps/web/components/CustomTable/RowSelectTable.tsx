/* eslint-disable react/display-name */
import { useMemo, useEffect, useRef, forwardRef } from "react";
import { useTable, useRowSelect } from "react-table";
import type { Row } from "react-table";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface Columns {
  Header: string;
  accessor?: string;
  Cell?: (row: Row) => JSX.Element;
}

interface Props {
  columns: Columns[];
  data: {}[];
  onRowSelectionChange: (selectedRowIds: Record<string, boolean>) => void;
  onSelectedRowsAmountChange: (amount: number) => void;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  { indeterminate: boolean }
>(
  (
    { indeterminate, ...rest },
    ref:
      | React.Ref<HTMLInputElement>
      | ((instance: HTMLInputElement | null) => void)
  ) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (resolvedRef && "current" in resolvedRef && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function RowSelectTable({data, columns, onRowSelectionChange, onSelectedRowsAmountChange}:Props ) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    state: { selectedRowIds, pageIndex, pageSize },

  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "selection",
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                // @ts-ignore
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
      ]);
    }
  );



  useEffect(() => {
    onRowSelectionChange(selectedRowIds);
  }, [onRowSelectionChange, selectedRowIds]);

  useEffect(() => {
    let selectedAmount = 0;
    selectedRowIds &&
      Object.keys(selectedRowIds).forEach((id) => {
        const row = rows.find((r) => r.id === id);
        // @ts-ignore
        if (row && row.original && row.original.grossPay) {
          // @ts-ignore
          selectedAmount += row.original.grossPay;
        }
      });
    onSelectedRowsAmountChange(selectedAmount);
  }, [selectedRowIds, rows, onSelectedRowsAmountChange]);

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
          {rows.map((row) => {
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
      
    </>
  );
}
