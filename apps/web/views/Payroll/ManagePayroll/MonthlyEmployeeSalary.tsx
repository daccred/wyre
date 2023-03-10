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
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ViewLayout from "../../../components/core/ViewLayout";
import React, { useEffect, useMemo, useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import { FormInput, FormNativeSelect, useForm } from "../../../components";
import { createPayrollColumns } from "../utils/tableColumns";
import { SalaryProgress } from "../utils/misc";
import z from "zod";
import { trpc } from "../../../utils/trpc";
import { Employee } from "@prisma/client";
import { CustomTable } from "../../../components/CustomTable";
import { employeeSalaryPath, managePayrollPath } from "../routes";
import SuspendPayroll from "../modals/SuspendPayroll";
import SuccessModal from "../modals/SuccessModal";

const cycleEnum = z
  .enum(["daily", "bi-weekly", "monthly"])
  .refine((value) => value != null, { message: "Cycle is required" });
const currencyEnum = z
  .enum(["USD", "GHC", "NGN", "CNY", "GBP", "EUR"])
  .refine((value) => value !== undefined, { message: "Currency is required" });

export const createPayrollValidationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  cycle: cycleEnum,
  auto: z.boolean().refine((value) => value !== undefined && value !== null, {
    message: "Auto is required",
  }),
  payday: z
    .date()
    .refine((value) => value !== null && !isNaN(value.getTime()), {
      message: "Payday is required",
    }),
  currency: currencyEnum,
  burden: z.number(),
  employees: z.array(z.string()).nonempty("Employees is required"),
});
type FormInputOptions = z.infer<typeof createPayrollValidationSchema>;

const MonthlyEmployeeSalary = () => {
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

  const { pathname } = useRouter();
  const [tableData, setTableData] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All departments");

  const departmentOptions = useMemo(
    () => ["All departments", "Tech", "Finance", "Operations"],
    []
  );

  const router = useRouter();
  const data = router.query;

  const { data: employeeData, isLoading } =
    trpc.employee.getEmployees.useQuery();

  const columns = [
    ...createPayrollColumns,
    {
      Header: "header",
      accessor: (row: any) => (
        <Checkbox name="auto" colorScheme="purple" size="md" />
      ),
    },
  ];

  useEffect(() => {
    if (!employeeData) {
      return;
    }

    setTableData(employeeData as Employee[]);
  }, [employeeData]);

  useEffect(() => {
    if (!employeeData) {
      return;
    }

    let filteredData = employeeData;
    if (selectedDepartment !== "All departments") {
      filteredData = employeeData?.filter(
        (data) =>
          data?.department?.toLowerCase() === selectedDepartment?.toLowerCase()
      );
    }
    const searchData = filteredData?.filter((data) =>
      data?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setTableData(searchData);
  }, [employeeData, searchTerm, selectedDepartment]);

  const { renderForm } = useForm<FormInputOptions>({
    // onSubmit: handleSubmit,
    schema: createPayrollValidationSchema,
    defaultValues: {
      title: data.title as string,
      cycle: data.cycle as "daily" | "bi-weekly" | "monthly",
      auto: data.auto as any,
      payday: new Date(),
      // Todo: fix currency
      currency: "USD",
      burden: 0,
      // Todo: fix this
      employees: ["Agnes"],
    },
  });

  return (
    <>
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
          {renderForm(
            <GridItem border="1px solid #D2D2D2" rounded="xl" bg="white" p={4}>
              <Heading as="h4" size="xs" fontSize="xl">
                Payroll History
              </Heading>
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
                        { label: "Bi-Weekly", value: "bi-weekly" },
                        { label: "Monthly", value: "monthly" },
                      ]}
                    />

                    <FormInput
                      name="payday"
                      label="Payment Date"
                      placeholder="Payment Date"
                      type="date"
                    />
                  </HStack>
                </Stack>
                <Checkbox name="auto" colorScheme="purple" size="md">
                  Allow automatic payment of payroll on due date
                </Checkbox>
              </Stack>
              <Stack mt={6}>
                <Heading as="h4" size="xs" fontSize="xl">
                  Add Employee(s)
                </Heading>

                {isLoading ? (
                  <Center>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Center>
                ) : (
                  <>
                    <Grid
                      templateColumns="30% 25%"
                      justifyContent="space-between"
                      my={6}
                    >
                      <GridItem>
                        <HStack gap="1">
                          <FiSearch fontSize={"24px"} />
                          <Input
                            variant={"unstyled"}
                            border={"0"}
                            borderBottom="1px solid"
                            borderRadius={0}
                            h={12}
                            fontSize={"sm"}
                            placeholder="Search Employee"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </HStack>
                      </GridItem>
                      <GridItem>
                        <Select
                          value={selectedDepartment}
                          onChange={(event) =>
                            setSelectedDepartment(event.target.value)
                          }
                        >
                          {departmentOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </GridItem>
                    </Grid>
                    <CustomTable columns={columns} data={tableData} />
                  </>
                )}
              </Stack>
            </GridItem>
          )}

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
                <Text fontWeight={700}>20</Text>
              </Flex>
              <Flex justify="space-between">
                <Heading as="h4" size="xs" fontSize="md">
                  Total Amount
                </Heading>
                <Text fontWeight={700}>USD 50</Text>
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
          message="Your payment is being processed right away"
        />
      </ViewLayout>
    </>
  );
};

export default MonthlyEmployeeSalary;
