import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ViewLayout from "../../components/core/ViewLayout";
import { ChevronRight, CreateIcon, InstantPayment } from "./ProviderIcons";
import { Card, PayrollTypeCard } from "./utils/misc";
import { payrollData } from "./utils/dummyData";
import PayrollType from "./modals/PayrollType";
import { useRouter } from "next/router";
import { payrollColumns } from "./utils/tableColumns";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { Payroll } from "@prisma/client";
import { CustomTable } from "../../components/CustomTable";

const Payroll = () => {
  const router = useRouter();

  const {
    isOpen: payrollTypeModalIsOpen,
    onOpen: openPayrollTypeModal,
    onClose: closePayrollTypeModal,
  } = useDisclosure();

  const [tableData, setTableData] = useState<Payroll[]>([]);

  const { data: payroll, isLoading } = trpc.payroll.getPayrolls.useQuery();

  useEffect(() => {
    if (!payroll) {
      return;
    }

    setTableData(payroll as Payroll[]);
  }, [payroll]);

  return (
    <ViewLayout title="Payroll">
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          <GridItem>
            <Card
              heading="Create Payroll"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit."
              icon={<CreateIcon />}
              onClick={() => openPayrollTypeModal()}
            />
          </GridItem>
          <GridItem>
            <Card
              heading="One-Off Payment"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit."
              icon={<InstantPayment />}
            />
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={5} mt={8}>
          <PayrollTypeCard
            type="Fiat Payroll"
            date="Jan, 2023"
            text="Dollar equivalent of fiat-based payroll"
            amount={0.0}
          />
          <PayrollTypeCard
            type="Crypto Payroll"
            date="Jan, 2023"
            text="Dollar equivalent of fiat-based payroll"
            amount={0.0}
          />
          <VStack bg="brand.100" align="left" p={4} rounded="xl" spacing={3}>
            <Box>
              <Text fontWeight={700}>Make Payment</Text>

              <Text fontSize="xs">
                Edit payroll, pay employees and contractors
              </Text>
            </Box>

            <Button
              bg="#010C14"
              color="white"
              rightIcon={<ChevronRight boxSize={4} />}
              iconSpacing="3"
              w="fit-content"
              _hover={{ hover: "none" }}
              onClick={() => router.push("/payroll/manage-payroll")}
            >
              Manage Payroll
            </Button>
          </VStack>
        </Grid>
      </Box>
      <Stack
        rounded="md"
        p={6}
        bg="white"
        w="100%"
        mt={10}
        border="1px solid #D2D2D2"
      >
        <Heading as="h4" size="xs" fontSize="xl">
          Payroll History
        </Heading>
        <CustomTable
          // @ts-ignore
          columns={payrollColumns}
          data={tableData}
        />
      </Stack>

      <PayrollType
        payrollTypeModalIsOpen={payrollTypeModalIsOpen}
        closePayrollTypeModal={closePayrollTypeModal}
      />
    </ViewLayout>
  );
};

export default Payroll;
