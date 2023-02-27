import React from 'react';
// import Spinner from './spinner';
import {
  Button,
  Flex,
  Text,
  Spinner
} from '@chakra-ui/react';

type LoadingButtonProps = {
  loading?: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  textColor = 'white',
  btnColor = '#210D35',
  children,
  loading = false,
}) => {
  return (
    <Button
      type='submit'
      w="full" color="white" bgColor={loading ? btnColor : btnColor} py={7} 
      _hover={{
        bg: '#210D35',
      }}
    >
      {loading ? (
        <Flex align={'center'} >
          <Spinner 
            thickness='4px'
            speed='0.5s'
          />
          <Text ms={3}>Loading...</Text>
        </Flex>
      ) : (
        <Text className={`${textColor}`}>{children}</Text>
      )}
    </Button>
  );
};
