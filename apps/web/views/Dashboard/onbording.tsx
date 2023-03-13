import React from 'react';
import {
    Stack,
    SimpleGrid,
    Text,
  } from "@chakra-ui/react";
import Card from './card';
import { LayoutIcon, UserIcon, CreditCardIcon } from "./ProviderIcons";

type StatData  = {
    id: number;
    label: string;
    icon: any;
    desc: string;
    link: string;
}

const statData: StatData[] = [
    {
      id: 1,
      label: 'Setup payment services',
      icon: CreditCardIcon,
      desc: 'Lorem ipsum dolor sit amet consectetur. In faucibus at in amet enim est elit sit ornare. Massa tempus sagittis',
      link: '/'
    },
    {
      id: 2,
      label: 'Add employees or contractor',
      icon: UserIcon,
      desc: 'Lorem ipsum dolor sit amet consectetur. In faucibus at in amet enim est elit sit ornare. Massa tempus sagittis',
      link: '/employees'
    },
    {
      id: 3,
      label: 'Create first payroll',
      icon: LayoutIcon,
      desc: 'Lorem ipsum dolor sit amet consectetur. In faucibus at in amet enim est elit sit ornare. Massa tempus sagittis',
      link: '/'
    }
  ];

const Onbording = () => {
  return (
    <Stack spacing={'6'} >
        <Stack>
          <Text fontWeight="bold" fontSize="2xl" mb="1">
              Get Started
          </Text>
          <Text color={"lightgrey"} fontSize="sm">
              With these few steps, you can setup your Zayroll account
          </Text>
        </Stack>
        
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
            {statData.map((data, index) => (
              <Card key={index} data={data} />
            ))}
        </SimpleGrid>
        
      </Stack>
  )
}

export default Onbording;