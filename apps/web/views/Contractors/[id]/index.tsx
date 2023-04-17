import { HStack, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import ViewLayout from '../../../components/core/ViewLayout';
import { trpc } from '../../../utils/trpc';
import CompensationForm from './CompensationForm';
import ContractorForm from './ContractorForm';
import PaymentMethod from './paymentMethod';

const ManageContractor = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: contractor, isLoading } = trpc.team.getSingleContractor.useQuery(id as string);

  return (
    <>
      <ViewLayout title="Contractor">
        <Breadcrumb
          fontSize="xs"
          separator={<FiChevronRight color="#d2d2d2" fontSize="16px" />}
          pb="2"
          fontWeight="semibold">
          <BreadcrumbItem>
            <BreadcrumbLink href="/contractors" color="lightgrey">
              Contractor
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
            // href='#'
            >
              <Skeleton textTransform="capitalize" isLoaded={!isLoading}>
                {contractor?.firstName + ' ' + contractor?.lastName}
              </Skeleton>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack gap="4" alignItems="flex-start">
          <Stack borderRadius="15px" border="1px solid" borderColor="bordergrey" p="4" bg="white" w="70%">
            <ContractorForm />
            <PaymentMethod />
          </Stack>
          <CompensationForm />
        </HStack>
      </ViewLayout>
    </>
  );
};
export default ManageContractor;
