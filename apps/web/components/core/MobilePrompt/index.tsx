import { Box, Center, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { MobilePromptImage } from './ProviderIcons';

const MobilePrompt = () => {
  return (
    <Box h="100vh" p="6">
      <Center h="full" textAlign="center">
        <HStack position="absolute" top="5%">
          <Image src="/wyre-logo.png" alt="" w={10} />
          <Text fontWeight="semibold" fontSize="xl">
            Wyre
          </Text>
        </HStack>

        <VStack>
          <MobilePromptImage />
          <VStack>
            <Text fontWeight="semibold" fontSize="2xl">
              Oops! Sorry
            </Text>
            <Text color="lightgrey" maxW="320px">
              No display on mobile, you can only view on a desktop or tablet
            </Text>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default MobilePrompt;
