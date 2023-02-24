import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import ViewLayout from "../../components/core/ViewLayout";
import { ChevronRight, CreateIcon, InstantPayment } from "./ProviderIcons";
import CustomTable from "components/CustomTable";

const Card = ({
  heading,
  text,
  icon,
}: {
  heading: string;
  text: string;
  icon: JSX.Element;
}) => (
  <Flex
    bg="white"
    justify="space-between"
    align="center"
    p={5}
    rounded="xl"
    border="1px solid #D2D2D2"
  >
    <VStack align="left" spacing={0.5}>
      <Heading as="h4" size="xs" fontSize="xl">
        {heading}
      </Heading>
      <Text color="lightgrey">{text}</Text>
    </VStack>
    {icon}
  </Flex>
);

interface IPayrollData {
  id: number;
  description: string;
  dueDate?: string;
  paidOn: string;
  status?: string;
}
const payrollData = [
  {
    id: 1,
    decription: "Monthly Salary for December ",
    amount: "$17,949.28",
    dueDate: "Dec 28, 2022",
    paidOn: "Dec 28, 2022",
    status: "On-time",
  },
  {
    id: 1,
    decription: "Contractor Payout for Q4 Milestone",
    amount: "$3625.75",
    paidOn: "Dec 15, 2022",
  },
  {
    id: 1,
    decription: "Monthly Salary for November",
    amount: "$17,949.28",
    dueDate: "Nov 28, 2022",
    paidOn: "Nov 30, 2022",
    status: "Late",
  },
  {
    id: 1,
    decription: "Monthly Salary for October",
    amount: "$17,949.28",
    dueDate: "Oct 28, 2022",
    paidOn: "Oct 27, 2022",
    status: "Early",
  },
  {
    id: 1,
    decription: "Monthly Salary for September",
    amount: "$15,200.00",
    dueDate: "Dec 28, 2022",
    paidOn: "Sep 28, 2022",
    status: "On Time",
  },
];

const payrollColumns = [
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
    name: "Amount",
    selector: "amount",
  },
  {
    id: 4,
    name: "Due Date",
    selector: "dueDate",
  },
  {
    id: 5,
    name: "Paid On",
    selector: "paidOn",
  },
  {
    id: 6,
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

const PayrollTypeCard = ({
  type,
  date,
  text,
  amount,
}: {
  type: string;
  date: string;
  text: string;
  amount: number;
}) => (
  <VStack bg="brand.700" color="white" align="left" p={4} rounded="xl">
    <Flex justify="space-between">
      <Text fontWeight={700}>{type}</Text>
      <Text color="dirtywhite" fontSize="xs">
        {date}{" "}
      </Text>
    </Flex>
    <Box>
      <Text fontWeight={700} fontSize="3xl">{`USD ${amount}`}</Text>
      <Text fontSize="xs" color="dirtywhite">
        {text}
      </Text>
    </Box>
  </VStack>
);
const Payrol = () => {

  return (
    <ViewLayout title="Payroll">
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          <GridItem>
            <Card
              heading="Create Payroll"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit."
              icon={<CreateIcon />}
            />
          </GridItem>
          <GridItem>
            <Card
              heading="One-Off Payment"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit."
              icon={<InstantPayment />}
            />
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={5} mt={8}>
          <PayrollTypeCard
            type="Fiat Payroll"
            date="Jan, 2023"
            text="Dollar equivalent of fiat-based payroll"
            amount={0.0}
          />
          <PayrollTypeCard
            type="Crypto Payrolll"
            date="Jan, 2023"
            text="Dollar equivalent of fiat-based payroll"
            amount={0.0}
          />
          <VStack bg="brand.100" align="left" p={4} rounded="xl" spacing={3}>
            <Box>
              <Text fontWeight={700}>Make Payment</Text>

              <Text fontSize="xs">
                Edit payroll, pay employees and contractors
              </Text>
            </Box>

            <Button
              bg="#010C14"
              color="white"
              rightIcon={<ChevronRight boxSize={4} />}
              iconSpacing="3"
              w="fit-content"
              _hover={{ hover: "none" }}
            >
              Manage Payroll
            </Button>
          </VStack>
        </Grid>
      </Box>
      <Stack
        rounded="md"
        p={6}
        bg="white"
        w="100%"
        mt={10}
        border="1px solid #D2D2D2"
      >
        <Heading as="h4" size="xs" fontSize="xl">
          Payroll History
        </Heading>
        <CustomTable
          columns={payrollColumns}
          data={payrollData}
          emptyStateInfo="No Payroll History"
        />
      </Stack>
    </ViewLayout>
  );
};

export default Payrol;
