import Header from 'components/core/Header';
import React from 'react';
import {Box, Breadcrumb, Text, Flex, BreadcrumbLink, Icon, SimpleGrid  } from '@chakra-ui/react';
import { ArrowRightIcon, IndicatorIcon } from './providerIcon';
import { GoPrimitiveDot } from 'react-icons/go';


type Props = {
  
}

const Index = (props: Props) => {
  return (
    <>
      <Header/>
      <Box w={'100%'} maxW="442px" mx={'auto'} my="5">
        <Breadcrumb>
          <Flex alignItems={'center'}>
            <Icon as={ArrowRightIcon}/>
            <BreadcrumbLink mb={2} fontWeight="bold" color="#210D35" href='/employee/home'> Back</BreadcrumbLink>
          </Flex>
        </Breadcrumb>
        <Text fontSize={'20px'} fontWeight="bold" color="#210D35" my="4">
          Payslip Details
        </Text>
        <Box px={4} py={8} bg="#210D35" rounded="15px" my={3}>
          <Text color="#FDFFFC" fontWeight={'semibold'}>
          Monthly Salary for September
          </Text>
          <Flex
            color={'#FFFFFF'}
            fontSize={{ base: '12px', sm: '12px' }}
            alignItems="center"
            lineHeight={'13px'}
          >
            {'12:30 PM'} <Icon as={GoPrimitiveDot} color="#FFFFFF" w={4} h={4} mx={1} /> {'30 September, 2022'}
          </Flex>          
        </Box>
        <SimpleGrid spacing="5" templateRows={'auto'} templateColumns={'1fr 1fr'} w="100%" my={6}>
              <Box>
                <Text color='#010C14' fontSize='12px'>{'Gross Payment'}</Text>
                <Text fontSize="14px" color="#0AAF60">{'+ USD 4,500.00'}</Text>
              </Box>
              <Flex direction={'column'} alignItems="end">
                <Text color='#010C14' fontSize='12px' >{'Income Tax'}</Text>
                <Text fontSize="" color='#E71D36'>{'- USD 200.00'}</Text>
              </Flex>
              <Box >
                <Text color='#010C14' fontSize='12px'>{'Health Insurance'}</Text>
                <Text fontSize="" color='#E71D36'>{'- USD 500.00'}</Text>
              </Box>
              <Flex direction={'column'} alignItems="end">
                <Text color='#010C14' fontSize='12px'>{'Pension'}</Text>
                <Text fontSize="" color='#E71D36'>{'- USD 100.00'}</Text>
              </Flex>
          </SimpleGrid>
          <Flex bg={'#F7F7F7'} p="4" justifyContent={'space-between'} rounded="10px">
            <Text fontSize={'12px'}>Net Payment</Text>
            <Flex>
              <Icon  as={IndicatorIcon} w={5} h={5}/>
              <Text ml={1} fontWeight="bold">USD 4,150.00</Text>
            </Flex>
          </Flex>
      </Box>
    </>
  )
}

export default Index;