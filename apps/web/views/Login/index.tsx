import { FormInput, useForm } from "../../components";
import {
  Center,
  Stack,
  Text,
  Button,
  Flex,
  Heading,
  Link,
  HStack,
  Image,
} from "@chakra-ui/react";
import * as React from "react";
import { GetServerSideProps } from "next";
import { LoadingButton } from "../../components/shared/loadingButton";

type Props = {
  isLoading?: boolean;
};


const View: React.FC<Props> = (Props) => {

  const { isLoading } = Props;

  return (
  <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>

    <Stack flex={1} >
      <Image src="/Zayroll Logo.png" alt="wyre logo" w={24} m={12}/>

      <Flex flex={1} align={{ base: '', md: 'start' }} p={12}>
        
        <Stack spacing={8} w={'full'} maxW={'md'}>
          <Stack>
            <Text color={'#010C14'} fontWeight={'bold'} fontSize={{ base: '3xl', md: '4xl' }}>Login</Text>
            <Text color="#010C14">
              Don’t have an account? <Link color='#8D1CFF' href="/register">Create Account</Link>
            </Text> 
          </Stack>
         
            <Stack spacing={"6"} pb="4">
              <Stack spacing={4}>            
                <FormInput
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="john-mcdonald@zayroll.com"
                />
                
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="***************"
                />
              </Stack>

              <Stack>
           
                <LoadingButton loading={isLoading}>
                    Login
                </LoadingButton>
                <Center>Forgot Password? 
                  <Link color='#8D1CFF' marginLeft={2} href='/forgot-password'>Reset</Link>
                </Center>
              </Stack>
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
)
};

export default View;
 

// export const getServerSideProps: GetServerSideProps = async (context) => {
  
// }