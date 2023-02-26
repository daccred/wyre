import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Grid,
	Icon,
	HStack,
	Stack,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Link,
	TableContainer,
	Table,
	Td,
	Tbody,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react';
import { ArrowRightIcon, CalenderIcon, TeamIcon } from './ProviderIcons';
import { FormSelect } from '../../components';


type Props = {}

const Preview = (props: Props) => {
	const [dummyData, setDummyData]= useState<{[key: string]: string}[]>([]);
	const [payrollData, setPayrollData]= useState<{[key: string]: string}[]>([]);
	const [annualData, setAnnualData]= useState<{[key: string]: string}[]>([]);


	useEffect(()=>{
	
		setDummyData(
			[{
				currency: "Dollar (USD)",
				amount: "55232",
				team: "https://robohash.org/eiusquidemaut.png?size=50x50&set=set1",
				start_date: "1/31/2023",
				due_date: "4/12/2022"
			  }, {
				currency: "Naira (NGN)",
				amount: "8547030",
				team: "https://robohash.org/perferendisfugaodio.png?size=50x50&set=set1",
				start_date: "12/22/2022",
				due_date: "10/30/2022"
			  }, {
				currency: "Bitcoin (BTC)",
				amount: "0.0335",
				team: "https://robohash.org/estetid.png?size=50x50&set=set1",
				start_date: "12/15/2022",
				due_date: "2/19/2023"
			  }, {
				currency: "Cedis (GHC)",
				amount: "76349",
				team: "https://robohash.org/verobeataedolorem.png?size=50x50&set=set1",
				start_date: "8/14/2022",
				due_date: "12/18/2022"
			  }]
		)
			  
		setPayrollData(
			[{
				desc: "Monthly Salary for December",
				paid_at: "1/31/2023",
				status: "on time"
			  }, {
				desc: "Contractor Payout for Q4 Mile...",
				start_date: "12/22/2022",
				status: "-"
			  }, {
				desc: "Monthly Salary for November",
				paid_at: "12/15/2022",
				status: "on time"
			  }, {
				desc: "Monthly Salary for October",
				paid_at: "8/14/2022",
				status: "Early"
			  }]
		);
		setAnnualData(
			 [
				{
				  label: "Salary",
				  percentage: '63',
				  color: "green",
				  amount: "135,693.52"
				},
				{
				  label: "Tax",
				  percentage: '24',
				  color: "red",
				  amount: "51,692.77"
				},
				{
				  label: "Insurance",
				  percentage: '3',
				  color: "yellow",
				  amount: "6,526.21"
				},
				{
				  label: "Pension",
				  percentage: '10',
				  color: "purple",
				  amount: "21,538.66"
				}
			  ]
		)
		
	  },[])

	  const formateDate = (value: string | undefined) => {
		if (value === undefined) {
		  return ''; 
		  // or any other default value for undefined input
		}
		const date = new Date(value);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	  }

  return (
	<>

	<Grid
		templateColumns={{ sm: '1fr', lg: '1.3fr 1.7fr' }}
		maxW={{ sm: '100%', md: '100%' }}
		gap='20px'
		>
			{/* Payroll History */}
		<Box bg="white" rounded="2xl" overflowX={{ sm: 'scroll', xl: 'hidden' }}>
				<Flex direction='row' justify='space-between' align='center' p={4}>
					<Text fontSize='lg' fontWeight='bold'>
						Payroll History
					</Text>
					<Flex justify={'center'} align='center'>
						<Text fontSize='sm' color='purple.600' fontWeight='normal'>
							See More
						</Text>
						<Icon as={ArrowRightIcon} w={3} h={3} ml='3' />
					</Flex>
				</Flex>
				{payrollData && payrollData?.length>0 ?
					<TableContainer
						css={{
							"&::-webkit-scrollbar": {
							height: "10px",
							background: "transparent",
							},
							"&::-webkit-scrollbar-track": {
							background: "transparent",
							},
							"&::-webkit-scrollbar-thumb": {
							backgroundColor: "#d6dee1",
							borderRadius: "10px",
							border: "1px solid transparent",
							},
						}}
					>
						<Table size='sm' variant="unstyled">
						<Thead>
							<Tr>
							<Th>Payroll Description</Th>
							<Th>Paid At</Th>
							<Th>Status</Th>
							</Tr>
						</Thead>
						<Tbody>
							{payrollData.map((data, index) =>(
							<Tr textTransform={"capitalize"} key={index} >
								<Td fontSize='xs' >{data?.desc}</Td>
								<Td fontSize='xs'>{formateDate(data?.paid_at)}</Td>
								<Td fontSize='xs' fontWeight="semibold" color={data?.status === 'on time' ? "#FF951C" : ''}>
									{data?.status}
								</Td>
							</Tr>
							))
							}                  
						</Tbody>
						
						</Table>
				</TableContainer>
				:
				<Text>No Data Found</Text>
				}
		</Box>

		{/* Currency Breakdown */}
		<Box bg="white" rounded="2xl" overflowX={{ sm: 'scroll', xl: 'hidden' }}>
				<Flex direction='column' w='100%' p={4}>
					
					<Flex direction='row' justify='space-between' align='center'>
						<Text fontSize='lg' fontWeight='bold'>
							Currency Breakdown
						</Text>
						<Link href='/payroll' style={{ textDecoration: 'none' }}>
							<Flex 
								align="center"
                				justify='center'
							>
							<Text fontSize='sm' color='purple.600' fontWeight='normal'>
								See More
							</Text>
							<Icon as={ArrowRightIcon} w={3} h={3} ml='3' />
							</Flex>
						</Link>
					</Flex>
					
				</Flex>
				{dummyData && dummyData?.length>0 ?
					<TableContainer
						css={{
							"&::-webkit-scrollbar": {
							height: "10px",
							background: "transparent",
							},
							"&::-webkit-scrollbar-track": {
							background: "transparent",
							},
							"&::-webkit-scrollbar-thumb": {
							backgroundColor: "#d6dee1",
							borderRadius: "20px",
							border: "6px solid transparent",
							},
						}}
					>
						<Table size='sm' variant="unstyled" >
						<Thead >
							<Tr>
							<Th>Currency</Th>
							<Th>Amount</Th>
							<Th>Team</Th>
							<Th>Start Date</Th>
							<Th>Due Date</Th>
							</Tr>
						</Thead>
						<Tbody>
							{dummyData.map((data, index) =>(
							<Tr textTransform={"capitalize"} key={index} >
								
								<Td fontSize='xs'>{data?.currency}</Td>
								<Td fontSize='xs' isNumeric>{data?.amount}</Td>
								<Td>
								<HStack>
									<Avatar
										size={"sm"}
										src={data?.team}
									 
									/>
								</HStack>
								</Td>
								<Td fontSize='xs'>{formateDate(data?.start_date)}</Td>
								<Td fontSize='xs'>{formateDate(data?.due_date)}</Td>
							</Tr>
							))
							}                  
						</Tbody>
						
						</Table>
				</TableContainer>
				:
				<Text>No data found</Text>
				}
			</Box>
	</Grid>
	
    <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap='20px'>
				
		<Box gridArea={{ md: '2 / 1 / 3 / 2', '2xl': 'auto' }} bg='white' rounded="2xl" p="3" w={'full'}>
			<Flex direction='row' justify='space-between' align='center'>
				<Flex direction='column'>
					<Text fontSize='lg' fontWeight='bold' mb={3}>
						Team Members
					</Text>
					<Text fontSize={12}>
						You have 12 employees and 5 contractors on payroll
					</Text>
				</Flex>
				<Icon as={TeamIcon} w={10} h={6}/>
			</Flex>
		</Box>
		<Box gridArea={{ md: '2 / 2 / 3 / 3', '2xl': 'auto' }} bg="white" rounded="2xl" p="3" w={'full'}>
			<Flex direction='row' justify='space-between' align='center'>
				<Flex direction='column'>
					<Text fontSize='lg' fontWeight='bold' mb={3}>
						Upcoming Payroll
					</Text>
					<Text fontSize={12}>
						Your next payroll is USD 17,949.28 and due on Jan 28, 2023
					</Text>
				</Flex>
				<Icon as={CalenderIcon} w={10} h={8}/>
			</Flex>
		</Box>
	</Grid>
	
	{/*  */}

	<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '2fr 1fr' }} gap='20px'>
		{/* Payroll Summary */}
		<Box overflowX={{ sm: 'scroll', xl: 'hidden' }} bg="white" rounded="2xl" p={4}>
			<Box p=''>
				<Flex direction='row' justify='space-between' align='center'>
					<Text fontSize='lg' fontWeight='bold' pb='8px'>
						Projects
					</Text>
					<Flex justify={'center'} align='center'>
						<select name="" id="">
							<option value="2022">2022</option>
							<option value="2023">2023</option>
						</select>
					</Flex>
				</Flex>
			</Box>
			
		</Box>
		{/* Annual Payroll */}
		<Box  bg="white" rounded="2xl" p="4">
			<Box mb='20px'>
				<Flex direction='column' bg="#210D35" color="white" p={3} rounded="xl">
					<Flex direction='row' align='center' justify="space-between" rounded="lg">
						<Text fontSize='xs' fontWeight='bold'>
							Annual Payroll
						</Text>
						<Text fontSize='xs'>
							2022
						</Text>
					</Flex>
					<Flex direction='row' fontSize='16' fontWeight='bold'>
						USD <Text ml="2">{'215,386.55'}</Text>
					</Flex>
				</Flex>
			</Box>
			<Box>
				<Flex direction='column'>
					
					{
					annualData.map((data, index) => {
						return (
							<Flex flexDirection='row' align='center' justify='center' w='100%' fontSize='xs' py={2} key={index}>
								<Stat>
									<StatLabel fontSize='xs' fontWeight='bold' mb={0.5}>
										{data.label}
									</StatLabel>
									<Flex >
										<StatHelpText
											alignSelf='flex-end'
											justifySelf='flex-end'
											textTransform="uppercase"
											fontSize='xs'
											>
											usd
										</StatHelpText>
										<StatNumber fontSize='xs' ms={2}>
											{data.amount}
										</StatNumber>
									</Flex>
								</Stat>
								<CircularProgress
									size={50}
									value={Number(data.percentage)}
									thickness={10}
									color={data.color}
									>
								<CircularProgressLabel color={data.color} fontWeight="bold">
									<Text>{data.percentage + "%"}</Text>
								</CircularProgressLabel>
							</CircularProgress>
							</Flex>
						)
					})} 
				</Flex>
			</Box>
		</Box>
	</Grid>
	
	</>
  )
}

export default Preview;