import { Center, Text } from "@chakra-ui/react";
import Header from "components/core/Header";
import React from "react";

type Props = {};

const Index = (props: Props) => {
  return (
    <>
      <Header />
      <Center>
        <Text fontSize={"3xl"}>Request</Text>
      </Center>
    </>
  );
};

export default Index;
