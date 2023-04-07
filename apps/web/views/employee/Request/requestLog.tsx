import { Text, Flex, Box, Center } from "@chakra-ui/react";
import React, { useReducer } from "react";

import { FormSelect } from "@wyrecc/components";
import { useForm } from "@wyrecc/components/forms";

import LogList from "./logList";
import { EmptyReinbursementImage } from "./providerIcon";

type Request = {
  id: number;
  description: string;
  dateTime: string;
  amount: string;
  icon: string;
  created_at: string;
  status: string;
};

const requests: Request[] = [
  {
    id: 1,
    description: "Consultancy Fee for Services Rendered",
    dateTime: "11:00 AM",
    amount: "USD 2,500.00",
    icon: "",
    created_at: "5 January, 2023",
    status: "pending",
  },
  {
    id: 2,
    description: "Return ticket from tech summit",
    dateTime: "10:00 AM",
    amount: "USD 3,750.00",
    icon: "",
    created_at: "31 October, 2022",
    status: "approved",
  },
  {
    id: 3,
    description: "Contract Payment for Completed Project",
    dateTime: "2:30 PM",
    amount: "USD 8,000.00",
    icon: "",
    created_at: "17 February, 2023",
    status: "pending",
  },
  {
    id: 4,
    description: "Payment for Freelance Writing Services",
    dateTime: "9:00 AM",
    amount: "USD 600.00",
    icon: "",
    created_at: "10 March, 2023",
    status: "approved",
  },
];

type RequestState = {
  requests: Request[];
  isLoading: boolean;
};

type TransactionsAction =
  | { type: "SET_TRANSACTIONS"; payload: Request[] }
  | { type: "SET_LOADING"; payload: boolean };

const requestsReducer = (state: RequestState, action: TransactionsAction) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return { ...state, requests: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const Transactions = () => {
  const [state, dispatch] = useReducer(requestsReducer, { requests, isLoading: false });

  const { renderForm } = useForm({
    // onSubmit: () => {},
  });

  return renderForm(
    <Box my={10}>
      <Flex align="center" justifyContent="space-between">
        <Text fontSize="28px" fontWeight="bold" color="#210D35" my="4">
          Request Log
        </Text>
        <Box>
          <FormSelect
            name="mySelect"
            options={[
              { label: "All Month", value: "monthly" },
              { label: "Yearly", value: "yearly" },
            ]}
            onChange={(value: unknown) => console.log(value)}
            width="70px"
          />
        </Box>
      </Flex>
      <Box>
        {state.requests && state.requests.length > 0 ? (
          <LogList requests={state.requests} isLoading={state.isLoading} />
        ) : (
          <Center w="100%" my={20} flexDirection="column">
            <EmptyReinbursementImage />
            <Text pt="3">No Reinbursement History</Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default Transactions;
