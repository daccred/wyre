import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import { Bank, CryptoWallet, Mobile } from "@wyrecc/components/core/providerIcon";

import { Card } from "./misc";

interface IPayrollType {
  closePaymentMethodModal: () => void;
  paymentMethodModalIsOpen: boolean;
}
const PaymentMethodType = ({ closePaymentMethodModal, paymentMethodModalIsOpen }: IPayrollType) => {
  const router = useRouter();

  return (
    <Modal
      onClose={closePaymentMethodModal}
      isOpen={paymentMethodModalIsOpen}
      closeOnOverlayClick={false}
      isCentered
      size="md">
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalHeader fontWeight="bold" fontSize="18px">
          Select Payment Method
        </ModalHeader>
        <ModalCloseButton m="1">
          <IoCloseCircleOutline fontSize="28px" />
        </ModalCloseButton>
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <Card
              heading="Crypto Wallet"
              text="Cursus diam amet non arcu in ultricies a fringilla"
              icon={<CryptoWallet boxSize={8} color="primary.500" />}
              headingFontSize="md"
              textFontSize="sm"
              padding={3}
              bg="brand.100"
              border="none"
              hoverBg="brand.700"
              hoverColor="white"
              onClick={() => router.push("/employee/account/payment-method/crypto-payment-method")}
            />
            <Card
              heading="Bank Account"
              text="Cursus diam amet non arcu in ultricies a fringilla"
              icon={<Bank boxSize={8} color="primary.500" />}
              headingFontSize="md"
              textFontSize="sm"
              padding={3}
              bg="brand.100"
              border="none"
              hoverBg="brand.700"
              hoverColor="white"
              onClick={() => router.push("/employee/account/payment-method/bank-payment-method")}
            />
            <Card
              heading="Mobile Money"
              text="Cursus diam amet non arcu in ultricies a fringilla"
              icon={<Mobile boxSize={8} color="primary.500" />}
              headingFontSize="md"
              textFontSize="sm"
              padding={3}
              bg="brand.100"
              border="none"
              hoverBg="brand.700"
              hoverColor="white"
              onClick={() => router.push("/employee/account/payment-method/mobile-money-payment-method")}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentMethodType;
