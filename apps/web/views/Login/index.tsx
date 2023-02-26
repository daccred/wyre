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
import z from "zod";
// import { GoogleIcon, TwitterIcon } from "./ProviderIcons";

const loginValidationSchema = z.object({
  email: z.string(),
  password: z.string()
});


type FormInputOptions = z.infer<typeof loginValidationSchema>;

const View = () => {

  const handleSubmit = async (data: FormInputOptions, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(data));
  };
  const { renderForm } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: loginValidationSchema,
  });

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
         
          {renderForm(
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
                <Button color="white" bgColor="#210D35" p="3" type="submit"
                _hover={{
                  bg: '#210D35',
                }}>
                    Login
                </Button>
                <Center>Forgot Password? 
                  <Link color='#8D1CFF' marginLeft={2} href='/forgot-password'>Reset</Link>
                </Center>
              </Stack>
            </Stack>
          )}
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
 