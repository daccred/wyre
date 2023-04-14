import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Header from '@wyrecc/components/core/Header';
import Transactions from './transaction';

interface CardData {
  balance: string;
  label: string;
}

const cardData: CardData[] = [
  {
    balance: 'USD 10,400.00',
    label: 'Gross Salary',
  },
];

const Card = () => {
  return (
    <Box p={8} bg="#210D35" rounded="15px" my={3}>
      <Text color="#FDFFFC">{cardData[0]?.label}</Text>
      <Text fontWeight="bold" color="#FDFFFC" fontSize="4xl">
        {cardData[0]?.balance}
      </Text>
    </Box>
  );
};

const Index = () => {
  return (
    <>
      <Header>
        <Box w="100%" my="5">
          <Text fontSize="3xl" fontWeight="bold" color="#210D35">
            Compensation
          </Text>
          <Card />
          <Transactions />
        </Box>
      </Header>
    </>
  );
};

export default Index;
