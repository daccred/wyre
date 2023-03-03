import * as React from "react";
import { Center, Heading } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Stack,
  HStack,
  Image,
  Text,
  Link
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';


const View = () => (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>

      <Stack flex={1} >
        <Image src="/Zayroll Logo.png" alt="wyre logo" w={24} m={12}/>

       <Flex p={12} flex={1} align={'start'} justify={{ base: '', md: '', xl: '' }}>

        <Stack spacing={8} w={'full'} maxW={'sm'}
          >
          <Stack>
            <Text color={'#010C14'} fontWeight={'bold'} fontSize={{ base: '3xl', md: '4xl' }}>Email Verification</Text>
            <Text color="#010C14">
               Kindly enter the verification code we sent to your email address
            </Text> 
          </Stack>
          <Stack
            spacing={4}
            my={10}>
            
            <FormControl>
              <Center>
                <HStack>
                <PinInput size='lg' placeholder='-'>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={'#010C14'}
                color={'white'}
                _hover={{
                  bg: '#210D35',
                }}
                >
                Continue
              </Button>
            </Stack>
            <Text>{"Didn’t receive a verification code? "}<Link href='/' color={'#8D1CFF'}>Resend</Link></Text>
          </Stack>
        </Stack>
    </Flex>
  </Stack>

    <Flex bgColor="#210D35" color="white" flex={1} align={'center'} justify={'center'} >
        
        <HStack flex={1} align={'start'} justify={'end'} >
          <Stack p={8} maxW={'md'}>
            <Heading>Zayroll</Heading>
            <Text>The open-source payroll Infrastructure for African businesses.</Text>
          </Stack>
        
          <Image
            alt={'Image'}
            src={
              'images/Payroll.png'
            }
          />
        </HStack>
      </Flex>
    </Stack>
);

export default View;