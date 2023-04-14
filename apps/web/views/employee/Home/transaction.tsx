import { Text, Flex, Box, Center } from '@chakra-ui/react';
import React, { useReducer } from 'react';
import { FormSelect } from '@wyrecc/components';
import { useForm } from '@wyrecc/components/forms';
import { EmptyPayrollImage } from './providerIcon';
import TransactionsList from './transactionList';

type Transaction = {
  id: number;
  description: string;
  dateTime: string;
  amount: string;
  icon: string;
  created_at: string;
  incomeTax: string;
  healthInsurance: string;
  pension: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    description: 'Consultancy Fee for Services Rendered',
    dateTime: '11:00 AM',
    amount: 'USD 2,500.00',
    icon: '',
    created_at: '5 January, 2023',
    incomeTax: 'USD 100.00',
    healthInsurance: 'USD 25.00',
    pension: 'USD 50.00',
  },
  {
    id: 2,
    description: 'Monthly Salary for October',
    dateTime: '10:00 AM',
    amount: 'USD 3,750.00',
    icon: '',
    created_at: '31 October, 2022',
    incomeTax: 'USD 125.00',
    healthInsurance: 'USD 35.00',
    pension: 'USD 50.00',
  },
  {
    id: 3,
    description: 'Contract Payment for Completed Project',
    dateTime: '2:30 PM',
    amount: 'USD 8,000.00',
    icon: '',
    created_at: '17 February, 2023',
    incomeTax: 'USD 320.00',
    healthInsurance: 'USD 80.00',
    pension: 'USD 160.00',
  },
  {
    id: 4,
    description: 'Payment for Freelance Writing Services',
    dateTime: '9:00 AM',
    amount: 'USD 600.00',
    icon: '',
    created_at: '10 March, 2023',
    incomeTax: 'USD 30.00',
    healthInsurance: 'USD 0.00',
    pension: 'USD 0.00',
  },
  {
    id: 5,
    description: 'Monthly Salary for November',
    dateTime: '11:00 AM',
    amount: 'USD 4,000.00',
    icon: '',
    created_at: '30 November, 2022',
    incomeTax: 'USD 200.00',
    healthInsurance: 'USD 50.00',
    pension: 'USD 100.00',
  },
  {
    id: 6,
    description: 'Payment for Graphic Design Services',
    dateTime: '3:30 PM',
    amount: 'USD 1,200.00',
    icon: '',
    created_at: '21 February, 2023',
    incomeTax: 'USD 60.00',
    healthInsurance: 'USD 0.00',
    pension: 'USD 0.00',
  },
  {
    id: 7,
    description: 'Payment for Consulting Services',
    dateTime: '2:00 PM',
    amount: 'USD 3,000.00',
    icon: '',
    created_at: '10 January, 2023',
    incomeTax: 'USD 150.00',
    healthInsurance: 'USD 75.00',
    pension: 'USD 150.00',
  },
];

type TransactionsState = {
  transactions: Transaction[];
  isLoading: boolean;
};

type TransactionsAction =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_LOADING'; payload: boolean };

const transactionsReducer = (state: TransactionsState, action: TransactionsAction) => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const Transactions = () => {
  const [state, dispatch] = useReducer(transactionsReducer, { transactions, isLoading: false });

  const { renderForm } = useForm({
    // onSubmit: () => {},
  });

  return renderForm(
    <Box>
      <Flex align="center" justifyContent="space-between">
        <Text fontSize="28px" fontWeight="bold" color="#210D35" my="4">
          Transactions
        </Text>
        <Box>
          <FormSelect
            name="mySelect"
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
            onChange={(value: any) => console.log(value)}
            width="70px"
          />
        </Box>
      </Flex>
      <Box>
        {state.transactions && state.transactions.length > 0 ? (
          <TransactionsList transactions={state.transactions} isLoading={state.isLoading} />
        ) : (
          <Center w="100%" my={20} flexDirection="column">
            <EmptyPayrollImage />
            <Text pt="3">No Payroll History</Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default Transactions;
