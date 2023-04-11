import {
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import styledToast from '../../../components/core/StyledToast';
import { trpc } from '../../../utils/trpc';
import { ProfileIcon } from './ProviderIcons';

const Terminate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const { data: employee, refetch } = trpc.team.getSinglePersonnel.useQuery(id as string, {
    refetchOnMount: true,
  });
  const { firstName, email, department, jobRole, teamCategory, signBonus, salary, payrollMethod } =
    employee ?? {};

  const { mutate: terminateEmployee, isLoading: isTerminating } = trpc.team.updatePersonnel.useMutation({
    onSuccess() {
      refetch();
      styledToast({
        status: 'success',
        description: `Employee has been ${employee?.status ? 'terminated' : 'activated'} successfully}`,
        toast: toast,
      });
      onClose();
    },
    onError(error: unknown) {
      toast({
        status: 'error',
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
      console.log(error);
    },
  });

  const handleTerminate = async () => {
    try {
      if (teamCategory === undefined) {
        throw new Error('teamCategory is undefined');
      }
      terminateEmployee({
        id: employee?.id ?? '',
        data: {
          name: firstName ?? '',
          email: email ?? '',
          department: department ?? '',
          jobRole: jobRole ?? '',
          salary: salary ?? '',
          signBonus: signBonus ?? '',
          status: !employee?.status, // toggle the status of the employee
          category: teamCategory,
          payrollMethod: payrollMethod as 'CRYPTO' | 'BANK' | 'MOBILEMONEY', // cast the category to the correct type, // assign an empty string as default value
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const buttonText = employee?.status ? 'Terminate Employee' : 'Activate Employee';

  return (
    <>
      <Button
        onClick={onOpen}
        loadingText={employee?.status ? 'Activating' : 'Terminating'}
        variant="greyBtn"
        rightIcon={<ProfileIcon fill="#210D35" stroke="#210D35" />}
        iconSpacing="3"
        w="fit-content"
        _hover={{ bg: '' }}>
        {buttonText}
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{buttonText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Are you sure you want to {buttonText}?</ModalBody>

          <ModalFooter>
            <Button
              onClick={handleTerminate}
              isLoading={isTerminating}
              loadingText={employee?.status ? 'Terminating' : 'Activating'}
              variant="greyBtn"
              rightIcon={<ProfileIcon fill="#210D35" stroke="#210D35" />}
              iconSpacing="3"
              w="fit-content"
              mr={2}
              _hover={{ bg: '' }}>
              {buttonText}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Terminate;
