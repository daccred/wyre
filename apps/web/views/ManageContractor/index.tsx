import {
  HStack,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import ViewLayout from "../../components/core/ViewLayout";
import ContractorForm from "./ContractorForm";
import CompensationForm from "./CompensationForm";
import { FiChevronRight } from "react-icons/fi";

const ManageContractor = () => {
  return (
    <>
      <ViewLayout title="Contractors">
        <Breadcrumb
          fontSize={"xs"}
          separator={<FiChevronRight color="#d2d2d2" fontSize={"16px"} />}
          pb="2"
          fontWeight={"semibold"}
        >
          <BreadcrumbItem>
            <BreadcrumbLink color={"lightgrey"}>Contractor</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
            // href='#'
            >
              Bright Ephraim
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack gap="4" alignItems={"flex-start"}>
          <Stack
            borderRadius={"15px"}
            border={"1px solid"}
            borderColor="bordergrey"
            p="4"
            bg={"white"}
            w="70%"
          >
            <ContractorForm />
          </Stack>
          <CompensationForm />
        </HStack>
      </ViewLayout>
    </>
  );
};

export default ManageContractor;
