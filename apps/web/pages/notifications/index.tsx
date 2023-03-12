import React from "react";
import { Meta } from "../../layouts";
import View from "../../views/Notifications";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";


export default function Page() {
  return (
    <>
      <Meta />
      <View />
    </>
  );
}

export const getServerSideProps = async (context:any) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};