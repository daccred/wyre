import {Box, Text } from '@chakra-ui/react';
import Header from 'components/core/Header';
import React from 'react'
import Transactions from './transaction';

interface StatData {
  balance: string;
  label: string;
}

const statData: StatData[] = [
  {
    balance: "USD 2,400.00",
    label: 'Gross Salary',
  }
];

const Card = () => {
  return (
    <Box p={8} bg="#210D35" rounded="15px" my={3}>
      <Text color="#FDFFFC">
        {statData[0]?.label}
      </Text>
      <Text fontWeight="bold" color="#FDFFFC" fontSize="4xl">{statData[0]?.balance}</Text>
    </Box>
  );
};


const Index = () => {
  return (
    <>
        <Header/>
        <Box w={'100%'} maxW="442px" mx={'auto'} my="5" >
            <Text fontSize={'3xl'} fontWeight="bold" color="#210D35">Compensation</Text>
            <Card/>
            <Transactions/>
        </Box>
    </>
  )
}

export default Index;