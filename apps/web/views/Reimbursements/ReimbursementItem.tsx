import {
  Avatar,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import ManageReimbursementModal from "./ManageReimbursementModal";

interface reimbursementItemInterface {
  data: { [key: string]: string };
}

export default function ReimbursementItem({
  data,
}: reimbursementItemInterface) {
  const {
    isOpen: approveReimbursementSuccessModalIsOpen,
    onOpen: openApproveReimbursementSuccessModal,
    onClose: closeApproveReimbursementSuccessModal,
  } = useDisclosure();

  const {
    isOpen: manageReimbursementModalIsOpen,
    onOpen: openManageReimbursementModal,
    onClose: closeManageReimbursementModal,
  } = useDisclosure();

  return (
    <>
      <Tr textTransform={"capitalize"}>
        <Td>
          <HStack>
            <Avatar size={"sm"} src={data?.imgURL} />
            <Text>{data?.fullName}</Text>
          </HStack>
        </Td>
        <Td>{data?.purpose}</Td>
        <Td>{data?.amount}</Td>
        <Td>
          <Button
            iconSpacing="3"
            w={"120px"}
            fontSize="sm"
            bg="#9f9f9f26"
            px="2"
          >
            <Text
              textOverflow={"ellipsis"}
              whiteSpace="nowrap"
              overflow={"hidden"}
            >
              {data?.attachment}
            </Text>
          </Button>
        </Td>
        <Td>
          {data?.action === "manage" && (
            <Button
              variant={"darkBtn"}
              iconSpacing="3"
              w={"120px"}
              fontSize="sm"
              onClick={openManageReimbursementModal}
            >
              Manage
            </Button>
          )}
          {data?.action === "approved" && (
            <Text w={"120px"} fontSize="sm" color="#0AAF60">
              Approved
            </Text>
          )}
          {data?.action === "disapproved" && (
            <Text w={"120px"} fontSize="sm" color="#E71D36">
              Disapproved
            </Text>
          )}
        </Td>
      </Tr>

      <ManageReimbursementModal
        manageReimbursementModalIsOpen={manageReimbursementModalIsOpen}
        openManageReimbursementModal={openManageReimbursementModal}
        closeManageReimbursementModal={closeManageReimbursementModal}
        openApproveReimbursementSuccessModal={
          openApproveReimbursementSuccessModal
        }
        data={data}
      />

      <Modal
        onClose={() => {
          closeApproveReimbursementSuccessModal();
          closeManageReimbursementModal();
        }}
        isOpen={approveReimbursementSuccessModalIsOpen}
        isCentered
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalBody>
            <Stack
              alignItems={"center"}
              justifyContent="center"
              p="4"
              textAlign="center"
            >
              <Text fontWeight="bold" fontSize="18px">
                You’ve successfully approved this reimbursement request
              </Text>
              <Image src="/addEmployeeSuccess.png" alt="" w="40" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
