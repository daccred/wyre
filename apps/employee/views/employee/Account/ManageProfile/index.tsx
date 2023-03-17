import { Flex, Heading, Link, Text, Icon, VStack } from "@chakra-ui/react";
import Header from "components/core/Header";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";

const View = () => {
  return (
    <Header>
      <VStack width="100%" align="left" spacing={6}>
        <Link href="/employee/account/" color="brand.700" fontWeight={700}>
          <Flex align="center">
            <Icon as={FiChevronLeft} />
            <Text ml={2}>Back</Text>
          </Flex>
        </Link>
        <Heading as="h4" size="xs" fontSize="xl">
          Manage Profile
        </Heading>
      </VStack>
    </Header>
  );
};

export default View;
