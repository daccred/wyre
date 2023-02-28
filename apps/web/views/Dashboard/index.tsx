import React, {useState} from 'react';
import ViewLayout from "../../components/core/ViewLayout";
import {
    Stack,
  } from "@chakra-ui/react";
import Onboarding from './Onbording';
import Preview from './Preview';


const Index: React.FC = () => {
  const [isNew, setIsNew] = useState(false);
  return (
    <ViewLayout title='Dashboard'>
      <Stack spacing={'6'} >
        {isNew ?
          <Onboarding/>
          :
          <Preview/>
        }
      </Stack>
    </ViewLayout>
  )
};

export default Index;