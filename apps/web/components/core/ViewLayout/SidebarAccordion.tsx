import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { ComponentWithAs, IconProps, FlexProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";

type AccordionMenuProps = {
  name: string;
  icon: ComponentWithAs<"svg", IconProps>;
  href: string;
  panels?: AccordionMenuProps[];
};

interface Props {
  menu: AccordionMenuProps;
}

export default function SidebarAccordion({ menu }: Props) {
  const router = useRouter();
  const isActive =
    router.asPath === menu.href ? true : router.pathname.startsWith(menu.href);
  return (
    <Accordion px={4} allowToggle w="full">
      <AccordionItem border={"none"} p={0}>
        <h2>
          <AccordionButton p={0} borderRadius="lg">
            <HStack spacing={4} px={4} py="2">
              {menu.icon && (
                <Icon
                  fontSize="24"
                  fill={isActive ? "brand.600" : "boldgrey"}
                  _groupHover={{
                    color: "white",
                  }}
                  as={menu.icon}
                />
              )}
              <Text
                color={isActive ? "brand.600" : "boldgrey"}
                fontWeight={"semibold"}
              >
                {menu.name}
              </Text>
            </HStack>

            <AccordionIcon
              color={isActive ? "brand.600" : "boldgrey"}
              fontSize="2xl"
              mr={8}
            />
          </AccordionButton>
        </h2>

        <AccordionPanel py={2} px={0} as={Stack}>
          {menu.panels?.map((panel) => (
            <SidebarAccordionItem
              key={panel.name}
              name={panel.name}
              icon={panel.icon}
              href={panel.href}
            />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

interface NavItemProps extends FlexProps {
  icon: ComponentWithAs<"svg", IconProps>;
  children?: ReactNode;
  href: string;
  name?: string;
}

function SidebarAccordionItem({ href, name, icon, ...rest }: NavItemProps) {
  const router = useRouter();
  const isActive =
    router.asPath === href ? true : router.pathname.startsWith(href);

  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      w="100%"
      borderRadius="lg"
      _hover={{
        bg: "blackAlpha.100",
        // color: 'white',
      }}
    >
      <Flex
        align="center"
        px="6"
        py="2"
        // mx="4"
        w="100%"
        role="group"
        // borderRadius="lg"
        // _hover={{
        //   bg: "blackAlpha.100",
        //   // color: 'white',
        // }}
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
          {name}
        </Text>
      </Flex>
    </Link>
  );
}
