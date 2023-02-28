import React from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';

const TableHead = ({
  tableHead,
  onLoadingData,
  data,
  loading,
}: {
  loading: boolean;
  data?: unknown[];
  onLoadingData?: boolean;
  tableHead: {
    id?: string | number;
    name: number | string;
  }[];
}) => {
  if (loading) {
    return (
      <Flex
        w="100%"
        position={onLoadingData ? 'absolute' : 'relative'}
        align="center"
        justify="center"
        h='100%'
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="cf.900"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <Box as="thead" w="100%" >
      <Box as="tr" w="100%">
        {(data || [])?.length > 0 &&
          tableHead?.map((item) => (
            <Box
              key={item?.id}
              as="th"
              px={4}
              py={5}
              borderBottomWidth={1}
              textAlign="left"
              fontSize="sm"
              fontWeight="bold"
              lineHeight={4}
              color=" #6E7575"
              textTransform="capitalize"
            >
              {item?.name}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default TableHead;
