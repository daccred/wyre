import { Box, HStack, Image, Input, Stack, Switch, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import ViewLayout from '../../components/core/ViewLayout';
import APIForm from './APIForm';
import {
  AnchorIcon,
  CoinProfileIcon,
  FluidCoinsIcon,
  FlutterwaveIcon,
  LazerPayIcon,
  MonoIcon,
  PaystackIcon,
  StitchIcon,
} from './ProviderIcons';

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const openServices = [
    {
      name: 'Mono',
      subtitle: 'Reliable open banking platform for businesses in Africa',
      logo: <MonoIcon />,
    },
    {
      name: 'Stitch',
      subtitle: 'Secure online payment and financial data API',
      logo: <StitchIcon />,
    },
    {
      name: 'Anchor',
      subtitle: 'Build your financial  service product',
      logo: <AnchorIcon />,
    },
    {
      name: 'OnePipe',
      subtitle: 'Launch or embed financial service in days not weeks',
      logo: <Image src="images/onepipe.png" alt="" boxSize="30px" />,
    },
  ];

  const fiatServices = [
    {
      name: 'Paystack',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <PaystackIcon />,
    },
    {
      name: 'ExpressPayGH',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <Image src="images/expresspaygh.png" alt="" boxSize="30px" />,
    },
    {
      name: 'Flutterwave',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <FlutterwaveIcon />,
    },
  ];

  const cryptoServices = [
    {
      name: 'Fluidcoins',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <FluidCoinsIcon />,
    },
    {
      name: 'Lazerpay',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <LazerPayIcon />,
    },
    {
      name: 'Coinprofile',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <CoinProfileIcon />,
    },
  ];

  const mobileMoneyServices = [
    {
      name: 'MTN Momo',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <Image src="images/mtn momo.png" alt="" boxSize="30px" />,
    },
    {
      name: 'MPesa',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices.',
      logo: <Image src="images/mpesa.png" alt="" boxSize="30px" />,
    },
  ];

  return (
    <ViewLayout title="Integrations">
      <HStack gap="4" alignItems="flex-start">
        <Box borderRadius="15px" border="1px solid" borderColor="bordergrey" p="4" bg="white" w="70%">
          <Text fontWeight="bold" fontSize="18px" mb="1">
            Payment Services
          </Text>
          <Text mb="4" color="lightgrey" fontSize="sm">
            Supercharge your payroll and connect the best tool for making payments globally
          </Text>
          <HStack gap="1">
            <FiSearch fontSize="24px" />
            <Input
              variant="unstyled"
              border="0"
              borderBottom="1px solid"
              borderRadius={0}
              px="0"
              py="1"
              h="40px"
              w={{ base: 'auto', lg: '250px' }}
              fontSize="sm"
              placeholder="Search Payment Service"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </HStack>

          <Stack mt="4" spacing="3">
            <Text fontWeight="semibold" pt="4">
              Open Banking
            </Text>
            {openServices &&
              openServices?.map((service) => (
                <HStack
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="bordergrey"
                  py="3"
                  px="4"
                  bg="white"
                  justifyContent="space-between"
                  fontSize="sm">
                  <HStack spacing={4}>
                    {service.logo}
                    <Stack spacing={0}>
                      <Text fontWeight="bold">{service.name}</Text>
                      <Text color="lightgrey">{service.subtitle}</Text>
                    </Stack>
                  </HStack>
                  <Switch />
                </HStack>
              ))}

            <Text fontWeight="semibold" pt="4">
              Fiat Rails
            </Text>
            {fiatServices &&
              fiatServices?.map((service) => (
                <HStack
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="bordergrey"
                  py="3"
                  px="4"
                  bg="white"
                  justifyContent="space-between"
                  fontSize="sm">
                  <HStack spacing={4}>
                    {service.logo}
                    <Stack spacing={0}>
                      <Text fontWeight="bold">{service.name}</Text>
                      <Text color="lightgrey">{service.subtitle}</Text>
                    </Stack>
                  </HStack>
                  <Switch />
                </HStack>
              ))}

            <Text fontWeight="semibold" pt="4">
              Crypto Rails
            </Text>
            {cryptoServices &&
              cryptoServices?.map((service) => (
                <HStack
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="bordergrey"
                  py="3"
                  px="4"
                  bg="white"
                  justifyContent="space-between"
                  fontSize="sm">
                  <HStack spacing={4}>
                    {service.logo}
                    <Stack spacing={0}>
                      <Text fontWeight="bold">{service.name}</Text>
                      <Text color="lightgrey">{service.subtitle}</Text>
                    </Stack>
                  </HStack>
                  <Switch />
                </HStack>
              ))}

            <Text fontWeight="semibold" pt="4">
              Mobile Money Rails
            </Text>
            {mobileMoneyServices &&
              mobileMoneyServices?.map((service) => (
                <HStack
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="bordergrey"
                  py="3"
                  px="4"
                  bg="white"
                  justifyContent="space-between"
                  fontSize="sm">
                  <HStack spacing={4}>
                    {service.logo}
                    <Stack spacing={0}>
                      <Text fontWeight="bold">{service.name}</Text>
                      <Text color="lightgrey">{service.subtitle}</Text>
                    </Stack>
                  </HStack>
                  <Switch />
                </HStack>
              ))}
          </Stack>
        </Box>

        <APIForm />
      </HStack>
    </ViewLayout>
  );
};

export default Integrations;
