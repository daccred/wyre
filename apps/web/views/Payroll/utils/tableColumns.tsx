import { Button, Text } from "@chakra-ui/react";

export const payrollColumns = [
    {
      id: 1,
      name: "Payroll Description",
      selector: "decription",
    },
    {
      id: 2,
      name: "Amount",
      selector: "amount",
    },
    {
      id: 3,
      name: "Due Date",
      selector: "dueDate",
    },
    {
      id: 4,
      name: "Paid On",
      selector: "paidOn",
    },
    {
      id: 5,
      name: "Status",
      selector: (row: any) => (
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
      id: 1,
      name: "Full Name",
      selector: "name",
    },
    {
      id: 2,
      name: "Department",
      selector: "department",
    },
    {
      id: 3,
      name: "Job Role",
      selector: "role",
    },
    {
      id: 4,
      name: "Status",
      selector: "status",
    },
  ];
  
  
  
  export const managePayrollColumns = (onClick: () => void) => [
    {
      id: 1,
      name: "Pay Schedule",
      selector: "decription",
    },
    {
      id: 2,
      name: "Amount",
      selector: "amount",
    },
    {
      id: 3,
      name: "Payment Cycle",
      selector: "paymentCycle",
    },
    {
      id: 4,
      name: "Last Paid",
      selector: "paidOn",
    },
    {
      id: 5,
      name: "Action",
      selector: (row: any) => (
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
      id: 1,
      name: "Full Name",
      selector: "name",
    },
    {
      id: 2,
      name: "Department",
      selector: "department",
    },
    {
      id: 3,
      name: "Gross Pay",
      selector: (row: any) => (
        <Text color=' #0AAF60'>{row?.grossPay} </Text>
      ) ,
    },
    {
        id: 4,
        name: "Bonus",
        selector: (row: any) => (
          <Text color=' #0AAF60'>{row?.bonus} </Text>
        ) ,
      },

     
    {
      id: 4,
      name: "Commision",
      selector: (row: any) => (
        <Text color=' #E71D36'>{row?.commission}</Text>
      ),
    },
    {
        id: 5,
        name: "Deduction",
        selector: "deduction",
      },
  
  ];