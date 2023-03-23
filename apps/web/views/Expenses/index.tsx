import { Box, Center, Grid, GridItem, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { CustomTable } from "components/CustomTable";
import ViewLayout from "components/core/ViewLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Column } from "react-table";
import { EmptyEmployeeImage } from "views/Employees/ProviderIcons";
import { Card } from "views/Payroll/utils/misc";

import { LinkIcon, ManageExpensesIcon } from "./ProviderIcons";
import { expenses } from "./utils/dummyData";
import { expensesColumn } from "./utils/tableColumns";

const View = () => {
  const router = useRouter();
  const isLoading = false;
  // TODO: Remove this after api integration
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    if (!expenses) {
      return;
    }

    setTableData(expenses);
  }, []);

  return (
    <ViewLayout title="Expenses">
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          <GridItem>
            <Card
              heading="Manage Expenses"
              text="Click to approve reimbursements and payment link requests"
              icon={<ManageExpensesIcon />}
              textFontSize="sm"
              padding={4}
              onClick={() => router.push("/expenses/manage-expenses")}
            />
          </GridItem>
          <GridItem>
            <Card
              heading="Generate Payment Link"
              text="Click to allow employees to request money for urgent official expenses"
              icon={<LinkIcon />}
              textFontSize="sm"
              padding={4}
            />
          </GridItem>
        </Grid>
      </Box>
      <Stack rounded="md" p={6} bg="white" w="100%" mt={10} border="1px solid #D2D2D2">
        <Heading as="h4" size="xs" fontSize="xl">
          Expense History
        </Heading>
        {isLoading ? (
          <Center>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        ) : (
          <>
            {tableData?.length > 0 ? (
              <CustomTable columns={expensesColumn as unknown as Column<any>[]} data={tableData} />
            ) : (
              <Center w="100%" p="8" flexDirection="column">
                <EmptyEmployeeImage />
                <Text pr="12" pt={2}>
                  You currently have no expense history
                </Text>
              </Center>
            )}
          </>
        )}
      </Stack>
    </ViewLayout>
  );
};

export default View;
