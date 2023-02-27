import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import useHover from "components/hooks/useHover";
import { useRef } from "react";

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

export const Card = ({
  heading,
  text,
  icon,
  onClick,
  headingFontSize,
  textFontSize,
  padding,
  bg,
  border,
  hoverBg,
  hoverColor,
}: {
  heading: string;
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
  headingFontSize?: string;
  textFontSize?: string;
  padding?: number;
  bg?: string;
  border?: string;
  hoverColor?: string;
  hoverBg?: string;
}) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  return (
    <Flex
      bg={bg || "white"}
      justify="space-between"
      align="center"
      p={padding || 3}
      rounded="xl"
      border={border || "1px solid #D2D2D2"}
      width="full"
      _hover={{ bg: hoverBg, color: hoverColor }}
      cursor="pointer"
      onClick={onClick}
      ref={ref}
    >
      <VStack align="left" spacing={0.5}>
        <Heading as="h4" size="xs" fontSize={headingFontSize || "xl"}>
          {heading}
        </Heading>
        <Text
          color={isHovered ? hoverColor : "lightgrey"}
          fontSize={textFontSize || "md"}
        >
          {text}
        </Text>
      </VStack>
      <Box>{icon}</Box>
    </Flex>
  );
};

export const PayrollTypeCard = ({
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

export const SalaryProgress = ({
  label,
  amount,
  color,
  percentage,
  value
}: {
  label: string;
  amount: number;
  color: string;
  percentage?: number;
  value?: number
}) => (
  <Flex justify="space-between" align="center" my={4}>
    <Box>
      <Heading as="h4" size="xs" fontSize="md">
        {label}
      </Heading>
      <Text>{`USD ${amount}`}</Text>
    </Box>
    <Box>
      <CircularProgress value={value || 0} color={color}>
        <CircularProgressLabel color={color} fontWeight={700}>
          {`${percentage || 0}%`}
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  </Flex>
);
