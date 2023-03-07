import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Text,
  Icon,
  Box,
} from "@chakra-ui/react";
import { CheckedIcon } from "../ProviderIcons";

export const payrollColumns = [
  {
    id: 1,
    Header: "Payroll Description",
    accessor: "decription",
  },
  {
    id: 2,
    Header: "Amount",
    accessor: "amount",
  },
  {
    id: 3,
    Header: "Due Date",
    accessor: "dueDate",
  },
  {
    id: 4,
    Header: "Paid On",
    accessor: "paidOn",
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

function CustomIcon(props: any) {
  const { isIndeterminate, isChecked, ...rest } = props;

  return <>{isChecked ? <CheckedIcon /> : null}</>;
}
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
    accessor: "department",
  },
  {
    Header: "Job Role",
    accessor: "role",
  },
  {
    Header: "Salary",
    accessor: "grossPay",
  },
  {
    Header: "Status",
    accessor: "status",
  },

  // {
  //   Header: 'header',
  //   accessor: () => (
  //     <Checkbox
  //     icon={<CustomIcon />}
  //           colorScheme='white'
  //           rounded={0}
  //           size='lg'
  //         />
  //   )
  // }
];

export const managePayrollColumns = (onClick: () => void) => [
  {
    Header: "Pay Schedule",
    accessor: "decription",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Payment Cycle",
    accessor: "paymentCycle",
  },
  {
    Header: "Last Paid",
    accessor: "paidOn",
  },
  {
    Header: "Action",
    accessor: (row: any) => (
      <Button
        bg="brand.700"
        color="white"
        iconSpacing="3"
        w="fit-content"
        _hover={{ hover: "none" }}
        onClick={onClick}
      >
        Manage
      </Button>
    ),
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
