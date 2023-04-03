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
  Button,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Flex,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";

import ViewLayout from "../../components/core/ViewLayout";
import { trpc } from "../../utils/trpc";
import TablePulse from "../TablePulse";
import AddContractor from "./AddContractor";
import { EmptyContractorImage, PlusIcon } from "./ProviderIcons";

const initialState = {
  contractors: [],
  data: [],
  dataInUse: [],
  selectedContractor: undefined,
  searchTerm: "",
  activeContractorsOnly: true,
  isLoading: true,
  error: null,
};

const actionTypes = {
  FETCH_DATA: "FETCH_DATA",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SET_DATA: "SET_DATA",
  SET_DATA_IN_USE: "SET_DATA_IN_USE",
  SET_SELECTED_CONTRACTOR: "SET_SELECTED_CONTRACTOR",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_ACTIVE_CONTRACTORS_ONLY: "SET_ACTIVE_CONTRACTORS_ONLY",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contractors: action.payload,
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.SET_DATA_IN_USE:
      return {
        ...state,
        dataInUse: action.payload,
      };
    case actionTypes.SET_SELECTED_CONTRACTOR:
      return {
        ...state,
        selectedContractor: action.payload,
      };
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actionTypes.SET_ACTIVE_CONTRACTORS_ONLY:
      return {
        ...state,
        activeContractorsOnly: action.payload,
      };
    default:
      return state;
  }
};

const Contractors = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, dataInUse, selectedContractor, searchTerm, activeContractorsOnly } = state;
  const router = useRouter();
  const {
    data: contractors,
    error,
    isLoading,
    isFetching,
    refetch,
  } = trpc.contractor.getContractors.useQuery();

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_DATA, payload: isLoading });
  }, [isLoading]);

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ERROR, payload: error });
  }, [error]);
  const {
    isOpen: addContractorModalIsOpen,
    onOpen: openAddContractorModal,
    onClose: closeAddContractorModal,
  } = useDisclosure();
  const {
    isOpen: addContractorSuccessModalIsOpen,
    onOpen: openAddContractorSuccessModal,
    onClose: closeAddContractorSuccessModal,
  } = useDisclosure();

  useEffect(() => {
    if (contractors) {
      const convertedContractors = contractors.map((contractor: any) => ({
        id: contractor.id.toString(),
        name: contractor.firstName,
        email: contractor.email,
        role: contractor.jobRole,
        department: contractor.department,
        status: contractor.status !== null ? (contractor.status === true ? "active" : "terminated") : "",
        category: contractor.teamCategory,
        salary: contractor.salary,
        signBonus: contractor.signBonus,
        location: contractor.country,
        payrollMethod: contractor.payrollMethod,
        phoneNumber: contractor.phone,
      }));
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: convertedContractors });
      dispatch({ type: actionTypes.SET_DATA, payload: convertedContractors });
      dispatch({ type: actionTypes.SET_DATA_IN_USE, payload: convertedContractors });
      dispatch({ type: actionTypes.SET_SELECTED_CONTRACTOR, payload: convertedContractors[0] });
    }
  }, [contractors]);
  console.log(selectedContractor);
  useEffect(() => {
    if (data) {
      const searchData = data?.filter((data: any) =>
        data?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      if (activeContractorsOnly) {
        const activeData = searchData.filter((data: any) => data?.status === "active");
        dispatch({ type: actionTypes.SET_DATA_IN_USE, payload: activeData });
      } else {
        dispatch({ type: actionTypes.SET_DATA_IN_USE, payload: searchData });
      }
    }
  }, [searchTerm, activeContractorsOnly, data]);

  useEffect(() => {
    if (addContractorSuccessModalIsOpen) {
      refetch();
    }
  }, [addContractorSuccessModalIsOpen, refetch]);

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
    total: dataInUse?.length,
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

  return (
    <>
      <ViewLayout title="Contractors">
        <HStack gap="4" alignItems="flex-start">
          <Stack borderRadius="15px" border="1px solid" borderColor="bordergrey" p="4" bg="white" w="70%">
            <Text fontWeight="bold" fontSize="18px" mb="4">
              Contractors
            </Text>

            <HStack justifyContent="space-between">
              <Button
                variant="darkBtn"
                rightIcon={<PlusIcon />}
                iconSpacing="3"
                onClick={openAddContractorModal}>
                Add Contractor
              </Button>
              <Stack spacing="0" alignItems="flex-end">
                <Text fontWeight="bold" fontSize="20px">
                  {dataInUse?.length}
                </Text>
                <Text fontWeight="light" fontSize="xs">
                  Contractor(s)
                </Text>
              </Stack>
            </HStack>

            {isLoading && isFetching ? (
              <TablePulse />
            ) : (
              <>
                {data ? (
                  <>
                    <HStack justifyContent="space-between" pt="2">
                      <HStack gap="1">
                        <FiSearch fontSize="24px" />
                        <Input
                          variant="unctyled"
                          border="0"
                          borderBottom="1px solid"
                          borderRadius={0}
                          px="0"
                          py="1"
                          h="40px"
                          w={{ base: "auto", lg: "250px" }}
                          fontSize="sm"
                          placeholder="Search Contractor"
                          value={searchTerm}
                          onChange={(e) =>
                            dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: e.target.value })
                          }
                        />
                      </HStack>
                      <HStack gap="2" alignItems="center">
                        <Switch
                          size="sm"
                          colorScheme="black"
                          defaultChecked={activeContractorsOnly}
                          onChange={(e) =>
                            dispatch({
                              type: actionTypes.SET_ACTIVE_CONTRACTORS_ONLY,
                              payload: e.target.checked,
                            })
                          }
                        />
                        <Text fontWeight="semibold" fontSize="sm">
                          Active Contractors
                        </Text>
                      </HStack>
                    </HStack>

                    <TableContainer
                      pt="4"
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
                      <Table variant="unstyled">
                        <Thead>
                          <Tr>
                            <Th>Full Name</Th>
                            <Th>Category</Th>
                            <Th>Job Role</Th>
                            <Th>Department</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {dataInUse &&
                            dataInUse?.length > 0 &&
                            dataInUse
                              ?.slice(pageSize * currentPage - pageSize, pageSize * currentPage)
                              .map((data: any, index: any) => (
                                <Tr
                                  fontWeight={data.id === selectedContractor.id ? "bold" : "normal"}
                                  textTransform="capitalize"
                                  cursor="pointer"
                                  key={index}
                                  onClick={() =>
                                    dispatch({ type: actionTypes.SET_SELECTED_CONTRACTOR, payload: data })
                                  }
                                  borderBottom="1px solid"
                                  borderColor="bordergrey">
                                  <Td>
                                    <HStack>
                                      <Avatar
                                        size="sm"
                                        src={data?.imgURL}
                                        name={data?.name}
                                        opacity={data?.status !== "active" ? "35%" : ""}
                                      />
                                      <Text color={data?.status !== "active" ? "#FF951C" : ""}>
                                        {data?.name}
                                      </Text>
                                    </HStack>
                                  </Td>
                                  <Td
                                    textTransform="lowercase"
                                    opacity={data?.status !== "active" ? "35%" : ""}>
                                    {data?.category}
                                  </Td>
                                  <Td opacity={data?.status !== "active" ? "35%" : ""}>{data?.role}</Td>
                                  <Td opacity={data?.status !== "active" ? "35%" : ""}>{data?.department}</Td>
                                  <Td opacity={data?.status !== "active" ? "35%" : ""}>{data?.status}</Td>
                                </Tr>
                              ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <Center w="100%" p="8" flexDirection="column">
                    <EmptyContractorImage />
                    <Text pr="12" pt="2">
                      No Contractor
                    </Text>
                  </Center>
                )}
              </>
            )}

            {dataInUse && dataInUse?.length > 0 && (
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                isDisabled={isDisabled}
                onPageChange={handlePageChange}>
                <PaginationContainer align="center" justify="space-between" py={2} w="full">
                  <PaginationPrevious
                    variant="outline"
                    h="40px"
                    px="12px"
                    leftIcon={<FiArrowLeft />}
                    iconSpacing={3}
                    border="1px solid #D0D5DD"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)">
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
                    variant="outline"
                    h="40px"
                    px="12px"
                    rightIcon={<FiArrowRight />}
                    iconSpacing={3}
                    border="1px solid #D0D5DD"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)">
                    <Text>Next</Text>
                  </PaginationNext>
                </PaginationContainer>
              </Pagination>
            )}

            {searchTerm && (!dataInUse || dataInUse?.length === 0) && (
              <Center w="100%" p="8" flexDirection="column">
                <EmptyContractorImage />
                <Text pr="12" pt="2">
                  No Contractor
                </Text>
              </Center>
            )}
          </Stack>
          {selectedContractor ? (
            <Flex
              flexDirection="column"
              borderRadius="15px"
              border="1px solid"
              borderColor="bordergrey"
              p="4"
              bg="white"
              flex="1"
              marginInlineStart="0">
              <Text fontWeight="bold" fontSize="18px" mb="4">
                Contractor Details
              </Text>
              <Stack fontSize="sm" textTransform="capitalize" spacing="4">
                <Avatar size="md" name={selectedContractor?.name} src={selectedContractor?.imgURL} />
                <Stack spacing={0} marginTop="0">
                  <Text fontWeight="semibold">Full Name</Text>
                  <Text overflowWrap="break-word">{selectedContractor?.name}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Email Address</Text>
                  <Text textTransform="lowercase" overflowWrap="anywhere">
                    {selectedContractor?.email}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Phone Number</Text>
                  <Text>
                    {selectedContractor?.phoneNumber === null ? "Nill" : `${selectedContractor?.phoneNumber}`}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text textTransform="lowercase" fontWeight="semibold">
                    Category
                  </Text>
                  <Text overflowWrap="break-word">{selectedContractor?.category}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Status</Text>
                  <Text overflowWrap="break-word">{selectedContractor?.status}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Department</Text>
                  <Text overflowWrap="break-word">{selectedContractor?.department}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Job Role</Text>
                  <Text overflowWrap="break-word">{selectedContractor?.role}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Gross Salary</Text>
                  <Text overflowWrap="break-word">{selectedContractor?.salary}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Location</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.location === null ? "Nill" : `${selectedContractor?.location}`}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Payment Method</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.paymentMethod ? `${selectedContractor?.paymentMethod}` : "Nill"}
                  </Text>
                </Stack>
              </Stack>
              <Button
                variant="darkBtn"
                w="100%"
                mt="10"
                py="15px"
                onClick={() =>
                  router.push({
                    pathname: `/contractors/${selectedContractor.id}`,
                    query: { id: selectedContractor.name },
                  })
                }>
                Manage Contractor
              </Button>
            </Flex>
          ) : (
            <Flex
              flexDirection="column"
              borderRadius="15px"
              border="1px solid"
              borderColor="bordergrey"
              p="4"
              bg="white"
              flex="1"
              marginInlineStart="0">
              <Center w="100%" flexDirection="column">
                <Text fontWeight="bold" fontSize="18px" mb="4">
                  Contractor Details
                </Text>
                <EmptyContractorImage />
                <Text pt="2">No currrent selected Contractor</Text>
              </Center>
            </Flex>
          )}
        </HStack>
      </ViewLayout>

      <AddContractor
        closeAddContractorModal={closeAddContractorModal}
        addContractorModalIsOpen={addContractorModalIsOpen}
        openAddContractorSuccessModal={openAddContractorSuccessModal}
      />

      <Modal
        onClose={closeAddContractorSuccessModal}
        isOpen={addContractorSuccessModalIsOpen}
        isCentered
        size="sm">
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalBody>
            <Stack alignItems="center" justifyContent="center" p="4" textAlign="center">
              <Text fontWeight="bold" fontSize="18px">
                You’ve successfully added an contractor to the team member
              </Text>
              <Image src="/addEmployeeSuccess.png" alt="" w="40" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Contractors;
