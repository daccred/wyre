import { Flex, Stack, Box, Icon, Text, Grid, Skeleton, HStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';

import { IndicatorIcon } from './providerIcon';

interface Request {
  id: number;
  description: string;
  dateTime: string;
  amount: string;
  icon: string;
  created_at: string;
  status: string;
}

interface RequestListProps {
  requests: Request[];
  isLoading: boolean;
}

const PulseCards = () => {
  return (
    <Box py={4}>
      <Stack spacing={3} mt="3">
        {Array.from(Array(5).keys()).map((id) => {
          return (
            <Box key={id} cursor="pointer" bg="#fbfdff" rounded="10px">
              <Stack isInline justifyContent="space-between" mt={2} p={3}>
                <Box width="100%">
                  <Box>
                    <Stack spacing={2} mt={1} isInline alignItems="center">
                      <Skeleton height="12px" width="70%" rounded="full" my={1} />
                      <Skeleton height="14px" width="30%" rounded="full" />
                    </Stack>
                    <HStack justify="space-between" isInline alignItems="center" mt={1}>
                      <HStack spacing={2} width="60%">
                        <Skeleton height="12px" width="40%" rounded="full" my={1} />
                        <Skeleton height="12px" width="5%" rounded="full" my={1} />
                        <Skeleton height="12px" width="60%" rounded="full" my={1} />
                      </HStack>
                    </HStack>
                  </Box>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

const LogList = ({ requests, isLoading }: RequestListProps) => {
  return (
    <Box w="100%">
      {isLoading ? (
        <PulseCards />
      ) : (
        <>
          {requests.map((request, index) => (
            <Fragment key={index}>
              <Grid
                templateRows="auto"
                w="100%"
                templateColumns="6fr 2fr"
                p={3}
                gap={3}
                alignItems="start"
                rounded="10px"
                bg="#F7F7F7"
                my={3}
                _hover={{ bg: 'gray.200' }}
                cursor="pointer">
                <Stack spacing={0} direction="row" alignItems="center">
                  <Flex px={3}>
                    <Icon as={IndicatorIcon} w={5} h={5} />
                  </Flex>

                  <Flex direction="column">
                    <Text
                      color="black"
                      fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                      lineHeight="20px"
                      mb="2"
                      noOfLines={1}
                      dangerouslySetInnerHTML={{ __html: request.description }}
                    />
                    <Flex
                      color="#666666"
                      fontSize={{ base: '12px', sm: '12px' }}
                      alignItems="center"
                      lineHeight="13px">
                      {request.dateTime} <Icon as={GoPrimitiveDot} w={4} h={4} mx={1} color="#666666" />{' '}
                      {request.created_at}
                    </Flex>
                  </Flex>
                </Stack>

                <Stack spacing={0} direction="column" alignItems="center">
                  <Flex
                    direction="column"
                    fontSize={{ base: '12px', sm: '14px' }}
                    lineHeight="20px"
                    fontWeight="semibold">
                    <Text>{request.amount}</Text>
                  </Flex>
                  <Text
                    textTransform="capitalize"
                    color={request.status === 'pending' ? '#FF951C' : 'green.500'}>
                    {request.status}
                  </Text>
                </Stack>
              </Grid>
            </Fragment>
          ))}
        </>
      )}
    </Box>
  );
};

export default LogList;
