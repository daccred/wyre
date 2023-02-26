import React from 'react';
import {
  Text,
  Flex,
  Link,
  Icon,
  Stack
} from '@chakra-ui/react';
import { ArrowRightIcon } from './ProviderIcons';


interface StatData {
  id: number;
  label: string;
  icon: any;
  desc: string;
  link: string;
}

const Card = ({ data }: { data: StatData }) => {
  return (
      <Stack
        borderRadius={"15px"}
        border={"1px solid"}
        borderColor="#D2D2D2"
        p="4"
        bg={"white"}
        rounded="12px"
        w="100%"
        textAlign="left"
        align="start"
        spacing={0}
      > 
        <Stack spacing={4} w="100%">
            <Icon as={data.icon} w={6} h={6} color="#8D1CFF" />

            <Text as="h3" fontSize="md" fontWeight={'bold'} colorScheme="">
              {data.label}
            </Text>

            <Text as="p" fontSize="md" color="gray.400">
              {data.desc}
            </Text>

            <Link href={data.link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Flex
                align="center"
                justify='center'
                bg={'purple.50'}
                p="3"
                borderRadius="8px"
                w={"fit-content"}
                cursor="pointer"
                _hover={{
                  bg: 'purple.50',
                  color: 'white',
                }}>
                  
                <Text color='purple.600' fontWeight={'semibold'}>Proceed</Text>
                <Icon
                  ml="3"
                  w={6} h={6}
                  as={ArrowRightIcon}
                />
              </Flex>
            </Link>
         
        </Stack>
       
      </Stack>
  );
};

export default Card;