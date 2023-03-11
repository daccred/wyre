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
  SkeletonText,
  SkeletonCircle
} from "@chakra-ui/react";
import ViewLayout from "../../components/core/ViewLayout";
import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { EmptyContractorImage, PlusIcon } from "./ProviderIcons";
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
import { useEffect, useState } from "react";
import AddContractor from "./AddContractor";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";
import useDebounce from "components/hooks/useDebounce";

const Contractors = () => {
  const router = useRouter();
  const { data: contractors } = trpc.employee.getContractors.useQuery();


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
  const [dummyData, setDummyData]= useState<{[key: string]: string}[]>([]);
  const [dummyDataInUse, setDummyDataInUse]= useState<{[key: string]: string}[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContractor, setSelectedContractor] = useState<{[key: string]: string}>();
  const debouncedFilterValue = useDebounce(searchTerm, 500);
  const [activeContractorsOnly, setActiveContractorsOnly] = useState(true);

  useEffect(()=>{
    if (contractors) {
      const convertedContractors = contractors.map((contractor:any) => ({
        id: contractor.id.toString(),
        name: contractor.name,
        email: contractor.email,
        role: contractor.jobRole,
        department: contractor.department,
        status: contractor.status !== null ? (contractor.status === true ? 'active' : 'terminated') : "",
        category: contractor.category,
        salary: contractor.salary,
        signBonus: contractor.signBonus,
      }));
      setDummyData(convertedContractors); 
      setDummyDataInUse(convertedContractors);
      setSelectedContractor(convertedContractors[0]); // Set the initial state for selectedcontractor to the first data in convertedcontractors
    }
},[contractors]);

  // search and active contractors switch function
  useEffect(() => {
    if (debouncedFilterValue) {
      const searchData = dummyData?.filter((data) =>
        data?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      if (activeContractorsOnly) {
        const activeData = searchData.filter(
          (data) => data?.status === "active"
        );
        setDummyDataInUse(activeData);
        return;
      } else {
        setDummyDataInUse(searchData);
        return;
      }
    }

    if (!debouncedFilterValue) {
      if (activeContractorsOnly) {
        const activeData = dummyData.filter(
          (data) => data?.status === "active"
        );
        setDummyDataInUse(activeData);
        return;
      }
    }

    setDummyDataInUse(dummyData);
  }, [activeContractorsOnly, searchTerm,debouncedFilterValue, dummyData]);

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

   return (
    <>
      <ViewLayout title="Contractors">
        <HStack gap="4" alignItems={"flex-start"}>
          <Stack
            borderRadius={"15px"}
            border={"1px solid"}
            borderColor="bordergrey"
            p="4"
            bg={"white"}
            w="70%"
          >
            <Text fontWeight="bold" fontSize="18px" mb="4">
              Contractors
            </Text>

            <HStack justifyContent={"space-between"}>
              <Button
                variant={"darkBtn"}
                rightIcon={<PlusIcon />}
                iconSpacing="3"
                onClick={openAddContractorModal}
              >
                Add Contractor
              </Button>
              <Stack spacing={"0"} alignItems="flex-end">
                <Text fontWeight="bold" fontSize="20px">
                  {dummyDataInUse?.length}
                </Text>
                <Text fontWeight={"light"} fontSize="xs">
                  Contractor(s)
                </Text>
              </Stack>
            </HStack>

            {dummyData && dummyData?.length > 0 && (
              <HStack justifyContent={"space-between"} pt="2">
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
                    placeholder="Search Contractor"
                    value={searchTerm}
                    defaultChecked
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </HStack>
                <HStack gap={"2"} alignItems="center">
                  <Switch
                    size="sm"
                    colorScheme={"black"}
                    defaultChecked
                    onChange={(e) =>
                      setActiveContractorsOnly(e?.target?.checked)
                    }
                  />
                  <Text fontWeight={"semibold"} fontSize="sm">
                    Active Contractors
                  </Text>
                </HStack>
              </HStack>
            )}

            {dummyData && dummyData?.length > 0 && (
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
                }}
              >
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
                    {dummyDataInUse &&
                      dummyDataInUse?.length > 0 &&
                      dummyDataInUse
                        ?.slice(
                          pageSize * currentPage - pageSize,
                          pageSize * currentPage
                        )
                        .map((data, index) => (
                          <Tr textTransform={"capitalize"} cursor={"pointer"}
                          key={index}
                          onClick={() => setSelectedContractor(data)}
                          borderBottom={"1px solid"} borderColor="bordergrey">
                            <Td>
                              <HStack>
                                <Avatar
                                  size={"sm"}
                                  src={data?.imgURL}
                                  name={data?.name}
                                  opacity={
                                    data?.status !== "active" ? "35%" : ""
                                  }
                                />
                                <Text
                                  color={
                                    data?.status !== "active" ? "#FF951C" : ""
                                  }
                                >
                                  {data?.name}
                                </Text>
                              </HStack>
                            </Td>
                            <Td textTransform={"lowercase"}
                              opacity={data?.status !== "active" ? "35%" : ""}
                            >
                              {data?.category}
                            </Td>
                            <Td
                              opacity={data?.status !== "active" ? "35%" : ""}
                            >
                              {data?.role}
                            </Td>
                            <Td
                              opacity={data?.status !== "active" ? "35%" : ""}
                            >
                              {data?.department}
                            </Td>
                            <Td
                              opacity={data?.status !== "active" ? "35%" : ""}
                            >
                              {data?.status}
                            </Td>
                          </Tr>
                        ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}

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
                  py={2}
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
                  No Contractor
                </Text>
              </Center>
            )}
          </Stack>
          {selectedContractor ? 
            <Flex
              flexDirection={"column"}
              borderRadius={"15px"}
              border={"1px solid"}
              borderColor="bordergrey"
              p="4"
              bg={"white"}
              flex="1"
              marginInlineStart="0"
            >
              <Text fontWeight="bold" fontSize="18px" mb="4">
                Contractor Details
              </Text>
              <Stack fontSize="sm" textTransform={"capitalize"} spacing={"4"}>
                <Avatar size={"md"} name={selectedContractor?.name} src={selectedContractor?.imgURL} />
                <Stack spacing={0} marginTop="0">
                  <Text fontWeight={"semibold"}>Full Name</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.name}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Email Address</Text>
                  <Text textTransform={"lowercase"} overflowWrap="anywhere">
                    {selectedContractor?.email}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Phone Number</Text>
                  <Text>{selectedContractor?.phoneNumber}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text textTransform={"lowercase"} fontWeight={"semibold"}>Category</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.category}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Status</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.status}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Department</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.department}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Job Role</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.role}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Gross Salary</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.salary}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Location</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.location}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontWeight={"semibold"}>Payment Method</Text>
                  <Text overflowWrap="break-word">
                    {selectedContractor?.paymentMethod}
                  </Text>
                </Stack>
              </Stack>
              <Button
                variant={"darkBtn"}
                w="100%"
                mt="10"
                py="15px"
                onClick={()=> router.push({pathname:`/contractors/${selectedContractor.id}`, query: { id: selectedContractor.name }})}
              >
                Manage Contractor
              </Button>
            </Flex>
            :
            <Flex flexDirection={"column"} borderRadius={"15px"} border={"1px solid"} borderColor="bordergrey" p='4' bg={'white'} flex="1" marginInlineStart="0">
              <SkeletonText my='4' noOfLines={1} spacing='4' skeletonHeight='4' />
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='3' />
              <SkeletonText mt='4' noOfLines={1} skeletonHeight='10' />
            </Flex>
            }
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
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalBody>
            <Stack
              alignItems={"center"}
              justifyContent="center"
              p="4"
              textAlign="center"
            >
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
