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
import {
  HStack,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiArrowLeft, FiChevronRight } from "react-icons/fi";

import ViewLayout from "../../components/core/ViewLayout";
import { EmptyContractorImage } from "./ProviderIcons";
import ReimbursementItem from "./ReimbursementItem";

const Index: React.FC = () => {
  // const [dummyData, setDummyData] = useState<{ [key: string]: string }[]>([]);
  const [dummyDataInUse, setDummyDataInUse] = useState<{ [key: string]: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // search and
  useEffect(() => {}, []);

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
    setDummyDataInUse([
      {
        fullName: "john doe",
        purpose: "Lorem ipsum dolor sit amet consectetur....",
        amount: "USD 2000",
        attachment: "IMG_2022154-432",
        action: "manage",
        imgURL:
          "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
      },
      {
        fullName: "andrew tate",
        purpose: "Lorem ipsum dolor sit amet consectetur....",
        amount: "USD 2000",
        attachment: "IMG_2022154-432",
        action: "approved",
        imgURL:
          "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
      },
      {
        fullName: "akpan",
        purpose: "Lorem ipsum dolor sit amet consectetur....",
        amount: "USD 2000",
        attachment: "IMG_2022154-432",
        action: "disapproved",
        imgURL:
          "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
      },
      {
        fullName: "jane doe",
        purpose: "Ipsum lorem dolor sit amet consectetur....",
        amount: "USD 6000",
        attachment: "IMG_2022154-433",
        action: "manage",
        imgURL:
          "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
      },
    ]);
  }, []);

  return (
    <ViewLayout title="Expenses">
      <Breadcrumb
        fontSize={"xs"}
        separator={<FiChevronRight color="#d2d2d2" fontSize={"16px"} />}
        pb="2"
        fontWeight={"semibold"}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/expenses" color={"lightgrey"}>
            Expenses
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
          // href='#'
          >
            Manage Reimbursements
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack gap="4" align={"center"}>
        <Stack
          borderRadius={"15px"}
          border={"1px solid"}
          borderColor="bordergrey"
          // p="4"
          bg={"white"}
          w="100%">
          <Stack spacing={4} p={5}>
            <Text fontWeight="bold" fontSize="18px">
              Reimbursement List
            </Text>
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
            }}>
            <Table size="md" variant="unstyled">
              <Thead>
                <Tr>
                  <Th>Full Name</Th>
                  <Th>Purpose</Th>
                  <Th>Amount</Th>
                  <Th>Attachment</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dummyDataInUse &&
                  dummyDataInUse?.length > 0 &&
                  dummyDataInUse
                    ?.slice(pageSize * currentPage - pageSize, pageSize * currentPage)
                    .map((data, index) => <ReimbursementItem key={index} data={data} />)}
              </Tbody>
            </Table>
          </TableContainer>

          {dummyDataInUse && dummyDataInUse?.length > 0 && (
            <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={isDisabled}
              onPageChange={handlePageChange}>
              <PaginationContainer align="center" justify="space-between" p={5} w="full">
                <PaginationPrevious
                  variant={"outline"}
                  h="40px"
                  px="12px"
                  leftIcon={<FiArrowLeft />}
                  iconSpacing={3}
                  border={"1px solid #D0D5DD"}
                  borderRadius="8px"
                  boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}>
                  <Text>Previous</Text>
                </PaginationPrevious>
                <PaginationPageGroup
                  isInline
                  align="center"
                  separator={<PaginationSeparator bg="#EAECF0" fontSize="sm" boxSize="10" jumpSize={11} />}>
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
                  boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}>
                  <Text>Next</Text>
                </PaginationNext>
              </PaginationContainer>
            </Pagination>
          )}

          {(!dummyDataInUse || dummyDataInUse?.length === 0) && (
            <Center w="100%" p="8" flexDirection={"column"}>
              <EmptyContractorImage />
              <Text pr="12" pt="2">
                No Reimbursements
              </Text>
            </Center>
          )}
        </Stack>
      </HStack>
    </ViewLayout>
  );
};

export default Index;
