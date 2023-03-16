import React from "react";
import { Meta } from "../../layouts";
import View from "../../views/Integrations";
import { withAuth } from "../../lib/withAuth";
import { GetServerSideProps } from "next";

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
