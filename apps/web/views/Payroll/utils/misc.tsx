import { Box, CircularProgress, CircularProgressLabel, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import z from "zod";

import useHover from "../../../../../packages/components/hooks/use-hover";

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
      ref={ref}>
      <VStack align="left" spacing={0.5}>
        <Heading as="h4" size="xs" fontSize={headingFontSize || "xl"}>
          {heading}
        </Heading>
        <Text color={isHovered ? hoverColor : "lightgrey"} fontSize={textFontSize || "md"}>
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
  value,
}: {
  label: string;
  amount: number | string;
  color: string;
  value?: number;
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
          {`${value || 0}%`}
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  </Flex>
);

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
  payday: z.date().refine((value) => value !== null && !isNaN(value.getTime()), {
    message: "Payday is required",
  }),
  currency: currencyEnum,
  burden: z.number().optional(),
  employees: z.array(z.string()).optional(),
  suspend: z.boolean(),
});
