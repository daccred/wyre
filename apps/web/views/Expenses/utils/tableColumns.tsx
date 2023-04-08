import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import moment from 'moment';
import { IoCloseCircleOutline } from 'react-icons/io5';

import ManageExpenseModal from '../modals/ManageExpenseModal';

export const textTruncate = (length: number, string: string) => {
  const truncatedText = `${string?.substring(0, length)} ...`;
  return string?.length >= length ? truncatedText : string;
};

export const expensesColumn = [
  {
    id: 1,
    Header: 'Full Name',
    accessor: (row: any) => (
      <Flex align="center">
        <Avatar
          size="sm"
          src={row?.imgURL}
          name={row?.employee?.firstName || row?.employee?.lastName}
          bg="brand.700"
          color="white"
        />
        <Text ml={2}>{row?.employee?.firstName || row?.employee?.lastName} </Text>
      </Flex>
    ),
  },
  {
    id: 2,
    Header: 'Expense Type',
    accessor: 'type',
  },

  {
    id: 3,
    Header: 'Amount',
    accessor: (row: any) => <Text>{`USD ${row?.amount}`} </Text>,
  },
  {
    id: 4,
    Header: 'Payment Method',
    accessor: (row: any) => (
      <Box textTransform="capitalize">{row?.employee?.payrollMethod?.toLowerCase()}</Box>
    ),
  },

  {
    id: 5,
    Header: 'Time & Date',
    accessor: (row: any) => (
      <Text>{`${moment(row?.date).format('LT')} , ${moment(row?.date).format('LL')}`} </Text>
    ),
  },
  {
    id: 6,
    Header: 'Status',
    accessor: (row: any) => (
      <Text
        fontWeight={600}
        color={
          row?.status === 'Approved' ? '#0AAF60' : row?.status === 'Disapproved' ? '#E71D36' : '#FF951C'
        }>
        {row?.status}
      </Text>
    ),
  },
];

export const manageExpensesColumn = (
  viewImageModalIsOpen: boolean,
  openViewImageModal: () => void,
  closeViewImageModal: () => void,
  manageExpenseModalIsOpen: boolean,
  openManageExpenseModal: () => void,
  closeManageExpenseModal: () => void,
  selectedRowData: any,
  setSelectedRowData: React.Dispatch<React.SetStateAction<any>>,
  refetch: () => void
) => [
  {
    id: 1,
    Header: 'Full Name',
    accessor: (row: any) => (
      <Flex align="center">
        <Avatar
          size="sm"
          src={row?.imgURL}
          name={row?.employee?.firstName || row?.employee?.lastName}
          bg="brand.700"
          color="white"
        />
        <Text ml={2}>{row?.employee?.firstName || row?.employee?.lastName} </Text>
      </Flex>
    ),
  },
  {
    id: 2,
    Header: 'Expense Type',
    accessor: 'type',
  },
  {
    id: 3,
    Header: 'Purpose',
    accessor: (row: any) => (
      <Tooltip label={row?.description} hasArrow>
        <Text>{textTruncate(20, row?.description)} </Text>
      </Tooltip>
    ),
  },
  {
    id: 4,
    Header: 'Amount',
    accessor: (row: any) => <Text>{`USD ${row?.amount}`} </Text>,
  },

  {
    id: 5,
    Header: 'Attachment',
    accessor: (row: any) => (
      <>
        <Button fontSize="sm" bg="#9f9f9f26" onClick={openViewImageModal}>
          <Text textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
            {row?.attachment?.title}
          </Text>
        </Button>
        {/* View image modal */}
        <Modal onClose={closeViewImageModal} isOpen={viewImageModalIsOpen} isCentered size="xl">
          <ModalOverlay />
          <ModalContent w="100%">
            <ModalHeader fontWeight="bold" fontSize="md" pb="0">
              {row?.attachment?.title}
            </ModalHeader>
            <ModalCloseButton m="1">
              <IoCloseCircleOutline fontSize="28px" />
            </ModalCloseButton>
            <ModalBody p="4">
              <Image src={row?.attachment?.url} alt="" w="100%" />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    ),
  },
  {
    id: 6,
    Header: 'Status',
    accessor: (row: any) => (
      <>
        {row?.status === 'Pending' ? (
          <>
            <Button
              width="fit-content"
              bg="brand.700"
              color="white"
              onClick={() => {
                setSelectedRowData(row);
                openManageExpenseModal();
              }}
              _hover={{ hover: 'none' }}>
              Manage
            </Button>
            <ManageExpenseModal
              manageExpenseModalIsOpen={manageExpenseModalIsOpen}
              closeManageExpenseModal={closeManageExpenseModal}
              data={selectedRowData}
              refetch={refetch}
            />
          </>
        ) : (
          <Text fontWeight={600} color={row?.status === 'Approved' ? '#0AAF60' : '#E71D36'}>
            {row?.status}
          </Text>
        )}
      </>
    ),
  },
];

export const generateLinkColumn = [
  {
    id: 1,
    Header: 'Full Name',
    accessor: (row: any) => (
      <Flex align="center">
        <Avatar
          size="sm"
          src={row?.imgURL}
          name={row?.firstName || row?.lastName}
          bg="brand.700"
          color="white"
        />
        <Text ml={2}>{row?.firstName || row?.lastName} </Text>
      </Flex>
    ),
  },
  {
    id: 2,
    Header: 'Department',
    accessor: 'department',
  },

  {
    id: 3,
    Header: 'Job Role',
    accessor: 'jobRole',
  },
];
