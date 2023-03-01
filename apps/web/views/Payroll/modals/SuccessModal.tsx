import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const SuccessModal = ({
  closeSuccessModal,
  successModalIsOpen,
  message
}: {
  closeSuccessModal: () => void;
  successModalIsOpen: boolean;
  message: string
}) => {
  return (
    <Modal
      onClose={closeSuccessModal}
      isOpen={successModalIsOpen}
      isCentered
      size="sm"
    >
      <ModalOverlay />
      <ModalContent w="100%">
      <ModalCloseButton m="1">
        <IoCloseCircleOutline fontSize={"28px"} />
      </ModalCloseButton>
        <ModalBody m={4}>
          <VStack spacing={4}>
            <Text fontWeight={700} fontSize="xl" textAlign='center'>
            {message}
            </Text>
            <Image src="/addEmployeeSuccess.png" alt="" w="40" />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
