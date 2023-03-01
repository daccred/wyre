import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ViewLayout from "components/core/ViewLayout";
import { useRouter } from "next/router";
import z from "zod";
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { createPayrollValidationSchema } from "../CreatePayroll";
import {
  FormInput,
  FormNativeSelect,
  useForm,
  FormCheckbox,
} from "../../../components/forms";
import { EmptyEmployeeImage } from "views/Employees/ProviderIcons";
import CustomTable from "components/CustomTable";
import { createPayrollData } from "../utils/dummyData";
import { employeeSalaryColumns } from "../utils/tableColumns";
import { SalaryProgress } from "../utils/misc";
import SuspendPayroll from "../modals/SuspendPayroll";
import SuccessModal from "../modals/SuccessModal";

const MonthlyEmployeeSalary = () => {
  const { pathname } = useRouter();
  const managePayrollPath = "/payroll/manage-payroll";
  const employeeSalaryPath = "/payroll/manage-payroll/monthly-employee-salary";

  const {
    isOpen: suspendPayrolleModalIsOpen,
    onOpen: openSuspendPayrollModal,
    onClose: closeSuspendPayrollModal,
  } = useDisclosure();

  const {
    isOpen: successModalIsOpen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModal,
  } = useDisclosure();

  const [defaultTableData, setDefaultTableData] = useState<unknown[]>([]);
  const [tableData, setTableData] = useState<unknown[]>([]);

  useEffect(() => {
    if (createPayrollData) {
      setDefaultTableData(createPayrollData);
      setTableData(createPayrollData);
    }
  }, []);

  type FormInputOptions = z.infer<typeof createPayrollValidationSchema>;
  const { renderForm } = useForm<FormInputOptions>({
    // onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    // schema: addContractorValidationSchema,
  });

  return (
    <ViewLayout title="Payroll">
      <Breadcrumb
        fontSize={"sm"}
        separator={<FiChevronRight color="#d2d2d2" fontSize={"16px"} />}
        pb="2"
        fontWeight={"semibold"}
        color="lightgrey"
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/payroll">Payroll</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={managePayrollPath}
            color={pathname === managePayrollPath ? "black" : "lightgrey"}
          >
            Manage Payroll
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={employeeSalaryPath}
            color={pathname === employeeSalaryPath ? "black" : "lightgrey"}
            isCurrentPage={true}
          >
            Monthly Employee Salary
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Grid templateColumns="69% 30%" gap={4} mt={4}>
        <GridItem border="1px solid #D2D2D2" rounded="xl" bg="white" p={4}>
          <Heading as="h4" size="xs" fontSize="xl">
            Payroll History
          </Heading>
          {renderForm(
            <Stack spacing={"6"} pb="4">
              <Stack>
                <FormInput
                  name="title"
                  label="Payroll Details"
                  placeholder="Title"
                />
                <HStack>
                  <FormNativeSelect
                    name="cycle"
                    label="Payment Cycle"
                    placeholder="Payment Cycle"
                    options={[
                      { label: "Daily", value: "daily" },
                      { label: "Weekly", value: "weekly" },
                      { label: "Monthly", value: "monthly" },
                      { label: "Yearly", value: "yearly" },
                    ]}
                  />

                  <FormInput
                    name="paymentDate"
                    label="Payment Date"
                    placeholder="Payment Date"
                    type="date"
                  />
                </HStack>
              </Stack>

              <FormCheckbox
                label="Allow automatic payment of payroll on due date"
                name="automaticPayment"
              />
            </Stack>
          )}
          <Stack mt={6}>
            <Heading as="h4" size="xs" fontSize="xl">
              Add Employee(s)
            </Heading>
            {createPayrollData?.length === 0 ? (
              <Center w="100%" p="8" flexDirection={"column"}>
                <EmptyEmployeeImage />
                <Text pr="12" pt="2">
                  No Employees Available
                </Text>
              </Center>
            ) : (
              <CustomTable
                columns={employeeSalaryColumns}
                data={tableData}
                defaultTableData={defaultTableData}
                emptyStateInfo="No Payroll History"
                hasSearch
                searchOptions={[
                  "All Departments",
                  "Tech",
                  "Finance",
                  "Operations",
                ]}
                setDefaultTableData={setDefaultTableData}
                setTableData={setTableData}
              />
            )}
          </Stack>
        </GridItem>
        <GridItem
          border="1px solid #D2D2D2"
          rounded="xl"
          bg="white"
          p={4}
          height="fit-content"
        >
          <Heading as="h4" size="xs" fontSize="xl">
            Summary
          </Heading>

          <SalaryProgress
            color="#2EC4B6"
            label="Fiat Burden"
            value={63}
            amount="11,308.05"
          />
          <SalaryProgress
            color="#E71D36"
            label="Crypto Burden"
            value={34}
            amount="6,102.75"
          />
          <SalaryProgress
            color="#FF951C"
            label="Employer Tax"
            value={3}
            amount="538.48"
          />
          <Box pt={20}>
            <Flex justify="space-between">
              <Heading as="h4" size="xs" fontSize="md">
                Employee Count
              </Heading>
              <Text fontWeight={700}>12</Text>
            </Flex>
            <Flex justify="space-between">
              <Heading as="h4" size="xs" fontSize="md">
                Total Amount
              </Heading>
              <Text fontWeight={700}>USD 17,979.28</Text>
            </Flex>
          </Box>
          <VStack mt={6} spacing={4}>
            <Button
              bg="brand.700"
              color="white"
              iconSpacing="3"
              w="100%"
              _hover={{ hover: "none" }}
              onClick={() => openSuccessModal()}
            >
              Run Payroll
            </Button>
            <Button
              variant="outline"
              color="brand.700"
              borderColor="brand.700"
              iconSpacing="3"
              w="100%"
              _hover={{ hover: "none" }}
              onClick={() => openSuspendPayrollModal()}
            >
              Suspend Payroll
            </Button>
          </VStack>
        </GridItem>
      </Grid>
      <SuspendPayroll
        suspendPayrolleModalIsOpen={suspendPayrolleModalIsOpen}
        closeSuspendPayrollModal={closeSuspendPayrollModal}
      />
         <SuccessModal
        successModalIsOpen={successModalIsOpen}
        closeSuccessModal={closeSuccessModal}
        message='Your payment is being processed right away'
      />
    </ViewLayout>
  );
};

export default MonthlyEmployeeSalary;
