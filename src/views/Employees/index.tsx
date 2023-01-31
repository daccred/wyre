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
import ViewLayout from "../../components/core/ViewLayout";
import { FiSearch, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { EmptyEmployeeImage, PlusIcon } from "./ProviderIcons";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator
} from "@ajna/pagination";
import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";

const Employees = () => {

  const { isOpen:addEmployeeModalIsOpen, onOpen:openAddEmployeeModal, onClose:closeAddEmployeeModal } = useDisclosure()
  const { isOpen:addEmployeeSuccessModalIsOpen, onOpen:openAddEmployeeSuccessModal, onClose:closeAddEmployeeSuccessModal } = useDisclosure()

  const [dummyData, setDummyData]= useState<{[key: string]: string}[]>([])
  const [dummyDataInUse, setDummyDataInUse]= useState<{[key: string]: string}[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const [activeEmployeesOnly, setActiveEmployeesOnly] = useState(true)

  const [dummyEmployee, setDummyEmployee]= useState<{[key: string]: string}>()


  // search and active employees switch function
  useEffect(()=>{
    if(searchTerm){
      const searchData = dummyData?.filter(data=>data?.fullName?.toLowerCase().includes(searchTerm?.toLowerCase()))
      if (activeEmployeesOnly){
        const activeData= searchData.filter(data=>data?.status==='active')
        setDummyDataInUse(activeData);
        return
      }else{
        setDummyDataInUse(searchData);
        return
      }
    }

    if(!searchTerm){
      if (activeEmployeesOnly){
        const activeData= dummyData.filter(data=>data?.status==='active')
        setDummyDataInUse(activeData);
        return
      }
    }

    setDummyDataInUse(dummyData)
    
  },[activeEmployeesOnly, searchTerm, dummyData])
  

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
       inner: innerLimit
     },
     initialState: {
       pageSize: 10,
       isDisabled: false,
       currentPage: 1
     }
   });

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
  };

  // pagination functions end

  useEffect(()=>{
    // let v=[]
    // for(let i=0; i<24; i++){
    //   v.push({
    //     fullName:'john doe',
    //     category:'employee',
    //     jobRole:'fullstack developer',
    //     department:'engineering',
    //     status:'active',
    //     imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
    //   })
    // }
    // setDummyData(v)
    setDummyData(
      [
        {
          fullName:'john doe',
          category:'employee',
          jobRole:'fullstack developer',
          department:'engineering',
          status:'inactive',
          imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        },
        {
          fullName:'joan doe',
          category:'employee',
          jobRole:'fullstack developer',
          department:'engineering',
          status:'active',
          imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        },
        {
          fullName:'james doe',
          category:'employee',
          jobRole:'fullstack developer',
          department:'engineering',
          status:'active',
          imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        }
      ]
    )
    setDummyDataInUse(
      [
        {
          fullName:'john doe',
          category:'employee',
          jobRole:'fullstack developer',
          department:'engineering',
          status:'inactive',
          imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        },
        {
          fullName:'joan doe',
          category:'employee',
          jobRole:'fullstack developer',
          department:'engineering',
          status:'active',
          imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        },
        {
          fullName:'james doe',
          category:'employee',
          jobRole:'fullstack developer',
          department:'engineering',
          status:'active',
          imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        }
      ]
    )
  },[])

  useEffect(()=>{
    setDummyEmployee(
      {
        fullName:'john doe',
        category:'employee',
        jobRole:'fullstack developer',
        department:'engineering',
        status:'active',
        imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
        email:'Kelechi.Iheanacho@company.com',
        phoneNumber:'(+44) 800 829 7600',
        grossSalary:'$4,500',
        location:'Bay Area, California, USA',
        paymentMethod:'75% USD, 15% BTC, 10 ETH'
      }
    )
  },[])

  
  return (
    <>
      <ViewLayout title="Employees">
        <HStack gap="4" alignItems={"flex-start"}>
          <Stack borderRadius={"15px"} border={"1px solid"} borderColor="bordergrey" p='4' bg={'white'} w='70%'>
            
            <Text fontWeight="bold" fontSize="18px" mb="4" >Employees</Text>

            <HStack justifyContent={"space-between"} >
              <Button variant={"darkBtn"} rightIcon={<PlusIcon/>} iconSpacing="3" onClick={openAddEmployeeModal} >Add Employee</Button>
              <Stack spacing={"0"} alignItems="flex-end">
                <Text fontWeight="bold" fontSize="20px">{dummyDataInUse?.length}</Text>
                <Text fontWeight={"light"} fontSize="xs" >Employee(s)</Text>
              </Stack>
            </HStack>

            {dummyData && dummyData?.length>0 &&
            <HStack justifyContent={"space-between"} pt="2">
              <HStack gap="1">
                <FiSearch fontSize={"24px"}/>
                <Input variant={"unstyled"} border={"0"} borderBottom="1px solid" borderRadius={0} px="0" py="1" h="40px" w={{base:"auto", lg:"250px"}} fontSize={"sm"} placeholder="Search Employee"
                value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
                />
              </HStack>
              <HStack gap={"2"} alignItems="center">
                <Switch size='sm' colorScheme={"black"} defaultChecked onChange={e=>setActiveEmployeesOnly(e?.target?.checked)} />
                <Text  fontWeight={"semibold"} fontSize="sm">Active Employees</Text>
              </HStack>
            </HStack>}

            {dummyData && dummyData?.length>0 &&
            <TableContainer pt="4"
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
                backgroundClip: "content-box"
              },
            }}
            >
              <Table variant='simple'>
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
                  {dummyDataInUse && dummyDataInUse?.length>0 && dummyDataInUse?.slice(((pageSize * currentPage)-pageSize),(pageSize * currentPage)).map((data, index)=>(
                    <Tr textTransform={"capitalize"} key={index} >
                      <Td>
                        <HStack>
                        <Avatar
                          size={"sm"}
                          src={data?.imgURL}
                          opacity={data?.status!=='active'?"35%":''}
                        />
                        <Text color={data?.status!=='active'?"#FF951C":''} >{data?.fullName}</Text>
                        </HStack>
                      </Td>
                      <Td opacity={data?.status!=='active'?"35%":''}>{data?.category}</Td>
                      <Td opacity={data?.status!=='active'?"35%":''}>{data?.jobRole}</Td>
                      <Td opacity={data?.status!=='active'?"35%":''}>{data?.department}</Td>
                      <Td opacity={data?.status!=='active'?"35%":''}>{data?.status}</Td>
                    </Tr>
                  ))
                  }                  
                </Tbody>
               
              </Table>
            </TableContainer>}

            {dummyDataInUse && dummyDataInUse?.length>0 &&
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
                  leftIcon={<FiArrowLeft/>}
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
                      fontWeight='bold'
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
                rightIcon={<FiArrowRight/>}
                iconSpacing={3}
                border={"1px solid #D0D5DD"}
                borderRadius="8px"
                boxShadow={"0px 1px 2px rgba(16, 24, 40, 0.05)"}
                >
                  <Text>Next</Text>
                </PaginationNext>
              </PaginationContainer>
            </Pagination>}
            
            {
              (!dummyDataInUse || dummyDataInUse?.length===0) &&
              <Center w="100%" p="8" flexDirection={"column"}>
                <EmptyEmployeeImage/>
                <Text pr="12" pt="2">No Employee</Text>
              </Center>
            }

          </Stack>
          {dummyEmployee &&
          <Flex flexDirection={"column"} borderRadius={"15px"} border={"1px solid"} borderColor="bordergrey" p='4' bg={'white'} flex="1" marginInlineStart="0" >
            <Text fontWeight="bold" fontSize="18px" mb="4" >Employee Details</Text>
            <Stack fontSize="sm" textTransform={"capitalize"} spacing={"4"} >
              <Avatar
                size={"md"}
                src={dummyEmployee?.imgURL}
              />
              <Stack spacing={0} marginTop="0">
                <Text fontWeight={"semibold"}>Full Name</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.fullName}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Email Address</Text>
                <Text textTransform={"lowercase"} overflowWrap="anywhere" >{dummyEmployee?.email}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Phone Number</Text>
                <Text>{dummyEmployee?.phoneNumber}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Category</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.category}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Status</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.status}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Department</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.department}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Job Role</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.jobRole}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Gross Salary</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.grossSalary}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Location</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.location}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Payment Method</Text>
                <Text overflowWrap="break-word">{dummyEmployee?.paymentMethod}</Text>
              </Stack>
            </Stack>
            <Button variant={"darkBtn"} w="100%" mt="10" py="15px" >Manage Employee</Button>
          </Flex>
          }
        </HStack>
        
      </ViewLayout>

      <AddEmployee 
        closeAddEmployeeModal={closeAddEmployeeModal} 
        addEmployeeModalIsOpen={addEmployeeModalIsOpen} 
        openAddEmployeeSuccessModal={openAddEmployeeSuccessModal} 
      />

      <Modal onClose={closeAddEmployeeSuccessModal} isOpen={addEmployeeSuccessModalIsOpen} isCentered size={"sm"}>
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalBody>
            <Stack alignItems={"center"} justifyContent="center" p="4" textAlign="center">
              <Text fontWeight="bold" fontSize="18px">You’ve successfully added an employee to the team member</Text>
              <Image src="/addEmployeeSuccess.png" alt='' w="40" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Employees;
