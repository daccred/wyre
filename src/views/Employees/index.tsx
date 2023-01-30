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
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Avatar,
  Flex, 
} from "@chakra-ui/react";
import ViewLayout from "../../components/core/ViewLayout";
import { FiSearch } from 'react-icons/fi'
import { PlusIcon } from "./ProviderIcons";

const Employees = () => {

  const dummyData= [
    {
      fullName:'john doe',
      category:'employee',
      jobRole:'fullstack developer',
      department:'engineering',
      status:'active',
      imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
    },
    {
      fullName:'john doe',
      category:'employee',
      jobRole:'fullstack developer',
      department:'engineering',
      status:'active',
      imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
    },
    {
      fullName:'john doe',
      category:'employee',
      jobRole:'fullstack developer',
      department:'engineering',
      status:'active',
      imgURL:"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
    }
  ]

  const dummyEmployee={
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

  
  return (
    <>
      <ViewLayout title="Employees">
        <HStack gap="4" alignItems={"flex-start"}>
          <Stack borderRadius={"15px"} border={"1px solid"} borderColor="bordergrey" p='4' bg={'white'} w='70%'>
            <Text fontWeight="bold" fontSize="18px" mb="4" >Employees</Text>
            <HStack justifyContent={"space-between"} >
              <Button variant={"darkBtn"} rightIcon={<PlusIcon/>} iconSpacing="3" >Add Employee</Button>
              <Stack spacing={"0"} alignItems="flex-end">
                <Text fontWeight="bold" fontSize="20px">12</Text>
                <Text fontWeight={"light"} fontSize="xs" >Employee(s)</Text>
              </Stack>
            </HStack>
            <HStack justifyContent={"space-between"} pt="2">
              <HStack gap="1">
                <FiSearch fontSize={"24px"}/>
                <Input variant={"unstyled"} border={"0"} borderBottom="1px solid" borderRadius={0} px="0" py="1" h="40px" w="250px" fontSize={"sm"} placeholder="Search Employee" />
              </HStack>
              <HStack gap={"2"} alignItems="center">
                <Switch size='sm' colorScheme={"black"} />
                <Text  fontWeight={"semibold"} fontSize="sm">Active Employees</Text>
              </HStack>
            </HStack>
            <TableContainer py="4"
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
                  {dummyData && dummyData?.length>0 && dummyData?.map(data=>(
                    <Tr textTransform={"capitalize"} >
                      <Td>
                        <HStack>
                        <Avatar
                          size={"sm"}
                          src={data?.imgURL}
                        />
                        <Text>{data?.fullName}</Text>
                        </HStack>
                      </Td>
                      <Td>{data?.category}</Td>
                      <Td>{data?.jobRole}</Td>
                      <Td>{data?.department}</Td>
                      <Td>{data?.status}</Td>
                    </Tr>
                  ))
                  }
                  
                </Tbody>
               
              </Table>
            </TableContainer>
          </Stack>
          <Flex flexDirection={"column"} borderRadius={"15px"} border={"1px solid"} borderColor="bordergrey" p='4' bg={'white'} flex="1" marginInlineStart="0" >
            <Text fontWeight="bold" fontSize="18px" mb="4" >Employee Details</Text>
            <Stack fontSize="sm" textTransform={"capitalize"} spacing={"4"} >
              <Avatar
                size={"md"}
                src={dummyEmployee?.imgURL}
              />
              <Stack spacing={0} marginTop="0">
                <Text fontWeight={"semibold"}>Full Name</Text>
                <Text overflowWrap="break-word">{dummyEmployee.fullName}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Email Address</Text>
                <Text textTransform={"lowercase"} overflowWrap="anywhere" >{dummyEmployee.email}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Phone Number</Text>
                <Text>{dummyEmployee.phoneNumber}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Category</Text>
                <Text overflowWrap="break-word">{dummyEmployee.category}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Status</Text>
                <Text overflowWrap="break-word">{dummyEmployee.status}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Department</Text>
                <Text overflowWrap="break-word">{dummyEmployee.department}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Job Role</Text>
                <Text overflowWrap="break-word">{dummyEmployee.jobRole}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Gross Salary</Text>
                <Text overflowWrap="break-word">{dummyEmployee.grossSalary}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Location</Text>
                <Text overflowWrap="break-word">{dummyEmployee.location}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={"semibold"}>Payment Method</Text>
                <Text overflowWrap="break-word">{dummyEmployee.paymentMethod}</Text>
              </Stack>
            </Stack>
            <Button variant={"darkBtn"} w="100%" mt="10" py="15px" >Manage Employee</Button>
          </Flex>
        </HStack>
        
      </ViewLayout>
    </>
  );
};

export default Employees;
