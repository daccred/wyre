import { Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import Header from '@wyrecc/components/core/Header';
import { ContractorIcon } from '@wyrecc/components/core/providerIcon';

const accountItems = [
  {
    name: 'Manage Profile',
    subText: 'Cursus diam amet non arcu in ultricies a fringilla',
    path: 'account/manage-profile',
  },
  {
    name: 'Contract Terms',
    subText: 'Cursus diam amet non arcu in ultricies a fringilla',
    path: 'account/contract-terms',
  },
  {
    name: 'Payment Method',
    subText: 'Cursus diam amet non arcu in ultricies a fringilla',
    path: 'account/payment-method',
  },
];

const View = () => {
  const router = useRouter();
  return (
    <Header>
      <VStack spacing={5}>
        {accountItems?.map((accountItem) => (
          <Flex
            key={accountItem?.name}
            justify="space-between"
            align="center"
            bg="#F7F7F7"
            p={2}
            rounded="md"
            cursor="pointer"
            width="100%"
            onClick={() => router.push(accountItem?.path)}>
            <Flex justify="space-between" align="center">
              <Icon as={ContractorIcon} boxSize={7} />
              <VStack align="left" spacing={0.5} ml={4}>
                <Heading as="h4" size="xs" fontSize="xl">
                  {accountItem?.name}
                </Heading>
                <Text color="lightgrey" fontSize="sm">
                  {accountItem?.subText}
                </Text>
              </VStack>
            </Flex>
            <Icon as={FiChevronRight} boxSize={7} />
          </Flex>
        ))}
      </VStack>
    </Header>
  );
};

export default View;
