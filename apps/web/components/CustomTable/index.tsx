import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
} from "react";
import { Box, Flex } from "@chakra-ui/react";
import TableWrapper from "./TableWrapper";
import TableContent from "./TableContent";
import TablePagination from "./TablePagination";
import TableSearch from "./TableSearch";

export type ITableColumns = {
  name: string;
  id: string | number;
  selector?: string | "numbering" | ((x: unknown, l: number) => ReactElement);
  Selector?: React.FC<{ index: number } & Record<string, unknown>> | undefined;
}[];
const CustomTable = ({
  data = [],
  columns,
  loading,
  onLoadingData,
  hasSearch,
  searchOptions,
  defaultTableData,
  setDefaultTableData,
  setTableData
}: {
  onLoadingData?: boolean;
  loading?: boolean;
  showEmptyState?: boolean;
  data: unknown[];
  columns: ITableColumns;
  emptyStateInfo: string;
  hasSearch?: boolean;
  searchOptions?: string[];
  defaultTableData?: unknown[];
  setDefaultTableData?: Dispatch<SetStateAction<unknown[]>>
  setTableData?:Dispatch<SetStateAction<unknown[]>> 
}) => {
  const currentData = data || [];
  return (
    <Flex direction="column" position="relative">
    
        <>
          {hasSearch && (
            <TableSearch
              searchOptions={searchOptions}
              defaultTableData={defaultTableData}
              setDefaultTableData={setDefaultTableData}
              setTableData={setTableData}
           
            />
          )}
          <TableWrapper
            overflowX="auto"
            data={currentData || []}
            tableHeads={columns}
            loading={loading}
            onLoadingData={onLoadingData}
          >
            <Box as="tbody">
              {(currentData || [])?.map((item, i) => (
                <TableContent
                  index={i + 1}
                  key={(item as { _id: string })?._id}
                  renderer={columns}
                  item={item}
                />
              ))}
            </Box>
          </TableWrapper>
        </>

      {currentData?.length > 0 && (
        <Box mt={6}>
          <TablePagination data={currentData} />
        </Box>
      )}
    </Flex>
  );
};

export default CustomTable;
