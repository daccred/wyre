import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  FormLabel,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { Team } from "@prisma/client";
import RowSelectTable from "components/CustomTable/RowSelectTable";
import React, { useEffect, useMemo, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { trpc } from "utils/trpc";
import SuccessModal from "views/Payroll/modals/SuccessModal";
import z from "zod";

import { useForm } from "@wyrecc/components";

import { generateLinkColumn } from "../utils/tableColumns";

const generatePaymentLinkValidationSchema = z.object({
  employeeId: z.string(),
});

type FormInputOptions = z.infer<typeof generatePaymentLinkValidationSchema>;

const GeneratePaymentLinkModal = ({
  generatePaymentLinModalIsOpen,
  closeGeneratePaymnetLinkModal,
}: {
  generatePaymentLinModalIsOpen: boolean;
  closeGeneratePaymnetLinkModal: () => void;
}) => {
  const {
    isOpen: successModalIsOpen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModal,
  } = useDisclosure();

  // TODO: Ask John if an employee can be sent a link more than once
  const [tableData, setTableData] = useState<Team[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: contractorData } = trpc.team.getContractors.useQuery();
  const { data: employeeData } = trpc.team.getPersonnel.useQuery();

  const teamData = useMemo(() => {
    if (employeeData && contractorData) {
      return [...employeeData, ...contractorData];
    } else {
      return [];
    }
  }, [employeeData, contractorData]);

  useEffect(() => {
    if (!teamData) {
      return;
    }

    if (searchTerm) {
      const searchData = teamData?.filter((data) =>
        data?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setTableData(searchData);
    } else setTableData(teamData);
  }, [contractorData, searchTerm, teamData]);

  //   form submission
  const toast = useToast();

  const { mutate: ResetPassword, isLoading } = trpc.payment.generateLink.useMutation({
    onSuccess: (data) => {
      if (data) {
        openSuccessModal();
        closeGeneratePaymnetLinkModal();
        setSearchTerm("");
      }
    },
    onError(error: unknown) {
      toast({
        status: "error",
        description: `${error}`,
        isClosable: true,
        duration: 5000,
        position: "top-right",
      });
    },
  });

  const Submit = (data: FormInputOptions) => {
    ResetPassword({
      employeeId: data?.employeeId,
    });
  };

  const { renderForm, setFormValue } = useForm<FormInputOptions>({
    onSubmit: Submit,
    defaultValues: { employeeId: "" },
  });

  useEffect(() => {
    setFormValue("employeeId", selectedEmployees?.[0] as string);
  }, [selectedEmployees, setFormValue]);

  return (
    <>
      <Modal
        onClose={closeGeneratePaymnetLinkModal}
        isOpen={generatePaymentLinModalIsOpen}
        isCentered
        closeOnOverlayClick={false}
        size="2xl">
        <ModalOverlay bg="#1E1E1E" />
        <ModalContent w="100%">
          <ModalHeader fontWeight="bold" fontSize="lg" pb="0">
            Generate Payment Link
          </ModalHeader>
          <ModalCloseButton m="1">
            <IoCloseCircleOutline size={32} />
          </ModalCloseButton>
          <ModalBody p="4">
            <Box position="relative">
              {renderForm(
                <>
                  <Box pb={52}>
                    <FormLabel>Search for Employee or Contractor</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiSearch} />
                      </InputLeftElement>
                      <Input
                        border="1px solid #D2D2D2"
                        bg="#F7F7F7"
                        color="#210D35"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        _hover={{ borderColor: "primary" }}
                        _focus={{ borderColor: "primary" }}
                      />
                    </InputGroup>

                    {searchTerm?.length > 2 && (
                      <Box mt={10}>
                        {tableData?.length > 0 ? (
                          <RowSelectTable
                            columns={generateLinkColumn as any[]}
                            data={tableData}
                            setSelectedEmployees={setSelectedEmployees}
                          />
                        ) : (
                          <Text>No result found for your search</Text>
                        )}
                      </Box>
                    )}
                  </Box>
                  <Box position="absolute" bottom={0} mr={24}>
                    <Text fontSize="xs" color="lightgrey" mb={2}>
                      An email will be sent to the employee or contractor to request money for an official
                      expense. The link is valid for a single request.
                    </Text>
                    <Button
                      width="fit-content"
                      bg="brand.700"
                      color="white"
                      rightIcon={<Icon as={BiLinkAlt} />}
                      _hover={{ hover: "none" }}
                      type="submit"
                      isLoading={isLoading}
                      // onClick={() => openSuccessModal()}
                      isDisabled={selectedEmployees?.length === 0 ? true : false || isLoading}>
                      Generate Link
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SuccessModal
        successModalIsOpen={successModalIsOpen}
        closeSuccessModal={closeSuccessModal}
        message="Payment link has been created and sent to employee or contractor via email."
      />
    </>
  );
};

export default GeneratePaymentLinkModal;
