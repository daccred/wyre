import {
  Flex,
  Heading,
  Link,
  Text,
  Icon,
  VStack,
  Button,
  Center,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { HiOutlinePlusSm } from 'react-icons/hi';

import Header from '@wyrecc/components/core/Header';
import { EmptyEmployeeImage } from '@wyrecc/components/core/providerIcon';

import PaymentMethodType from '../Modals/PaymentMethodType';

const View = () => {
  const selectedmethods = [
    {
      type: 'CryptoCurrency',
      name: 'Bitcoin (BTC)',
      address: 'ee816a1734d95bfe027a04fe4602a...',
      moneyInUSD: '1,800.00',
      salaryPercent: 75,
      icon: FaBitcoin,
      iconColor: '#f7931a',
    },
    {
      type: 'bank',
      name: 'Access Bank',
      accountNumber: '123456789321',
      accountType: 'Savings Account',
      moneyInUSD: '600.00',
      salaryPercent: 25,
    },
  ];
  const {
    isOpen: paymentMethodModalIsOpen,
    onOpen: openPaymentMethodModal,
    onClose: closePaymentMethodModal,
  } = useDisclosure();
  return (
    <Header>
      <VStack align="left" spacing={3}>
        <Link href="/employee/account/" color="brand.700" fontWeight={700}>
          <Flex align="center">
            <Icon as={FiChevronLeft} />
            <Text ml={2}>Back</Text>
          </Flex>
        </Link>
        <Heading as="h4" size="xs" fontSize="xl" color="brand.700">
          Payment Method
        </Heading>
        <Button
          bg="primary.500"
          color="white"
          _hover={{ hover: 'none' }}
          width="fit-content"
          rightIcon={<Icon as={HiOutlinePlusSm} color="white" />}
          onClick={() => openPaymentMethodModal()}>
          Add Payment Method
        </Button>
      </VStack>
      <VStack align="left" mt={16}>
        <Heading as="h4" size="xs" fontSize="xl" color="brand.700">
          Selected Method(s)
        </Heading>
        {selectedmethods?.length > 0 ? (
          <VStack spacing={5}>
            {selectedmethods?.map((method) => (
              <Flex
                key={method?.name}
                justify="space-between"
                align="center"
                bg="#F7F7F7"
                p={4}
                rounded="md"
                width="100%">
                <Flex justify="space-between" align="center">
                  {method?.icon ? (
                    <Icon as={method?.icon} color={method?.iconColor} boxSize={7} />
                  ) : (
                    <Avatar name={method?.name} size="sm" />
                  )}
                  <VStack align="left" spacing={0.5} ml={4}>
                    <Heading as="h4" size="xs" fontSize="xl">
                      {method?.name}
                    </Heading>
                    {method?.address ? (
                      <Text color="lightgrey" fontSize="sm">
                        {method?.address}
                      </Text>
                    ) : (
                      <Text color="lightgrey" fontSize="sm">
                        {method?.accountNumber} . {method?.accountType}
                      </Text>
                    )}
                  </VStack>
                </Flex>
                <VStack>
                  <Text fontWeight={700} color="brand.700" fontSize="xl">{`USD ${method?.moneyInUSD}`}</Text>
                  <Text color="#2EC4B6" fontSize="sm">
                    {`${method?.salaryPercent}% of payment`}{' '}
                  </Text>
                </VStack>
              </Flex>
            ))}
          </VStack>
        ) : (
          <Center w="100%" p="8" flexDirection="column">
            <EmptyEmployeeImage />
            <Text pr="12" pt={2}>
              No payment method added
            </Text>
          </Center>
        )}
      </VStack>
      <PaymentMethodType
        paymentMethodModalIsOpen={paymentMethodModalIsOpen}
        closePaymentMethodModal={closePaymentMethodModal}
      />
    </Header>
  );
};

export default View;
