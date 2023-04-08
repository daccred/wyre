import { Skeleton, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Avatar, HStack } from '@chakra-ui/react';
import * as React from 'react';

const Index = () => {
  return (
    <>
      <HStack justifyContent="space-between" py="4" px="4">
        <Skeleton height="22px" width="30%" rounded="full" />
        <Skeleton height="14px" width="30%" rounded="full" />
      </HStack>
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>
                <Skeleton height="14px" rounded="full" />
              </Th>
              <Th>
                <Skeleton height="14px" rounded="full" />
              </Th>
              <Th>
                <Skeleton height="14px" rounded="full" />
              </Th>
              <Th>
                <Skeleton height="14px" rounded="full" />
              </Th>
              <Th>
                <Skeleton height="14px" rounded="full" />
              </Th>
            </Tr>
          </Thead>
          {Array.from(Array(10).keys()).map((id) => {
            return (
              <Tbody key={id}>
                <Tr>
                  <Td>
                    <HStack>
                      <Avatar size="sm" />
                      <Skeleton width="100%" height="14px" rounded="full" />
                    </HStack>
                  </Td>
                  <Td>
                    <Skeleton height="14px" rounded="full" />
                  </Td>
                  <Td>
                    <Skeleton height="14px" rounded="full" />
                  </Td>
                  <Td>
                    <Skeleton height="14px" rounded="full" />
                  </Td>
                  <Td>
                    <Skeleton height="14px" rounded="full" />
                  </Td>
                </Tr>
              </Tbody>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};

export default Index;
