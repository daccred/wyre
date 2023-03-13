import React, { useState, useEffect } from 'react';
import ViewLayout from "../../components/core/ViewLayout";
import {
  Button,
  HStack,
  Input,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Checkbox,
  Flex,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { EmptyContractorImage, LinkIcon } from "./ProviderIcons";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";

interface DataRow {
  fullName: string;
  department: string;
  jobRole: string;
  date: string;
  amount: string;
  description: string;
  imgURL: string;
}

const dummyData: DataRow[] = [
  { fullName: "John Doe", department: "Sales", jobRole: "Manager", date: "2022-01-01", amount: "$100", description: "Lorem ipsum dolor sit amet", imgURL: "" },
  { fullName: "Jane Doe", department: "Marketing", jobRole: "Assistant", date: "2022-01-02", amount: "$200", description: "consectetur adipiscing elit", imgURL: "" },
  { fullName: "Bob Smith", department: "Finance", jobRole: "Analyst", date: "2022-01-03", amount: "$300", description: "sed do eiusmod tempor incididunt", imgURL: "" },
  { fullName: "Alice Brown", department: "IT", jobRole: "Developer", date: "2022-01-04", amount: "$400", description: "ut labore et dolore magna aliqua", imgURL: "" }
];



const Index: React.FC = () => {
  const [dummyDataInUse, setDummyDataInUse] = useState<DataRow[]>(dummyData);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(selectedRows);

 
  // const handleSelectAllRows = () => {
  //   setSelectAll(true);
  //   setSelectedRows(dummyDataInUse);
  // };

  // const handleDeselectAllRows = () => {
  //   setSelectAll(false);
  //   setSelectedRows([]);
  // };


  // search and 
  useEffect(() => {
   
  }, []);

  // pagination functions start
  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    //  offset,
    currentPage,
    setCurrentPage,
    //  setIsDisabled,
    isDisabled,
    pageSize,
    //  setPageSize
  } = usePagination({
    total: dummyDataInUse?.length,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 10,
      isDisabled: false,
      currentPage: 1,
    },
  });

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
  };

  // pagination functions end

  useEffect(() => {

  }, []);
    
  return (
    <ViewLayout title='Expenses'>
      <HStack gap="4" align={"center"}>
          <Stack
            borderRadius={"15px"}
            border={"1px solid"}
            borderColor="bordergrey"
            // p="4"
            bg={"white"}
            w="100%"
          >
          <Stack spacing={4} p={5}>
            <Text fontWeight="bold" fontSize="18px">
              Expenses
            </Text>
              <Button
                variant={"darkBtn"}
                rightIcon={<LinkIcon />}
                iconSpacing="3"
                w={'fit-content'}
              >
                Get Payment Link
              </Button>
                <HStack gap="1">
                  <FiSearch fontSize={"24px"} />
                  <Input
                    variant={"unstyled"}
                    border={"0"}
                    borderBottom="1px solid"
                    borderRadius={0}
                    px="0"
                    py="1"
                    h="40px"
                    w={{ base: "auto", lg: "250px" }}
                    fontSize={"sm"}
                    placeholder="Search Expenses"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </HStack>
              
             <Text fontWeight="bold" fontSize="18px">Recent Expense(s)</Text>
            </Stack>

              <TableContainer
                css={{
                  "&::-webkit-scrollbar": {
                    width: "15px",
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#d6dee1",
                    borderRadius: "20px",
                    border: "6px solid transparent",
                    backgroundClip: "content-box",
                  },
                }}
              >
                <Table size="md" variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th>Full Name</Th>
                      <Th>Department</Th>
                      <Th>Job Role</Th>
                      <Th>Date</Th>
                      <Th>Amount</Th>
                      <Th>description</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dummyDataInUse && dummyDataInUse?.length > 0 && dummyDataInUse ?.slice(
                          pageSize * currentPage - pageSize,
                          pageSize * currentPage
                        )
                        .map((data, index) => (
                          <Tr textTransform={"capitalize"} key={index}>
                            <Td>
                              <HStack>
                                <Avatar size={"sm"} src={data?.imgURL} name={data?.fullName} />
                                <Text>{data?.fullName}</Text>
                              </HStack>
                            </Td>
                            <Td>{data?.department}</Td>
                            <Td>{data?.jobRole}</Td>
                            <Td>{data?.date}</Td>
                            <Td>{data?.amount}</Td>
                            <Td>{data?.description}</Td> 
                          </Tr>
                        ))}
                  </Tbody>
                </Table>
              </TableContainer>

            {dummyDataInUse && dummyDataInUse?.length > 0 && (
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                isDisabled={isDisabled}
                onPageChange={handlePageChange}
                
              >
                <PaginationContainer
                  align="center"
                  justify="space-between"
                  p={5}
                  w="full"
                >
                  <PaginationPrevious
                    variant={"outline"}
                    h="40px"
                    px="12px"
                    leftIcon={<FiArrowLeft />}
                    iconSpacing={3}
                    border={"1px solid #D0D5DD"}
                    borderRadius="8px"
                    boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}
                  >
                    <Text>Previous</Text>
                  </PaginationPrevious>
                  <PaginationPageGroup
                    isInline
                    align="center"
                    separator={
                      <PaginationSeparator
                        bg="#EAECF0"
                        fontSize="sm"
                        boxSize="10"
                        jumpSize={11}
                      />
                    }
                  >
                    {pages.map((page: number) => (
                      <PaginationPage
                        w={7}
                        bg="white"
                        key={`pagination_page_${page}`}
                        page={page}
                        fontSize="sm"
                        boxSize="10"
                        fontWeight="bold"
                        _hover={{
                          bg: "#EAECF0",
                        }}
                        _current={{
                          bg: "#EAECF0",
                        }}
                      />
                    ))}
                  </PaginationPageGroup>
                  <PaginationNext
                    variant={"outline"}
                    h="40px"
                    px="12px"
                    rightIcon={<FiArrowRight />}
                    iconSpacing={3}
                    border={"1px solid #D0D5DD"}
                    borderRadius="8px"
                    boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}
                  >
                    <Text>Next</Text>
                  </PaginationNext>
                </PaginationContainer>
              </Pagination>
            )}

            {(!dummyDataInUse || dummyDataInUse?.length === 0) && (
              <Center w="100%" p="8" flexDirection={"column"}>
                <EmptyContractorImage />
                <Text pr="12" pt="2">
                  No Expenses
                </Text>
              </Center>
            )}
          </Stack>
          
        </HStack>
    </ViewLayout>
  )
};

export default Index;