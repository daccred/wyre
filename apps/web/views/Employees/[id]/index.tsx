import { HStack, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import ViewLayout from '../../../components/core/ViewLayout';
import { trpc } from '../../../utils/trpc';
import CompensationForm from './CompensationForm';
import EmployeeForm from './EmployeeForm';
import PaymentMethod from './paymentMethod';

const ManageEmployee = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: employee, isLoading } = trpc.team.getSinglePersonnel.useQuery(
    { personnelId: id as string },
    {
      refetchOnMount: true,
    }
  );
  return (
    <>
      <ViewLayout title="Employee">
        <Breadcrumb
          fontSize="xs"
          separator={<FiChevronRight color="#d2d2d2" fontSize="16px" />}
          pb="2"
          fontWeight="semibold">
          <BreadcrumbItem>
            <BreadcrumbLink href="/employees" color="lightgrey">
              Employee
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <Skeleton textTransform="capitalize" isLoaded={!isLoading}>
                {employee?.firstName + ' ' + employee?.lastName}
              </Skeleton>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack gap="4" alignItems="flex-start">
          <Stack borderRadius="15px" border="1px solid" borderColor="bordergrey" bg="white" w="70%">
            <EmployeeForm />
            <PaymentMethod />
          </Stack>
          <CompensationForm />
        </HStack>
      </ViewLayout>
    </>
  );
};

export default ManageEmployee;
