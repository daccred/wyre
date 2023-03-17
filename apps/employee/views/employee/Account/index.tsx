import { Box, Center, Container, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import Header from "components/core/Header";
import { ContractorIcon } from "components/core/providerIcon";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const accountItems = [
  {
    name: "Manage Profile",
    subText: "Cursus diam amet non arcu in ultricies a fringilla",
    path: "manage-profile",
  },
  {
    name: "Contract Terms",
    subText: "Cursus diam amet non arcu in ultricies a fringilla",
    path: "contract-terms",
  },
  {
    name: "Payment Method",
    subText: "Cursus diam amet non arcu in ultricies a fringilla",
    path: "manage-profile",
  },
  {
    name: "Complete KYC",
    subText: "Cursus diam amet non arcu in ultricies a fringilla",
    path: "complete-kyc",
  },
];

const View = () => {
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
            width="100%">
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
