/* eslint-disable react/display-name */
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo, useEffect, useRef, forwardRef } from "react";
import { useTable, useRowSelect, TableInstance } from "react-table";
import type { Row } from "react-table";

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
  selectedEmployees: string[];
  setSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
}

const IndeterminateCheckbox = forwardRef<HTMLInputElement, { indeterminate?: boolean }>(
  ({ indeterminate = false, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (resolvedRef && "current" in resolvedRef && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} name="employees" />;
  }
);

export default function RowSelectTable({
  data,
  columns,
  onRowSelectionChange,
  onSelectedRowsAmountChange,
  setSelectedEmployees,
}: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
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
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => {
            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            );
          },
        },
      ]);
    }
  ) as TableInstance<Record<string, unknown>>;

  useEffect(() => {
    onRowSelectionChange(selectedRowIds);
  }, [selectedRowIds, onRowSelectionChange]);

  const rowData = useMemo(() => {
    return selectedFlatRows?.map((selectedRow) => selectedRow.original.id) ?? [];
  }, [selectedFlatRows]);

  useEffect(() => {
    setSelectedEmployees(() => [...rowData] as string[]);
  }, [rowData, setSelectedEmployees]);

  useEffect(() => {
    let selectedAmount = 0;
    rows.forEach((row) => {
      const original = row.original as Record<string, unknown>;
      const salary = original?.salary as number | undefined;
      if (selectedRowIds[row.id] && salary) {
        selectedAmount += Number(salary);
      }
    });
    onSelectedRowsAmountChange(selectedAmount);
  }, [rows, selectedRowIds, onSelectedRowsAmountChange]);

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} borderTop="none" backgroundColor="transparent">
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
                  return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
