import React from "react";
import { Meta } from "../../layouts";
import View from "../../views/Dashboard";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

function Page() {

  // console.log(session)
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <Meta />
      <View />
    </>
  );
}

// add the requireAuth property to the page component
Page.requireAuth = true;

export default Page;