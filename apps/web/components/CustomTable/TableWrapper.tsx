import React from 'react';
import { Box, ChakraProps } from '@chakra-ui/react';
import TableHead from './TableHead';

const TableWrapper = ({
  children,
  overflowX,
  tableHeads,
  data,
  loading,
  onLoadingData,
}: {
  data?: unknown[];
  overflowX?: ChakraProps['overflowX'];
  onLoadingData?: boolean;
  loading?: boolean;
  tableHeads: {
    id?: string | number;
    name: number | string;
  }[];
  children: React.ReactNode;
}) => (
  <Box
    overflowX={overflowX || 'hidden'}
    css={{
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'primary',
        borderRadius: '24px',
      },
    }}
    bg={data?.length === 0 && !loading ? 'transparent' : 'white'}
    rounded="lg"
    w="100%"
    
  >
    <Box
      verticalAlign="middle"
      display="inline-block"
      minWidth="100%"
      shadow="sm"
      overflow="hidden"
    >
      <Box as="table" w="100%">
        <TableHead
          tableHead={tableHeads}
          data={data}
          loading={!!loading}
          onLoadingData={onLoadingData}
        />
        {children}
      </Box>
    </Box>
  </Box>
);

export default TableWrapper;
