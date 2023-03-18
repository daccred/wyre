import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  Button,
  Image,
  Text
} from "@chakra-ui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { LogoutIcon } from './providerIcon';

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
        alignItems="center"
        justifyContent={'center'}
        px={8}
        py={3}
        w="100%"
        rounded="full"
        cursor="pointer"
        bg={isActive ? "primary.main" : ""}
        _hover={{
          bg: "primary.main",
          color: 'white',
        }}
        {...rest}>
       
        <Text color={isActive ? "white" : "#210D35"} fontWeight="bold">
          {name}
        </Text>
      </Flex>
    </Link>
  );
};


const Header = ()=> {
  const LinkItems = [
    { name: "Home", href: "/employee/home" },
    { name: "Request", href: "/employee/request" },
    { name: "Profile", href: "/employee/profile" },
  ];
  
    return (
      <Box w="full" py={5}>
        <Box mx="auto" maxW="1400px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              <Link href="/">
                <Image src='/Zayroll Logo.png'/>
              </Link>
            </Flex>
              <HStack
                spacing="8"
                p={'7px'}
                w="100%"
                maxW="442px"
                display="flex"
                bg="gray.100"
                rounded={'full'}
              >
              {LinkItems.map(link => (
                <NavItem key={link.name} href={link.href} name={link.name} />
              ))}
              </HStack>

           <Flex>
              <Button color="#E71D36" bg={'none'} _hover={{bg: "none", color: 'none',}} fontWeight="bold" onClick={() => signOut()}>
                 <Icon fontSize="24" mr={2} as={LogoutIcon} /> Logout
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    );
  };

export default Header;