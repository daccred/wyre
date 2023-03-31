// // import { Box } from "@chakra-ui/react";
// import React, { useEffect } from "react";
// // import { AiOutlineEdit } from "react-icons/ai";
// // import type { Hooks, CellProps, HeaderProps } from "react-table";
// import { useTable, usePagination, useRowSelect, useGlobalFilter, useSortBy } from "react-table";
// import type { Column } from "react-table";

// import { useDebounce } from "../hooks/use-debounce";

// /* Dependency components */
// // import { TD, UseTableRootProps } from './interface';
// // import TableCheckbox from "./table-checkbox";

// interface UseTableRootProps<T extends Record<string, unknown>> {
//   data: T[];
//   rootPageIndex?: number;
//   rootPageSize?: number;
//   columns: Readonly<Column<T>[]>;
//   handleRowClick?: (row: React.MouseEvent<HTMLInputElement>) => void;
//   hasCheckBox?: boolean;
//   searchParams?: string[];
//   mutationFn?: (value: unknown) => void;
//   mutationLoading?: boolean;
// }

// export const useTableRoot = <T extends Record<string, unknown>>({
//   data,
//   rootPageIndex = 0,
//   rootPageSize = 100,
//   columns,
//   // hasCheckBox,
//   searchParams,
//   mutationFn,
//   mutationLoading,
// }: UseTableRootProps<T>) => {
//   /**
//    * @TODO
//    * We should not memoize here, all entities should always pass in
//    * memoized data as props to this component by default
//    */
//   const _data = React.useMemo(() => data, [data]);
//   const _columns = React.useMemo(() => columns, [columns]);
//   const [_records, setRecords] = React.useState<T[]>(_data);
//   const [isQueryLoading, setQueryLoading] = React.useState(true);
//   const [skipPageReset, setSkipPageReset] = React.useState(false);
//   // console.log(searchParams, "><>xxsxaxx<><><><><><><><>")
//   // console.log({ data, _records, columns })
//   /**
//    * Instead of using the updateMyDate method in useTable
//    * We leverage useEffect to always update the Table state with
//    * new memoized table from the query in useQuery or Cubes
//    * */
//   useEffect(() => {
//     setRecords(_data);
//     setQueryLoading(false);
//   }, [_data]);

//   // const useSelectionUi = (hooks: Hooks<T extends object ? TD : TD>) => {
//   //   hooks.allColumns.push((columns) => [
//   //     {
//   //       id: "_selector",
//   //       disableResizing: true,
//   //       disableGroupBy: true,
//   //       minWidth: 45,
//   //       width: 45,
//   //       maxWidth: 45,
//   //       Aggregated: undefined,
//   //       Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<TD>) => (
//   //         <TableCheckbox checked={_checked} {...getToggleAllRowsSelectedProps()} />
//   //       ),
//   //       Cell: ({ row }: CellProps<TD>) => (
//   //         <Box pos="absolute" zIndex={10}>
//   //           <TableCheckbox checked={_checked} {...row.getToggleRowSelectedProps()} />
//   //         </Box>
//   //       ),
//   //     },
//   //     ...columns,
//   //   ]);
//   //   hooks.useInstanceBeforeDimensions.push((headerGroups) => {
//   //     const selectionGroupHeader = headerGroups.headers[0];
//   //     selectionGroupHeader.canResize = false;
//   //   });
//   // };
//   const isLoading = isQueryLoading || mutationLoading;
//   // const _checked = useSelectionUi;
//   const {
//     nextPage,
//     gotoPage,
//     page,
//     prepareRow,
//     pageOptions,
//     canNextPage,
//     headerGroups,
//     previousPage,
//     getTableProps,
//     canPreviousPage,
//     getTableBodyProps,
//     setGlobalFilter,
//     selectedFlatRows,
//     state: { pageIndex, selectedRowIds, globalFilter },
//   } = useTable(
//     {
//       columns: _columns,
//       data: _records,
//       initialState: { pageIndex: rootPageIndex, pageSize: rootPageSize },
//       autoResetPage: !skipPageReset,
//     },

//     // _checked,
//     useGlobalFilter,
//     useSortBy,
//     usePagination,
//     useRowSelect
//     // (hooks) => {
//     //   hooks.allColumns.push((columns) => [
//     //     ...columns,
//     //     {
//     //       accessor: "edit",
//     //       id: "edit",
//     //       Header: "",
//     //       width: "20px",
//     //       Cell: ({ row }) => (
//     //         <IconButton
//     //           aria-label="edit button"
//     //           icon={<Icon as={AiOutlineEdit} />}
//     //           maxW="20px"
//     //           className="action-button"
//     //           variant="ghost"
//     //           onClick={() => (handleRowClick ? handleRowClick(row) : null)}
//     //         />
//     //       ),
//     //     },
//     //   ]);
//     // }
//   );

//   /* The mutation handler for bulk delete */
//   const deleteSelectedRows = async () => {
//     if (mutationFn) {
//       mutationFn({
//         bulk: selectedFlatRows.map((row) => row.original),
//       });
//     }
//   };
//   const debouncedFilterValue = useDebounce(globalFilter, 500);
//   useEffect(() => {
//     if (debouncedFilterValue) {
//       setRecords(
//         data.filter((item) => {
//           return searchParams?.some((param) => {
//             return item[param]?.toString().toLowerCase().includes(debouncedFilterValue.toLowerCase());
//           });
//         })
//       );
//     }
//   }, [data, debouncedFilterValue, globalFilter, searchParams]);
//   const handleSearch = (e: any) => {
//     const value = e.target.value;
//     if (value) {
//       setGlobalFilter(value);
//     } else {
//       setRecords(data);
//     }
//   };
//   return {
//     isLoading,
//     records: _records,
//     columns: _columns,
//     setQueryLoading,
//     skipPageReset,
//     setSkipPageReset,
//     page,
//     nextPage,
//     gotoPage,
//     pageIndex,
//     selectedRowIds,
//     globalFilter,
//     prepareRow,
//     pageOptions,
//     canNextPage,
//     headerGroups,
//     previousPage,
//     getTableProps,
//     canPreviousPage,
//     getTableBodyProps,
//     setGlobalFilter,
//     isToggledRows: Object.keys(selectedRowIds).length !== 0,
//     setTableData: setRecords,
//     searchValue: debouncedFilterValue,
//     executeTableSearch: handleSearch,
//     executeBulkDelete: deleteSelectedRows,
//     selectedRows: selectedFlatRows.map((row) => row.original),
//   };
// };
// export type UseTableRootReturnProps = ReturnType<typeof useTableRoot>;
// export default useTableRoot;
export {};
