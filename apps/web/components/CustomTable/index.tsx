import React, { ReactElement } from "react";
import {
  Box,
  Center,
  ComponentWithAs,
  Flex,
  IconProps,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import TableWrapper from "./TableWrapper";
import TableContent from "./TableContent";
import TablePagination from "./TablePagination";
import { EmptyEmployeeImage } from "views/Employees/ProviderIcons";

export type ITableColumns = {
  name: string;
  id: string | number;
  selector?: string | "numbering" | ((x: unknown, l: number) => ReactElement);
  Selector?: React.FC<{ index: number } & Record<string, unknown>> | undefined;
}[];
const CustomTable = ({
  data = [],
  columns,
  emptyStateInfo,
  loading,
  onLoadingData,
  isClickable,
  showEmptyState = true,
  onSingleContentClick,
}: {
  pagination?: boolean;
  icon?: ComponentWithAs<"svg", IconProps> | IconType;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  setPage?: (d?: unknown) => void;
  onLoadingData?: boolean;
  onSingleContentClick?: (i: unknown) => void;
  loading?: boolean;
  isClickable?: boolean;
  showEmptyState?: boolean;
  noPagination?: boolean;
  data: unknown[];
  columns: ITableColumns;
  emptyStateInfo: string;
}) => {
  const currentData = data || [];
  return (
    <Flex direction="column"  position="relative">
      {!loading && !data.length ? (
        showEmptyState ? (
          <Center w="100%" p="8" flexDirection={"column"}>
            <EmptyEmployeeImage />
            <Text pr="12" pt="2">
              {emptyStateInfo}{" "}
            </Text>
          </Center>
        ) : null
      ) : (
        <TableWrapper
          overflowX="auto"
          data={currentData || []}
          tableHeads={columns}
          loading={loading}
          onLoadingData={onLoadingData}
        >
          <Box  as="tbody">
            {(currentData || [])?.map((item, i) => (
              <TableContent
                index={i + 1}
                key={(item as { _id: string })?._id}
                renderer={columns}
                item={item}
                onClick={onSingleContentClick}
                isClickable={isClickable}
              />
            ))}
          </Box>
        </TableWrapper>
      )}

      {currentData?.length > 0 && (
        <Box mt={6}>
          <TablePagination data={currentData} />
        </Box>
      )}
    </Flex>
  );
};

export default CustomTable;
