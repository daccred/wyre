import { HStack, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next/types";
import React, { useEffect, useReducer } from "react";
import { FiChevronRight } from "react-icons/fi";

import ViewLayout from "../../../components/core/ViewLayout";
import { trpc } from "../../../utils/trpc";
import CompensationForm from "./CompensationForm";
import ContractorForm from "./ContractorForm";

// Define initial state
const initialState = {
  contractor: null,
  isLoading: true,
};

// Define reducer function
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_CONTRACTOR":
      return {
        ...state,
        contractor: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const ManageContractor = ({ contractorData }: any) => {
  const router = useRouter();
  const { id } = router.query;

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    contractor: contractorData,
  });
  const { data: contractor, isLoading } = trpc.team.getSingleContractor.useQuery(id as string);

  useEffect(() => {
    if (contractor) {
      dispatch({ type: "SET_CONTRACTOR", payload: contractor });
    }
  }, [contractor]);
  return (
    <>
      <ViewLayout title="Contractors">
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
                {state.contractor?.name}
              </Skeleton>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack gap="4" alignItems="flex-start">
          <Stack borderRadius="15px" border="1px solid" borderColor="bordergrey" p="4" bg="white" w="70%">
            <ContractorForm contractor={state.contractor || null} />
          </Stack>
          <CompensationForm />
        </HStack>
      </ViewLayout>
    </>
  );
};

export default ManageContractor;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;
  const { data: contractor } = await trpc.team.getSingleContractor.useQuery(id);
  return {
    props: {
      requireAuth: false,
      enableAuth: false,
      contractorData: contractor,
    },
  };
};
