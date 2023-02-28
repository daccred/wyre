import React from 'react';
import ViewLayout from "../../components/core/ViewLayout";
import {
  Button,
  HStack,
  Stack,
  Text,
  Avatar,
  Flex,
  Center,
  Image,
} from "@chakra-ui/react";

type Props = {}

const Index = (props: Props) => {
  return (
    <ViewLayout title="Notifications">
      <HStack gap="4" align={"center"}>
          <Stack
            borderRadius={"15px"}
            border={"1px solid"}
            borderColor="bordergrey"
            // p="4"
            bg={"white"}
            w="100%"
          >
          <Stack spacing={4} p={5}>
            <Text fontWeight="bold" fontSize="18px">
            All Notifications
            </Text>
          </Stack>
        </Stack>
      </HStack>
    </ViewLayout>
  )
}

export default Index;