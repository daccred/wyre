import type { GetServerSideProps } from "next";
import React from "react";

import { Meta } from "../../layouts";
import { withAuth } from "../../lib/withAuth";
import View from "../../views/Payroll/CreateContractorPayroll";

export default function Page() {
  return (
    <>
      <Meta />
      <View />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
