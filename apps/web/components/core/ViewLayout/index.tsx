import React, { useState } from "react";
import type { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  // Link,
  Text,
  Button,
  Image,
  Center,
} from "@chakra-ui/react";
import type { ComponentWithAs, IconProps, FlexProps } from "@chakra-ui/react";
import {
  BellIcon,
  ContractorsIcon,
  DashboardIcon,
  EmployeesIcon,
  IntegrationsIcon,
  LogoutIcon,
  PayrollIcon,
  PeopleIcon,
  ExpensesIcon,
} from "./ProviderIcons";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import SidebarAccordion from "./SidebarAccordion";

interface LinkItemProps {
  name: string;
  icon: ComponentWithAs<"svg", IconProps>;
  href: string;
}

interface LinkAccordionProps {
  name: string;
  icon: ComponentWithAs<"svg", IconProps>;
  href: string;
  panels?: LinkAccordionProps[];
}
const DashboardLinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", href: "/test", icon: DashboardIcon },
];
const PayrollLinkItems: Array<LinkItemProps> = [
  { name: "Payroll", href: "/payroll", icon: PayrollIcon },
];

const PeopleAccordion: LinkAccordionProps = {
  name: "People",
  href: "#",
  icon: PeopleIcon,
  panels: [
    { name: "Employees", href: "/employees", icon: EmployeesIcon },
    { name: "Contractors", href: "/contractors", icon: ContractorsIcon },
  ],
};
const PeopleLinkItems: Array<LinkItemProps> = [
  { name: "People", href: "", icon: PeopleIcon },
  { name: "Employees", href: "/employees", icon: EmployeesIcon },
  { name: "Contractors", href: "/contractors", icon: ContractorsIcon },
];
const ExpensesLinkItems: Array<LinkItemProps> = [
  { name: "Expenses", href: "/expenses", icon: ExpensesIcon },
];
const DevLinkItems: Array<LinkItemProps> = [
  { name: "Integrations", href: "/integrations", icon: IntegrationsIcon },
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
      <SidebarContent />
      {/* mobilenav */}
      <HeaderNav title={title} />
      <Box ml={60} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...rest }) => {
  const [peopleMenuVisible, setPeopleMenuVisible] = useState(false);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("bordergrey", "gray.700")}
      w={60}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent={"center"}>
        <Image src="/wyre-logo.png" alt="" w={10} />
        <Text fontWeight={"semibold"} fontSize="xl" ml="2">
          Wyre
        </Text>
      </Flex>
      <VStack mt="16">
        {DashboardLinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}

        <Text alignSelf={"flex-start"} fontSize="sm" pl="8" pt="2">
          Admin
        </Text>
        {PayrollLinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}

        {/* Using an accordion for drop down nav */}
        <SidebarAccordion menu={PeopleAccordion} />
        {/* Using an accordion for drop down nav */}

        {/* {PeopleLinkItems.map(
          (link, index) =>
            !(index !== 0 && !peopleMenuVisible) && (
              <NavItem
                key={link.name}
                linkName={link.name}
                icon={link.icon}
                href={link.href}
                peopleMenuVisible={peopleMenuVisible}
                setPeopleMenuVisible={setPeopleMenuVisible}
                pl={index !== 0 ? "10" : ""}
                onClick={() => {
                  if (index === 0) {
                    setPeopleMenuVisible(!peopleMenuVisible);
                  }
                }}
              >
                {link.name}
              </NavItem>
            )
        )} */}
        {ExpensesLinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}

        <Text alignSelf={"flex-start"} fontSize="sm" pl="8" pt="2">
          Developer
        </Text>
        {DevLinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}
      </VStack>

      <HStack
        align="center"
        mb="10"
        // mx="4"
        w="100%"
        borderRadius="lg"
        cursor="pointer"
        position={"absolute"}
        bottom="0"
        justifyContent="center"
      >
        <Icon mr="2" fontSize="24" as={LogoutIcon} />

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
  href: string;
  linkName?: string;
  peopleMenuVisible?: boolean;
  setPeopleMenuVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavItem = ({
  icon,
  children,
  href,
  linkName,
  peopleMenuVisible,
  setPeopleMenuVisible,
  ...rest
}: NavItemProps) => {
  const router = useRouter();
  const isActive =
    router.asPath === href
      ? true
      : router.pathname.startsWith(href) && href !== "";

  // useEffect(()=>{
  //   if (linkName==='People' && setPeopleMenuVisible){
  //     setPeopleMenuVisible(true)
  //   }
  // },[linkName])

  return (
    <Link
      href={href}
      style={{ textDecoration: "none", width: "100%", padding: "0 16px" }}
    >
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
          bg: "blackAlpha.100",
          // color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="24"
            fill={isActive ? "brand.600" : "boldgrey"}
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text
          color={isActive ? "brand.600" : "boldgrey"}
          fontWeight={"semibold"}
        >
          {children}
        </Text>
        {linkName === "People" && (
          <Box ml="4" fontSize={"20px"} color={"boldgrey"}>
            {!peopleMenuVisible ? <FiChevronDown /> : <FiChevronUp />}
          </Box>
        )}
      </Flex>
    </Link>
  );
};

interface HeaderNavProps extends FlexProps {
  title?: string;
}

const HeaderNav = ({ title = "Dashboard", ...rest }: HeaderNavProps) => {
  const router = useRouter();

  return (
    <Flex
      ml={60}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("bordergrey", "gray.700")}
      justifyContent={"space-between"}
      {...rest}
    >
      <Text display={"flex"} fontSize="2xl" fontWeight="medium">
        {title}
      </Text>

      <HStack spacing={4}>
        <IconButton
          position={"relative"}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={
            <>
              <BellIcon />
              <Center
                as={"span"}
                color={"white"}
                position={"absolute"}
                top={0}
                right={0}
                fontSize={"10px"}
                w="18px"
                h="18px"
                bgColor={"brand.600"}
                borderRadius={"full"}
                zIndex={9999}
                p={1}
              >
                4
              </Center>
            </>
          }
          borderRadius="full"
          bg="#F7F7F7"
        />
        <Flex alignItems={"center"}>
          <HStack
            as={Button}
            variant="ghost"
            bg="#F7F7F7"
            borderRadius={"35px"}
            py={2}
            px={2}
            spacing={4}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
            onClick={() => router.push("/profile")}
          >
            <Avatar
              size={"sm"}
              src={
                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
            <VStack
              display={"flex"}
              alignItems="flex-start"
              spacing="1px"
              pr="4"
            >
              <Text fontSize="sm" fontWeight={"bold"}>
                John McDonald
              </Text>
              <Text fontSize="xs" fontWeight={"medium"} color="boldgrey">
                Chief People Officer
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};
