import React, { useState } from 'react';
import type { ReactNode } from 'react'
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import type { ComponentWithAs, IconProps, FlexProps } from "@chakra-ui/react";
import { BellIcon, ContractorsIcon, DashboardIcon, EmployeesIcon, IntegrationsIcon, LogoutIcon, PayrollIcon, PeopleIcon, TaxesIcon } from './ProviderIcons';
import { useRouter } from 'next/router';

interface LinkItemProps {
  name: string;
  icon: ComponentWithAs<"svg", IconProps>;
  href:string
}
const DashboardLinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', href:'/test', icon: DashboardIcon },
];
const PayrollLinkItems: Array<LinkItemProps> = [
    { name: 'Payroll', href:'/payroll', icon: PayrollIcon },
];
const PeopleLinkItems: Array<LinkItemProps> = [
  { name: 'People', href:'#', icon: PeopleIcon },
  { name: 'Employees', href:'/employees', icon: EmployeesIcon },
  { name: 'Contractors', href:'/contractors', icon: ContractorsIcon },
];
const TaxesLinkItems: Array<LinkItemProps> = [
    { name: 'Taxes', href:'/taxes', icon: TaxesIcon },
  ];
const DevLinkItems: Array<LinkItemProps> = [
    { name: 'Integrations', href:'/integrations', icon: IntegrationsIcon },
];

export default function ViewLayout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <Box minH="100vh" bg={"#F7F7F7"}>
      <SidebarContent/>
      {/* mobilenav */}
      <HeaderNav title={title}/>
      <Box ml={60} p="4">
        {children}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ ...rest }) => {

  const [peopleMenuVisible, setPeopleMenuVisible] = useState(false)

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
    //   borderRight="1px"
    //   borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={60}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent={"center"}>
        <Image src='/wyre-logo.png' alt='' w={10} />
      </Flex>
      <VStack>
       {DashboardLinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
            </NavItem>
        ))} 

        <Text alignSelf={"flex-start"} fontSize="sm" pl="8" pt="2">Admin</Text>
        {PayrollLinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
            </NavItem>
        ))} 
        {PeopleLinkItems.map((link, index) => (
            !(index!==0 && !peopleMenuVisible) && 
            <NavItem key={link.name} icon={link.icon} href={link.href} pl={index!==0? "10":''} 
            onClick={()=>{
                if (index===0){
                    setPeopleMenuVisible(!peopleMenuVisible)
                }
            }}
            >
                {link.name}
            </NavItem>
        ))} 
         {TaxesLinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
            </NavItem>
        ))} 

        <Text alignSelf={"flex-start"} fontSize="sm" pl="8" pt="2">Developer</Text>
        {DevLinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
            </NavItem>
        ))} 
      </VStack>

        <HStack
            align="center"
            mb="8"
            // mx="4"
            w="100%"
            borderRadius="lg"
            cursor="pointer"
            position={"absolute"}
            bottom="0"
            justifyContent="center"
        >
            <Icon mr="2" fontSize="24"as={LogoutIcon}/>

            <Text color="#E71D36" fontWeight={"semibold"}>
                Logout
            </Text>
        </HStack>
      
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: ComponentWithAs<"svg", IconProps>;
  children: ReactNode;
  href:string
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
    
  const router = useRouter();
  const isActive =
    router.asPath === href ? true : router.pathname.startsWith(href);

  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} w="100%" px="4">
      <Flex
        align="center"
        px="4"
        py="2"
        // mx="4"
        w="100%"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blackAlpha.100',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="24"
            fill={isActive?"black":"boldgrey"}
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        <Text style={{fontStyle: isActive?'italic':'normal'}} color={isActive?"black":"boldgrey"} fontWeight={"semibold"}>
            {children}
        </Text>
      </Flex>
    </Link>
  );
};

interface HeaderNavProps extends FlexProps {
    title?:string
}

const HeaderNav = ({ title="Dashboard", ...rest }:HeaderNavProps) => {
  return (
    <Flex
      ml={60}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
    //   bg={useColorModeValue('white', 'gray.900')}
    //   borderBottomWidth="1px"
    //   borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={'space-between'}
      {...rest}>

      <Text
        display={"flex"}
        fontSize="2xl"
        fontWeight="bold">
        {title}
      </Text>

      <HStack spacing={4}>
        <IconButton
          size="lg"
          variant="outline"
          aria-label="open menu"
          icon={<BellIcon />}
          borderRadius="full"
          boxShadow={"4px 4px 25px rgba(0, 0, 0, 0.1)"}
        />
        <Flex alignItems={'center'}>
            <HStack 
                as={Button} 
                variant="outline" 
                borderRadius={"35px"}  
                py={2}
                px={2}
                spacing={4}
                transition="all 0.3s"
                boxShadow={"4px 4px 25px rgba(0, 0, 0, 0.1)"}
                _focus={{ boxShadow: 'none' }} 
            >
            <Avatar
                size={'sm'}
                src={
                'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
            />
            <VStack
                display={"flex"}
                alignItems="flex-start"
                spacing="1px"
                pr="4"
                >
                <Text fontSize="sm" fontWeight={"bold"}>John McDonald</Text>
                <Text fontSize="xs" fontWeight={"medium"} color="boldgrey">
                Chief People Officer
                </Text>
            </VStack>
            </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
}