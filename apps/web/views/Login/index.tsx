import { FormInput } from "../../components";
import {
  Container,
  Center,
  Box,
  Stack,
  Text,
  useBreakpointValue,
  Button,
  Flex,
  Heading,
  Link,
  HStack,
  Image,
} from "@chakra-ui/react";
import * as React from "react";
import { GoogleIcon, TwitterIcon } from "./ProviderIcons";

const View = () => (
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
         
          <Stack spacing={4}>            
            <FormInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="john-mcdonald@zayroll.com"
            />
            
            <FormInput
              name="text"
              label="Password"
              type="password"
              placeholder="***************"
            />
        </Stack>

          <Stack>
            <Button variant="link" color="white" bgColor="#210D35" p="3"
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
 // <Box
  //   minH={"100vh"}
  //   bgGradient={{ sm: "linear(to-r, blue.600, purple.600)" }}
  //   py={{ base: "12", md: "24" }}
  // >
  //   <Container
  //     maxW="md"
  //     py={{ base: "0", sm: "8" }}
  //     px={{ base: "4", sm: "10" }}
  //     bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
  //     boxShadow={{ base: "none", sm: "xl" }}
  //     borderRadius={{ base: "none", sm: "xl" }}
  //   >
  //     <Stack spacing="8">
  //       <Stack spacing="6" align="center">
  //         <Stack spacing="3" textAlign="center">
  //           <Heading size="xs">Log in to your account</Heading>
  //           <Text color="muted">Start making your dreams come true</Text>
  //         </Stack>
  //       </Stack>
  //       <Stack spacing="6">
  //         <Button
  //           rounded={"3xl"}
  //           variant="outline"
  //           leftIcon={<GoogleIcon boxSize="5" />}
  //           iconSpacing="3"
  //         >
  //           Continue with Google
  //         </Button>
  //         <Button
  //           rounded={"3xl"}
  //           variant="outline"
  //           leftIcon={<TwitterIcon boxSize="5" />}
  //           iconSpacing="3"
  //         >
  //           Continue with Twitter
  //         </Button>
  //         <Divider />
  //         <Stack spacing="4">
  //           <FormInput
  //             name="email"
  //             label="Your email address"
  //             placeholder="Enter your email address..."
  //           />
  //           <Button variant="gradient" rounded={"3xl"}>
  //             Continue with email
  //           </Button>
  //         </Stack>
  //       </Stack>
  //       <Stack spacing="0.5" align="center">
  //         <Text fontSize="sm" color="muted">
  //           Having trouble logging in?
  //         </Text>
  //         <Button variant="link" colorScheme="blue" size="sm">
  //           Contact us
  //         </Button>
  //       </Stack>
  //       <Text fontSize="xs" color="subtle" textAlign="center">
  //         By continuing, you acknowledge that you have read, understood, and
  //         agree to our terms and condition
  //       </Text>
  //     </Stack>
  //   </Container>
  // </Box>