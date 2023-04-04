import { Avatar, Flex, Text } from "@chakra-ui/react";
import moment from "moment";

export const payrollColumns = [
  {
    id: 1,
    Header: "Payroll Description",
    accessor: "title",
  },
  {
    id: 2,
    Header: "Amount",
    accessor: "burden",
  },

  {
    id: 3,
    Header: "Due Date",
    accessor: (row: any) => <Text>{moment(row?.payday).format("LL")} </Text>,
  },
  {
    id: 4,
    Header: "Paid At",
    accessor: (row: any) => <Text>Not Available </Text>,
  },

  {
    id: 5,
    Header: "Status",
    accessor: (row: any) => (
      <Text
        fontWeight={600}
        color={
          row?.status === "Late"
            ? "#E71D36"
            : row?.status === "Early"
            ? "#0AAF60"
            : row?.status === "On Time"
            ? "#FF951C"
            : "black"
        }>
        {row?.status ? row?.status : "-"}
      </Text>
    ),
  },
];

export const createPayrollColumns = [
  {
    Header: "Full Name",
    accessor: (row: any) => (
      <Flex align="center">
        <Avatar size="sm" src={row?.imgURL} name={row?.firstName || row?.lastName} />
        <Text ml={2}>{row?.firstName || row?.lastName} </Text>
      </Flex>
    ),
  },
  {
    Header: "Department",
    accessor: (row: any) => <Text textTransform="capitalize">{row?.department}</Text>,
  },
  {
    Header: "Job Role",
    accessor: (row: any) => <Text textTransform="capitalize">{row?.jobRole} </Text>,
  },
  {
    Header: "Salary",
    accessor: (row: any) => <Text>{row?.salary} </Text>,
  },
  {
    Header: "Status",
    accessor: (row: any) => <Text>{row?.status === true ? "Active" : "Inactive"} </Text>,
  },
];

export const managePayrollColumns = [
  {
    Header: "Pay Description",
    accessor: "title",
  },
  {
    Header: "Amount",
    accessor: "burden",
  },
  {
    Header: "Payment Cycle",
    accessor: "cycle",
  },

  // TODO: Paid on the same as pay day?
  {
    Header: "Last Paid",
    accessor: (row: any) => <Text>{moment(row?.payday).format("LL")} </Text>,
  },
];

export const employeeSalaryColumns = [
  {
    Header: "Full Name",
    accessor: "name",
  },
  {
    Header: "Department",
    accessor: "department",
  },
  {
    Header: "Gross Pay",
    accessor: (row: any) => <Text>{row?.grossPay} </Text>,
  },
  {
    Header: "Commision",
    accessor: (row: any) => <Text color="#0AAF60">{`+${row?.commission}`}</Text>,
  },

  {
    Header: "Bonus",
    accessor: (row: any) => <Text color="#0AAF60">{`+$ ${row?.bonus}`} </Text>,
  },

  {
    Header: "Deduction",
    accessor: (row: any) => <Text color="#E71D36">{`-$${row?.deduction}`}</Text>,
  },
];

export const monthlyPayrollColumns = [
  {
    Header: "Full Name",
    accessor: (row: any) => (
      <Flex align="center">
        <Avatar size="sm" src={row?.imgURL} name={row?.firstName || row?.lastName} />
        <Text ml={2}>{row?.firstName || row?.lastName} </Text>
      </Flex>
    ),
  },
  {
    Header: "Department",
    accessor: (row: any) => <Text textTransform="capitalize">{row?.department}</Text>,
  },
  {
    Header: "GrossPay",
    accessor: (row: any) => <Text>{`$ ${row?.salary}`} </Text>,
  },
  {
    Header: "Bonus",
    accessor: (row: any) => <Text color="#0AAF60">{`+$${row?.signBonus}`} </Text>,
  },
  {
    Header: "Status",
    accessor: (row: any) => <Text>{row?.status === true ? "Active" : "Inactive"} </Text>,
  },
];
