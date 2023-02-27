import React from "react";
import { Meta } from "../../layouts";
import View from "../../views/Expenses";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useRouter } from "next/router";

export default function Page( session: any ) {

  console.log(session)

  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Meta />
      <View />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerAuthSession(context);
  return {
    props: {
      session,
    },
  };
}