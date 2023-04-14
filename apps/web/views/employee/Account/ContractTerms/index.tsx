import { Flex, Heading, Link, Text, Icon, VStack, Stack, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import z from 'zod';
import { FormInput, useForm } from '@wyrecc/components';
import Header from '@wyrecc/components/core/Header';

const contractTermsValidationSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  status: z.string().min(1, 'Status is required'),
  department: z.string().min(1, 'Department is required'),
  jobRole: z.string().min(1, 'Job Role is required'),
  grossSalary: z.string().min(1, 'Gross Salary is required'),
});

type FormInputOptions = z.infer<typeof contractTermsValidationSchema>;

const View = () => {
  const { renderForm } = useForm<FormInputOptions>({
    defaultValues: {
      category: 'Employee',
      status: 'Active',
      department: 'Marketing',
      jobRole: 'Social Media Associate',
      grossSalary: '$2,400 monthly',
    },
    schema: contractTermsValidationSchema,
  });
  return (
    <Header>
      <VStack width="100%" align="left" spacing={3}>
        <Link href="/employee/account/" color="brand.700" fontWeight={700}>
          <Flex align="center">
            <Icon as={FiChevronLeft} />
            <Text ml={2}>Back</Text>
          </Flex>
        </Link>
        <Heading as="h4" size="xs" fontSize="xl" color="brand.700">
          Contract Terms
        </Heading>
        {renderForm(
          <Stack spacing={6} pb={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                <FormInput name="category" type="text" label="Category" />
              </GridItem>
              <GridItem>
                <FormInput name="status" type="text" label="Status" />
              </GridItem>
              <GridItem colSpan={2}>
                <FormInput name="department" type="text" label="Department" />
              </GridItem>{' '}
              <GridItem colSpan={2}>
                <FormInput name="jobRole" type="text" label="Job Role" />
              </GridItem>
              <GridItem colSpan={2}>
                <FormInput name="grossSalary" type="text" label="Gross Salary" />
              </GridItem>
            </Grid>
          </Stack>
        )}
      </VStack>
    </Header>
  );
};

export default View;
