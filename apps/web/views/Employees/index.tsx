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
  useToast,
} from "@chakra-ui/react";
import useDebounce from "components/hooks/useDebounce";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";

import styledToast from "../../components/core/StyledToast";
import ViewLayout from "../../components/core/ViewLayout";
import { trpc } from "../../utils/trpc";
import TablePulse from "../TablePulse";
import AddEmployee from "./AddEmployee";
import { EmptyEmployeeImage, PlusIcon } from "./ProviderIcons";

const initialState = {
  employees: [],
  data: [],
  dataInUse: [],
  selectedEmployee: undefined,
  searchTerm: "",
  activeEmployeesOnly: true,
  isLoading: false,
  error: null,
};

const actionTypes = {
  FETCH_DATA: "FETCH_DATA",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SET_DATA: "SET_DATA",
  SET_DATA_IN_USE: "SET_DATA_IN_USE",
  SET_SELECTED_EMPLOYEE: "SET_SELECTED_EMPLOYEE",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_ACTIVE_EMPLOYEES_ONLY: "SET_ACTIVE_EMPLOYEES_ONLY",
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
        employees: action.payload,
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
    case actionTypes.SET_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload,
      };
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actionTypes.SET_ACTIVE_EMPLOYEES_ONLY:
      return {
        ...state,
        activeEmployeesOnly: action.payload,
      };
    default:
      return state;
  }
};

const Employees = () => {
  // const { data: employees } = trpc.team.getPersonnel.useQuery();
  const toast = useToast();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, dataInUse, selectedEmployee, searchTerm, activeEmployeesOnly } = state;
  const { data: employees, error, isLoading, refetch, isFetching } = trpc.team.getPersonnel.useQuery();

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_DATA, payload: isLoading });
  }, [isLoading]);

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ERROR, payload: error });
  }, [error]);

  useEffect(() => {
    if (state.error) {
      styledToast({
        status: "error",
        description: `${state.error}`,
        toast: toast,
      });
    }
  }, [toast, state.error]);

  useEffect(() => {
    if (employees) {
      const convertedEmployees = employees.map((employee: any) => ({
        id: employee.id.toString(),
        name: employee.firstName,
        email: employee.email,
        role: employee.jobRole,
        department: employee.department,
        status: employee.status !== null ? (employee.status === true ? "active" : "terminated") : "",
        category: employee.teamCategory,
        salary: employee.salary,
        signBonus: employee.signBonus,
        location: employee.country,
        payrollMethod: employee.payrollMethod,
        phoneNumber: employee.phone,
      }));
      // console.log(convertedEmployees);
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: convertedEmployees });
      dispatch({ type: actionTypes.SET_DATA, payload: convertedEmployees });
      dispatch({ type: actionTypes.SET_DATA_IN_USE, payload: convertedEmployees });
      dispatch({ type: actionTypes.SET_SELECTED_EMPLOYEE, payload: convertedEmployees[0] });
    }
  }, [employees]);
  // The useDebounce hook is being used to debounce the searchTerm value. which means that there will be a delay of 500 milliseconds before the search term is updated.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (data) {
      const searchData = data?.filter((employee: any) =>
        employee?.name?.toLowerCase().includes(debouncedSearchTerm?.toLowerCase())
      );
      if (activeEmployeesOnly) {
        const activeData = searchData.filter((employee: any) => employee?.status === "active");
        dispatch({ type: actionTypes.SET_DATA_IN_USE, payload: activeData });
      } else {
        dispatch({ type: actionTypes.SET_DATA_IN_USE, payload: searchData });
      }
    }
  }, [debouncedSearchTerm, activeEmployeesOnly, data]);

  const {
    isOpen: addEmployeeModalIsOpen,
    onOpen: openAddEmployeeModal,
    onClose: closeAddEmployeeModal,
  } = useDisclosure();
  const {
    isOpen: addEmployeeSuccessModalIsOpen,
    onOpen: openAddEmployeeSuccessModal,
    onClose: closeAddEmployeeSuccessModal,
  } = useDisclosure();

  useEffect(() => {
    if (addEmployeeSuccessModalIsOpen) {
      refetch();
    }
  }, [addEmployeeSuccessModalIsOpen, refetch]);

  // pagination functions start
  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled, pageSize } = usePagination({
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

  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
  };
  return (
    <>
      <ViewLayout title="Employees">
        <HStack gap="4" alignItems="flex-start">
          <Stack borderRadius="15px" border="1px solid" borderColor="bordergrey" py="4" bg="white" w="70%">
            <Text fontWeight="bold" fontSize="18px" mb="4" px={4}>
              Employees
            </Text>
            <HStack justifyContent="space-between" px={4}>
              <Button
                variant="darkBtn"
                rightIcon={<PlusIcon />}
                iconSpacing="3"
                onClick={openAddEmployeeModal}>
                Add Employee
              </Button>
              <Stack spacing="0" alignItems="flex-end">
                <Text fontWeight="bold" fontSize="20px">
                  {dataInUse?.length}
                </Text>
                <Text fontWeight="light" fontSize="xs">
                  Employee(s)
                </Text>
              </Stack>
            </HStack>

            {isLoading && isFetching ? (
              <TablePulse />
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    <HStack justifyContent="space-between" pt="2" px={4}>
                      <HStack gap="1">
                        <FiSearch fontSize="24px" />
                        <Input
                          variant="unstyled"
                          border="0"
                          borderBottom="1px solid"
                          borderRadius={0}
                          px="0"
                          py="1"
                          h="40px"
                          w={{ base: "auto", lg: "250px" }}
                          fontSize="sm"
                          placeholder="Search Employee"
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
                          defaultChecked={activeEmployeesOnly}
                          onChange={(e) =>
                            dispatch({
                              type: actionTypes.SET_ACTIVE_EMPLOYEES_ONLY,
                              payload: e.target.checked,
                            })
                          }
                        />
                        <Text fontWeight="semibold" fontSize="sm">
                          Active Employees
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
                          {dataInUse?.length > 0 &&
                            dataInUse
                              ?.slice(pageSize * currentPage - pageSize, pageSize * currentPage)
                              .map((data: any, index: any) => (
                                <Tr
                                  fontWeight={data.id === selectedEmployee.id ? "bold" : "normal"}
                                  textTransform="capitalize"
                                  cursor="pointer"
                                  key={index}
                                  onClick={() =>
                                    dispatch({ type: actionTypes.SET_SELECTED_EMPLOYEE, payload: data })
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
                    <EmptyEmployeeImage />
                    <Text pr="12" pt="2">
                      No Employee
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
                <PaginationContainer align="center" justify="space-between" py={2} px={4} w="full">
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
                <EmptyEmployeeImage />
                <Text pr="12" pt="2">
                  No Employee
                </Text>
              </Center>
            )}
          </Stack>
          {selectedEmployee ? (
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
                Employee Details
              </Text>
              <Stack fontSize="sm" textTransform="capitalize" spacing="4">
                <Avatar size="lg" name={selectedEmployee?.name} src={selectedEmployee?.imgURL} />
                <Stack spacing={0} marginTop="0">
                  <Text fontWeight="semibold">Full Name</Text>
                  <Text overflowWrap="break-word">{selectedEmployee?.name}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Email Address</Text>
                  <Text textTransform="lowercase" overflowWrap="anywhere">
                    {selectedEmployee?.email}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Phone Number</Text>
                  <Text>
                    {selectedEmployee?.phoneNumber === null ? "Nill" : `${selectedEmployee?.phoneNumber}`}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Category</Text>
                  <Text textTransform="lowercase" overflowWrap="break-word">
                    {selectedEmployee?.category}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Status</Text>
                  <Text overflowWrap="break-word">{selectedEmployee?.status}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Department</Text>
                  <Text overflowWrap="break-word">{selectedEmployee?.department}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Job Role</Text>
                  <Text overflowWrap="break-word">{selectedEmployee?.role}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Gross Salary</Text>
                  <Text overflowWrap="break-word">{selectedEmployee?.salary}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Location</Text>
                  <Text overflowWrap="break-word">
                    {selectedEmployee?.location === null ? "Nill" : `${selectedEmployee?.location}`}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">Payment Method</Text>
                  <Text overflowWrap="break-word">
                    {selectedEmployee?.payrollMethod === null ? "Nill" : `${selectedEmployee?.payrollMethod}`}
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
                    pathname: `/employees/${selectedEmployee.id}`,
                    query: { id: selectedEmployee.name },
                  })
                }>
                Manage Employee
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
                  Employee Details
                </Text>
                <EmptyEmployeeImage />
                <Text pt="2">No currrent selected Employee</Text>
              </Center>
            </Flex>
          )}
        </HStack>
      </ViewLayout>

      <AddEmployee
        closeAddEmployeeModal={closeAddEmployeeModal}
        addEmployeeModalIsOpen={addEmployeeModalIsOpen}
        openAddEmployeeSuccessModal={openAddEmployeeSuccessModal}
      />

      <Modal
        onClose={closeAddEmployeeSuccessModal}
        isOpen={addEmployeeSuccessModalIsOpen}
        isCentered
        size="sm">
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalBody>
            <Stack alignItems="center" justifyContent="center" p="4" textAlign="center">
              <Text fontWeight="bold" fontSize="18px">
                You’ve successfully added an employee to the team member
              </Text>
              <Image src="/addEmployeeSuccess.png" alt="" w="40" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Employees;
