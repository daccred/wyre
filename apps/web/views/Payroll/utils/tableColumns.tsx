import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Text,
  Icon,
  Box,
} from "@chakra-ui/react";
import moment from "moment";
import { Row } from "react-table";
import { CheckedIcon } from "../ProviderIcons";

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
        }
      >
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
        <Avatar
          size="sm"
          src={
            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          }
        />
        <Text ml={2}>{row?.name} </Text>
      </Flex>
    ),
  },
  {
    Header: "Department",
    accessor: (row: any) => (
      <Text textTransform="capitalize">{row?.department}</Text>
    ),
  },
  {
    Header: "Job Role",
    accessor: (row: any) => (
      <Text textTransform="capitalize">{row?.jobRole} </Text>
    ),
  },
  {
    Header: "Salary",
    accessor: (row: any) => <Text>{row?.salary} </Text>,
  },
  {
    Header: "Status",
    accessor: (row: any) => (
      <Text>{row?.status === true ? "Active" : "Inactive"} </Text>
    ),
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
    accessor: (row: any) => (
      <Text color="#0AAF60">{`+${row?.commission}`}</Text>
    ),
  },

  {
    Header: "Bonus",
    accessor: (row: any) => <Text color="#0AAF60">{`+$ ${row?.bonus}`} </Text>,
  },

  {
    Header: "Deduction",
    accessor: (row: any) => (
      <Text color="#E71D36">{`-$${row?.deduction}`}</Text>
    ),
  },
];
