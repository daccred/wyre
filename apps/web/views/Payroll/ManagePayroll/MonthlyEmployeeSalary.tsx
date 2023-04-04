import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { Team } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useMemo, useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import type z from "zod";

import { FormInput, FormNativeSelect, useForm } from "../../../components";
import RowSelectTable from "../../../components/CustomTable/RowSelectTable";
import ViewLayout from "../../../components/core/ViewLayout";
import FormDateInput from "../../../components/forms/components/FormDateInput";
import { trpc } from "../../../utils/trpc";
import { EmptyEmployeeImage } from "../../Employees/ProviderIcons";
import SuccessModal from "../modals/SuccessModal";
import SuspendPayroll from "../modals/SuspendPayroll";
import { employeeSalaryPath, managePayrollPath } from "../routes";
import { createPayrollValidationSchema } from "../utils/misc";
import { monthlyPayrollColumns } from "../utils/tableColumns";

type FormInputOptions = z.infer<typeof createPayrollValidationSchema>;

const MonthlyEmployeeSalary = () => {
  const { pathname } = useRouter();
  const [tableData, setTableData] = useState<Team[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All departments");
  const [suspendPayroll, setSuspendPayroll] = useState(false);

  const modalMessage = suspendPayroll
    ? "Your payroll has been suspended"
    : "Your payment is being processed right away";

  // Get Data from previous page
  const router = useRouter();
  const rowId = router.query;

  //TODO: Why default values doesn't work with this??
  const { data: payroll } = trpc.payroll.getSinglePayroll.useQuery({
    id: rowId?.id as string,
  });

  const employeeData = payroll && payroll.employees;

  // handles row select in table
  const handleSelectionChange = (selection: any) => {
    setSelectedRowIds(selection);
  };

  // handles selected row amount in table
  const handleSelectedRowsAmountChange = (amount: number) => {
    setTotalAmount(amount);
  };

  const selectedRows = useMemo(
    () =>
      tableData.filter((row: any) => {
        return selectedRowIds[row.id];
      }),
    [selectedRowIds, tableData]
  );

  useEffect(() => {
    if (!employeeData) {
      return;
    }

    setTableData(employeeData as Team[]);
  }, [employeeData]);

  // For table search and filter
  useEffect(() => {
    if (!employeeData) {
      return;
    }

    let filteredData = employeeData;
    if (selectedDepartment !== "All departments") {
      filteredData = employeeData?.filter(
        (data) => data?.department?.toLowerCase() === selectedDepartment?.toLowerCase()
      );
    }
    const searchData = filteredData?.filter((data) =>
      data?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setTableData(searchData);
  }, [employeeData, searchTerm, selectedDepartment]);

  // To get the total amount of salaries of selected employees
  useEffect(() => {
    const selectedAmounts = selectedRows.map((row: any) => row.salary);
    const total = selectedAmounts.reduce((sum: number, amount: number) => {
      return sum + amount;
    }, 0);
    handleSelectedRowsAmountChange(total);
  }, [selectedRows]);

  const departmentOptions = useMemo(() => ["All departments", "Tech", "Finance", "Operations"], []);

  // Get total salaries from the table
  const totalSalaries = useMemo(() => {
    return tableData.reduce((total, { salary }) => total + Number(salary), 0);
  }, [tableData]);

  const totalEmployeesSelected = Object.keys(selectedEmployees).length;

  const toast = useToast();

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

  const { mutate: updatePayroll, isLoading } = trpc.payroll.updatePayroll.useMutation({
    onSuccess(data: any) {
      // Reset the form data to empty values
      openSuccessModal();
    },
    onError(error: any) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
    },
  });

  const handleSubmit = async (data: FormInputOptions) => {
    try {
      updatePayroll({
        payrollId: payroll?.id as string,
        data: {
          title: data.title,
          cycle: data.cycle,
          auto: data.auto,
          payday: data.payday,
          currency: data.currency,
          burden: totalSalaries,
          employees: selectedEmployees,
          suspend: data.suspend,
        },
      });
    } catch (error) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
    }
  };

  const { renderForm, setFormValue } = useForm<FormInputOptions>({
    onSubmit: handleSubmit,
    schema: createPayrollValidationSchema,
  });
  useEffect(() => {
    if (payroll) {
      setFormValue("title", payroll?.title);
      setFormValue("cycle", payroll?.cycle as "daily" | "bi-weekly" | "monthly");
      setFormValue("auto", payroll?.auto);
      // TODO: date doesn't show in input field
      setFormValue("payday", payroll?.payday);

      setFormValue("currency", payroll?.currency);

      setFormValue("suspend", suspendPayroll);
    }
  }, [payroll, setFormValue, suspendPayroll]);

  return (
    <>
      <ViewLayout title="Payroll">
        <Breadcrumb
          fontSize="sm"
          separator={<FiChevronRight color="#d2d2d2" fontSize="16px" />}
          pb="2"
          fontWeight="semibold"
          color="lightgrey">
          <BreadcrumbItem>
            <BreadcrumbLink href="/payroll">Payroll</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={managePayrollPath}
              color={pathname === managePayrollPath ? "black" : "lightgrey"}>
              Manage Payroll
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={employeeSalaryPath}
              color={pathname === employeeSalaryPath ? "black" : "lightgrey"}
              isCurrentPage={true}>
              Monthly Employee Salary
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {renderForm(
          <Grid templateColumns="69% 30%" gap={4} mt={4}>
            <GridItem border="1px solid #D2D2D2" rounded="xl" bg="white" p={4}>
              <Heading as="h4" size="xs" fontSize="xl">
                Active Payroll
              </Heading>
              <Stack spacing="6" pb="4">
                <Stack>
                  <FormInput name="title" label="Payroll Details" placeholder="Title" />
                  <HStack>
                    <FormNativeSelect
                      name="cycle"
                      label="Payment Cycle"
                      placeholder="Payment Cycle"
                      options={[
                        { label: "Daily", value: "daily" },
                        { label: "Bi-Weekly", value: "bi-weekly" },
                        { label: "Monthly", value: "monthly" },
                      ]}
                    />

                    <FormDateInput name="payday" label="Payment Date" />
                  </HStack>
                </Stack>
                <Checkbox name="auto" colorScheme="purple" size="md">
                  Allow automatic payment of payroll on due date
                </Checkbox>
              </Stack>
              <Box mt={6}>
                <Heading as="h4" size="xs" fontSize="xl">
                  Add Employee(s)
                </Heading>
                {employeeData && employeeData.length > 0 ? (
                  <>
                    <Grid templateColumns="30% 25%" justifyContent="space-between" my={6}>
                      <GridItem>
                        <HStack gap="1">
                          <FiSearch fontSize="24px" />
                          <Input
                            variant="unstyled"
                            border="0"
                            borderBottom="1px solid"
                            borderRadius={0}
                            h={12}
                            fontSize="sm"
                            placeholder="Search Employee"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <Select
                          value={selectedDepartment}
                          onChange={(event) => setSelectedDepartment(event.target.value)}>
                          {departmentOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </GridItem>
                    </Grid>
                    {tableData?.length > 0 ? (
                      <RowSelectTable
                        columns={monthlyPayrollColumns as unknown[]}
                        data={tableData}
                        onRowSelectionChange={handleSelectionChange}
                        onSelectedRowsAmountChange={handleSelectedRowsAmountChange}
                        setSelectedEmployees={setSelectedEmployees}
                      />
                    ) : (
                      <Center my={10}>
                        <Text>No result found for your search</Text>
                      </Center>
                    )}
                  </>
                ) : (
                  <Center w="100%" p="8" flexDirection="column">
                    <EmptyEmployeeImage />
                    <Text pr="12" pt={2}>
                      No Employee Selected for this Payroll
                    </Text>
                  </Center>
                )}
              </Box>
            </GridItem>

            <GridItem border="1px solid #D2D2D2" rounded="xl" bg="white" p={4} height="fit-content">
              <Heading as="h4" size="xs" fontSize="xl">
                Summary
              </Heading>

              <Box my={8}>
                <Flex justify="space-between">
                  <Heading as="h4" size="xs" fontSize="md">
                    Employee Count
                  </Heading>
                  <Text fontWeight={700}>{totalEmployeesSelected} </Text>
                </Flex>
                <Flex justify="space-between">
                  <Heading as="h4" size="xs" fontSize="md">
                    Total Amount
                  </Heading>
                  <Text fontWeight={700}> {`USD ${totalAmount}`}</Text>
                </Flex>
              </Box>
              <VStack mt={6} spacing={4}>
                <Button
                  bg="brand.700"
                  color="white"
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Submitting"
                  iconSpacing="3"
                  w="100%"
                  _hover={{ hover: "none" }}
                  isDisabled={totalEmployeesSelected > 0 ? false : true}>
                  Run Payroll
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  color="brand.700"
                  borderColor="brand.700"
                  iconSpacing="3"
                  w="100%"
                  _hover={{ hover: "none" }}
                  onClick={() => setSuspendPayroll(true)}>
                  Suspend Payroll
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        )}

        <SuspendPayroll
          suspendPayrolleModalIsOpen={suspendPayrolleModalIsOpen}
          closeSuspendPayrollModal={closeSuspendPayrollModal}
        />
        <SuccessModal
          successModalIsOpen={successModalIsOpen}
          closeSuccessModal={closeSuccessModal}
          message={modalMessage}
          pathname="/payroll/manage-payroll"
        />
      </ViewLayout>
    </>
  );
};

export default MonthlyEmployeeSalary;
