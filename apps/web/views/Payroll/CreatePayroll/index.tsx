import {
  HStack,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  Center,
  Input,
  Select,
} from "@chakra-ui/react";
import ViewLayout from "../../../components/core/ViewLayout";

import { FiChevronRight, FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import {
  FormInput,
  FormNativeSelect,
  useForm,
  FormCheckbox,
} from "../../../components/forms";
import z from "zod";
import { SalaryProgress } from "../utils/misc";
import { createPayrollData } from "../utils/dummyData";
import { useEffect, useMemo, useState } from "react";
import { EmptyEmployeeImage } from "../../Employees/ProviderIcons";
import { createPayrollColumns } from "../utils/tableColumns";
import RowSelectTable from "../../../components/CustomTable/RowSelectTable";
import { createPayrollPath } from "../routes";

export const createPayrollValidationSchema = z.object({
  title: z.string().email(),
  cycle: z.string().min(1, { message: "Required" }),
  paymentDate: z.string().min(1, { message: "Required" }),
  automaticPayment: z.boolean(),
});

type FormInputOptions = z.infer<typeof createPayrollValidationSchema>;

const CreatePayroll = () => {
  const { pathname } = useRouter();
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDepartment, setSelectedDepartment] =
    useState("All departments");

  const handleSelectionChange = (selection: any) => {
    setSelectedRowIds(selection);
  };

  const handleSelectedRowsAmountChange = (amount: number) => {
    setTotalAmount(amount);
  };

  const selectedRows = useMemo(
    () =>
      tableData.filter((row: any) => {
        // @ts-ignore
        return selectedRowIds[row.id];
      }),
    [selectedRowIds, tableData]
  );

  useEffect(() => {
    if (createPayrollData) {
      // @ts-ignore
      setTableData(createPayrollData);
    }
  }, []);

  useEffect(() => {
    let filteredData = createPayrollData;
    if (selectedDepartment !== "All departments") {
      filteredData = createPayrollData.filter(
        (data) =>
          data?.department?.toLowerCase() === selectedDepartment.toLowerCase()
      );
    }
    const searchData = filteredData.filter((data) =>
      data?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    // @ts-ignore
    setTableData(searchData as {}[]);
  }, [searchTerm, selectedDepartment]);

  useEffect(() => {
    const selectedAmounts = selectedRows.map((row: any) => row.grossPay);
    const total = selectedAmounts.reduce((sum: number, amount: number) => {
      return sum + amount;
    }, 0);
    handleSelectedRowsAmountChange(total);
  }, [selectedRows]);

  const departmentOptions = useMemo(
    () => ["All departments", "Tech", "Finance", "Operations"],
    []
  );

  const { renderForm } = useForm<FormInputOptions>({
    // onSubmit: handleSubmit,
    // defaultValues: { email: "" },
    // schema: addContractorValidationSchema,
  });

  console.log("selectedId", selectedRowIds);

  const totalSalaries = useMemo(() => {
    return tableData.reduce((total, { grossPay }) => total + grossPay, 0);
  }, [tableData]);

  const salaryPercentage = Math.round((totalAmount / totalSalaries) * 100);
  console.log("totalSalaries", totalSalaries);
  console.log("salaryPercentage", salaryPercentage);
  const selectedEmployees = Object.keys(selectedRowIds).length;
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
              href={createPayrollPath}
              color={pathname === createPayrollPath ? "black" : "lightgrey"}
              isCurrentPage={true}
            >
              Create Employee Payroll
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
                    No Payment History
                  </Text>
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
                  {tableData?.length > 0 ? (
                    <>
                      <RowSelectTable
                        // @ts-ignore
                        columns={createPayrollColumns}
                        data={tableData}
                        onRowSelectionChange={handleSelectionChange}
                        onSelectedRowsAmountChange={
                          handleSelectedRowsAmountChange
                        }
                      />
                    </>
                  ) : (
                    <Center w="100%" p="8" flexDirection={"column"}>
                      <EmptyEmployeeImage />
                      <Text pr="12" pt="2">
                        No result found for search
                      </Text>
                    </Center>
                  )}
                </>
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
            <VStack
              spacing={1}
              align="left"
              bg="brand.700"
              color="white"
              rounded="md"
              p={4}
            >
              <Text>Payroll Burden</Text>
              <Text fontSize="xl" fontWeight={700}>
                {`USD ${totalSalaries}`}
              </Text>
            </VStack>
            <SalaryProgress
              color="#2EC4B6"
              label="Salary"
              amount={totalAmount}
              value={salaryPercentage}
            />
            <Flex justify="space-between">
              <Heading as="h4" size="xs" fontSize="md">
                Selected Employee(s)
              </Heading>
              <Text>{selectedEmployees}</Text>
            </Flex>
            <Flex justify="center" mt={6}>
              <Button
                bg="brand.700"
                color="white"
                iconSpacing="3"
                w="100%"
                _hover={{ hover: "none" }}
                isDisabled={selectedEmployees > 0 ? false : true}
              >
                Create Payroll
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </ViewLayout>
    </>
  );
};

export default CreatePayroll;
