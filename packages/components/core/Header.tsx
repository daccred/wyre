import { Box, Flex, HStack, Icon, Button, Image, Text, Container, Grid, GridItem } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { LogoutIcon } from './providerIcon';

interface LinkItemProps {
  href: string;
  name?: string;
}

const NavItem = ({ href, name, ...rest }: LinkItemProps) => {
  const router = useRouter();

  const isActive = router.asPath === href ? true : router.pathname.startsWith(href) && href !== '';

  return (
    <Link href={href} style={{ textDecoration: 'none', width: '100%' }}>
      <Flex
        align="center"
        px={10}
        py={3}
        w="100%"
        rounded="full"
        cursor="pointer"
        bg={isActive ? 'primary.main' : ''}
        _hover={{
          bg: 'primary.main',
          color: 'white',
        }}
        {...rest}>
        <Text color={isActive ? 'white' : ''} fontWeight="bold">
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

const Header = ({ children }: { children: any }) => {
  const LinkItems = [
    { name: 'Home', href: '/employee/home' },
    { name: 'Request', href: '/employee/request' },
    { name: 'Account', href: '/employee/account' },
  ];

  return (
    <Container centerContent my={8} maxW="container.xl">
      <Grid templateColumns="repeat(3, 1fr)" justifyContent="space-between">
        <GridItem>
          <Flex align="flex-start">
            <Link href="/">
              <Image src="/Zayroll Logo.png" alt="Wyre" />
            </Link>
          </Flex>
        </GridItem>
        <GridItem>
          <Box>
            <Flex>
              <HStack
                spacing="5"
                p={2}
                display={{
                  md: 'flex',
                }}
                bg="gray.100"
                rounded="full">
                {LinkItems.map((link) => (
                  <NavItem key={link.name} href={link.href} name={link.name} />
                ))}
              </HStack>
            </Flex>
            <Box mt={16} width="100%">
              {children}
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Flex justify="flex-end" align="center">
            <Button
              color="#E71D36"
              bg="none"
              _hover={{ bg: 'none', color: 'none' }}
              fontWeight="bold"
              onClick={() => signOut()}>
              <Icon fontSize="24" mr={2} as={LogoutIcon} /> Logout
            </Button>
          </Flex>{' '}
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Header;
