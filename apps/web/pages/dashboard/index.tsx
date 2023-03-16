import React from "react";
import { Meta } from "../../layouts";
import View from "../../views/Dashboard";
import { withAuth } from "../../lib/withAuth";
import { GetServerSideProps } from "next";

function Page() {
  return (
    <>
      <Meta />
      <View />
    </>
  );
}

export default Page;

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});