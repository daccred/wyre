import type { GetServerSideProps } from 'next';
import React from 'react';
import { Meta } from '../../layouts';
import { withAuth } from '../../lib/withAuth';
import View from '../../views/Dashboard';

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
