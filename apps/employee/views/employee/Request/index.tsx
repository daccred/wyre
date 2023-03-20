import { Text, Icon, Button, Flex } from "@chakra-ui/react";
import Header from "components/core/Header";
import React from "react";

import { MoneyBagIcon, PlusIcon } from "./providerIcon";
import RequestLog from "./requestLog";

const Index = () => {
  return (
    <Header>
      <Flex w="100%" direction="column">
        <Text fontSize="3xl" fontWeight="bold" color="#210D35" pb={4}>
          Get Reinbursed <Icon as={MoneyBagIcon} />
        </Text>
        <Button bg="primary.main" color="white" w="fit-content" _hover={{ bg: "" }}>
          <Text>Reinbursement</Text>
          <Icon as={PlusIcon} />
        </Button>
      </Flex>
      <RequestLog />
    </Header>
  );
};

export default Index;
