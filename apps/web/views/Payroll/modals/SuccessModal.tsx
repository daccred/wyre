import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const SuccessModal = ({
  closeSuccessModal,
  successModalIsOpen,
  message,
  pathname,
}: {
  closeSuccessModal: () => void;
  successModalIsOpen: boolean;
  message: string;
  pathname?: string;
}) => {
  const router = useRouter();

  return (
    <Modal onClose={closeSuccessModal} isOpen={successModalIsOpen} isCentered size="sm">
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalCloseButton
          m="1"
          onClick={() => {
            onclose;
            if (pathname) {
              router.push(pathname);
            }
          }}>
          <IoCloseCircleOutline fontSize="28px" />
        </ModalCloseButton>
        <ModalBody m={4}>
          <VStack spacing={4} mt={4}>
            <Text fontWeight={700} fontSize="xl" textAlign="center">
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
