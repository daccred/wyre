import { Text, Icon, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import Header from "@wyrecc/components/core/Header";

import { MoneyBagIcon, PlusIcon } from "./providerIcon";
import RequestLog from "./requestLog";

const Index = () => {
  const router = useRouter();

  return (
    <Header>
      <Flex w="100%" direction="column">
        <Text fontSize="3xl" fontWeight="bold" color="#210D35" pb={4}>
          Get Reinbursed <Icon as={MoneyBagIcon} />
        </Text>
        <Button
          bg="primary.main"
          color="white"
          w="fit-content"
          _hover={{ bg: "" }}
          onClick={() =>
            router.push({
              pathname: `/employee/request/request-reimbursement`,
            })
          }>
          <Text>Reinbursement</Text>
          <Icon as={PlusIcon} />
        </Button>
      </Flex>
      <RequestLog />
    </Header>
  );
};

export default Index;
