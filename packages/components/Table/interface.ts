import type { ReactNode } from 'react';
import type { UseTableOptions, UseTableInstanceProps } from 'react-table';

type TopbarFilterOptions = {
  filter: 'download' | 'actions';
};

export interface TableTopbarOptions {
  filter: TopbarFilterOptions['filter'];
  btnTitle?: string;
  onCreateRoute?: string;
  onBulkDelete?: () => void;
  disabled?: boolean;
  hasBulkImporter?: boolean;
  data?: Record<string, unknown>[];
  searchValue?: string;
  onGridSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  mutationLoading?: boolean;
  onImporterRoute?: string;
  hasAddButton?: boolean;
}

export type TD = {
  [key: string]: unknown;
};
type TableInstanceProps<Data extends object> = Partial<UseTableOptions<Data>> &
  Partial<UseTableInstanceProps<Data>>;

export type TableRootOptionsProps<Entity extends TD> = TableInstanceProps<Entity> & {
  columns: any[];
  hasCheckBox?: boolean;
  data: Entity[] | (() => TD[]) | any;
  handleRowClick?: (e: any) => void;
  mutationFn?: (value: any) => void;
  mutationLoading?: boolean;
  searchParams?: string[];
};

export interface TableProps<Data extends TD> extends Omit<TableRootOptionsProps<Data>, 'columns'> {
  columns: any[];
  name: string;
  search?: string;
  btnTitle?: string;
  children?: ReactNode;
  onImporterRoute?: string;
  onCreateRoute?: string;
  hasFilterActions?: boolean;
  variant?: string;
  emptyImage?: string;
  hasBulkImporter?: boolean;
  filter: 'download' | 'actions';
  hasAddButton?: boolean;
}

export interface UseTableRootProps<T extends TD> extends TableRootOptionsProps<T> {
  rootPageIndex?: number;
  rootPageSize?: number;
  // tableInstance: ReturnType<typeof useTable>;
  // getTableProps: Hooks<T>['getTableProps'];
  // getTableBodyProps: Hooks<T>['getTableBodyProps'];
  // headerGroups: Hooks<T>['headerGroups'];
  // rows: Hooks<T>['rows'];
  // prepareRow: Hooks<T>['prepareRow'];
  // page: Hooks<T>['page'];
  // canPreviousPage: Hooks<T>['canPreviousPage'];
  // canNextPage: Hooks<T>['canNextPage'];
  // pageOptions: Hooks<T>['pageOptions'];
  // pageCount: Hooks<T>['pageCount'];
  // gotoPage: Hooks<T>['gotoPage'];
  // nextPage: Hooks<T>['nextPage'];
  // previousPage: Hooks<T>['previousPage'];
  // setPageSize: Hooks<T>['setPageSize'];
  // state: Hooks<T>['state'];
  // selectedFlatRows: Hooks<T>['selectedFlatRows'];
  // preGlobalFilteredRows: Hooks<T>['preGlobalFilteredRows'];
  // setGlobalFilter: Hooks<T>['setGlobalFilter'];
  // visibleColumns: Hooks<T>['visibleColumns'];
  // allColumns: Hooks<T>['allColumns'];
  // getToggleHideAllColumnsProps: Hooks<T>['getToggleHideAllColumnsProps'];
}
