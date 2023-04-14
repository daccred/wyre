import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { ContractorsIcon, EmployeesIcon } from '../../../components/core/ViewLayout/ProviderIcons';
import { Card } from '../utils/misc';

interface IPayrollType {
  closePayrollTypeModal: () => void;
  payrollTypeModalIsOpen: boolean;
}
const PayrollType = ({ closePayrollTypeModal, payrollTypeModalIsOpen }: IPayrollType) => {
  const router = useRouter();

  return (
    <Modal
      onClose={closePayrollTypeModal}
      isOpen={payrollTypeModalIsOpen}
      closeOnOverlayClick={false}
      isCentered
      size="sm">
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalHeader fontWeight="bold" fontSize="18px">
          Select Payroll Type
        </ModalHeader>
        <ModalCloseButton m="1">
          <IoCloseCircleOutline fontSize="28px" />
        </ModalCloseButton>
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <Card
              heading="For Employees"
              text="Make monthly or weekly payroll cycles"
              icon={<EmployeesIcon />}
              headingFontSize="md"
              textFontSize="sm"
              padding={3}
              bg="brand.100"
              border="none"
              hoverBg="brand.700"
              hoverColor="white"
              onClick={() => router.push('/payroll/create-employee-payroll')}
            />
            <Card
              heading="For Contractors"
              text="Make one-off payments and installments"
              icon={<ContractorsIcon />}
              headingFontSize="md"
              textFontSize="sm"
              padding={3}
              bg="brand.100"
              border="none"
              hoverBg="brand.700"
              hoverColor="white"
              onClick={() => router.push('/payroll/create-contractor-payroll')}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PayrollType;
