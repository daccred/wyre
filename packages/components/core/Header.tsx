import { Box, Flex, HStack, Icon, Button, Image, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { LogoutIcon } from "./providerIcon";

interface LinkItemProps {
  href: string;
  name?: string;
}

const NavItem = ({ href, name, ...rest }: LinkItemProps) => {
  const router = useRouter();

  const isActive = router.asPath === href ? true : router.pathname.startsWith(href) && href !== "";

  return (
    <Link href={href} style={{ textDecoration: "none", width: "100%" }}>
      <Flex
        align="center"
        px="6"
        py={3}
        w="100%"
        rounded="full"
        cursor="pointer"
        bg={isActive ? "primary.main" : ""}
        _hover={{
          bg: "primary.main",
          color: "white",
        }}
        {...rest}>
        <Text color={isActive ? "white" : ""} fontWeight="bold">
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

const Header = () => {
  const LinkItems = [
    { name: "Home", href: "/employee/home" },
    { name: "Request", href: "/employee/request" },
    { name: "Profile", href: "/employee/profile" },
  ];

  return (
    <Box w="full" py={4}>
      <Box h="5rem" mx="auto" maxW="1300px">
        <Flex w="full" h="full" px="6" alignItems="center" justifyContent="space-between">
          <Flex align="flex-start">
            <Link href="/">
              <Image src="/Zayroll Logo.png" />
            </Link>
          </Flex>
          <Flex>
            <HStack
              spacing="8"
              p={2}
              display={{
                md: "flex",
              }}
              bg="gray.100"
              rounded={"full"}>
              {LinkItems.map((link) => (
                <NavItem key={link.name} href={link.href} name={link.name} />
              ))}
            </HStack>
          </Flex>
          <Flex justify="flex-end" align="center">
            <Button
              color="#E71D36"
              bg={"none"}
              _hover={{ bg: "none", color: "none" }}
              fontWeight="bold"
              onClick={() => signOut()}>
              <Icon fontSize="24" mr={2} as={LogoutIcon} /> Logout
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
