import {
  HStack, 
  Stack, 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import ViewLayout from "../../components/core/ViewLayout";
import EmployeeForm from "./EmployeeForm";
import CompensationForm from "./CompensationForm";
import { FiChevronRight } from "react-icons/fi";

const ManageEmployees = () => {

  
  return (
    <>
      <ViewLayout title="Employees">
          <Breadcrumb fontSize={"xs"} separator={<FiChevronRight color='#d2d2d2' fontSize={"16px"} />} pb="2" fontWeight={"semibold"}>
            <BreadcrumbItem>
              <BreadcrumbLink color={"lightgrey"} >Employee</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink 
              // href='#'
              >Kelechi Ihenacho</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        <HStack gap="4" alignItems={"flex-start"}>
          <Stack borderRadius={"15px"} border={"1px solid"} borderColor="bordergrey" p='4' bg={'white'} w='70%'>
            <EmployeeForm/>
          </Stack>
          <CompensationForm/>
        </HStack>
        
      </ViewLayout>
    </>
  );
};

export default ManageEmployees;
