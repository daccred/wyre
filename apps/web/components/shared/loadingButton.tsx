import React from "react";
// import Spinner from './spinner';
import { Button, Flex, Text, Spinner } from "@chakra-ui/react";

type LoadingButtonProps = {
  submitting?: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
  width?: string;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  textColor = "white",
  btnColor = "#210D35",
  children,
  width,
  submitting = false,
}) => {
  return (
    <Button
      type="submit"
      isDisabled={submitting}
      w={width}
      color="white"
      bgColor={submitting ? "#010C14" : btnColor}
      py={7}
      _hover={{
        bg: "#210D35",
      }}
    >
      {submitting ? (
        <Flex align={"center"}>
          <Spinner thickness="4px" speed="0.5s" />
          <Text ms={3}>Loading...</Text>
        </Flex>
      ) : (
        <Text className={`${textColor}`}>{children}</Text>
      )}
    </Button>
  );
};
