import { useRouter } from "next/router";
import ViewLayout from "components/core/ViewLayout";
import { trpc } from "utils/trpc";

const EmployeeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { data: employee } = trpc.employees.getEmployee.useQuery({ id });

  return (
    <ViewLayout title={''}>
      <h1>Employee ID: {id}</h1>
      {/* Add employee details here */}
    </ViewLayout>
  );
};

export default EmployeeDetails;
