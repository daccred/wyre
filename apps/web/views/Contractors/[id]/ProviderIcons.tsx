import type { HTMLChakraProps } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import React from 'react';

export const ProfileIcon = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    width={15}
    height={15}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M9.333 6.833a4.36 4.36 0 00-2.66.893C5.99 8.257 5.5 9.014 5.5 9.833v.667h7.667v-.667c0-.82-.492-1.576-1.173-2.107a4.36 4.36 0 00-2.66-.893zm0 0a2.167 2.167 0 110-4.333 2.167 2.167 0 010 4.333zm-4-5h8a.833.833 0 01.834.833v8a.833.833 0 01-.834.834h-8a.833.833 0 01-.833-.834v-8a.833.833 0 01.833-.833z" />
    <path d="M2.666 5.333H1.333v8c0 .735.598 1.333 1.333 1.333h8v-1.333h-8v-8z" />
  </chakra.svg>
);
