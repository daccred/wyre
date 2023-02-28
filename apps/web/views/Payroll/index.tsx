import {
  Box,
  Button,
  Flex,
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
import CustomTable from "components/CustomTable";
import { Card, payrollColumns, PayrollTypeCard } from "./utils/misc";
import { payrollData } from "./utils/dummyData";
import PayrollType from "./PayrollType";



const Payrol = () => {

  const {
    isOpen: payrollTypeModalIsOpen,
    onOpen: openAPayrollTypeModal,
    onClose: closePayrollTypeModal,
  } = useDisclosure();

  return (
    <ViewLayout title="Payroll">
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          <GridItem>
            <Card
              heading="Create Payroll"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit."
              icon={<CreateIcon />}
              onClick={()=> openAPayrollTypeModal()}
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
            type="Crypto Payrolll"
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
          columns={payrollColumns}
          data={payrollData}
          emptyStateInfo="No Payroll History"
        />
      </Stack>

      <PayrollType payrollTypeModalIsOpen={payrollTypeModalIsOpen} closePayrollTypeModal={closePayrollTypeModal} />
    </ViewLayout>
  );
};

export default Payrol;
