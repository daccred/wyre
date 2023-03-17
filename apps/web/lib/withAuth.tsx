import { GetServerSideProps, GetServerSidePropsResult } from "next";

import { getServerAuthSession } from "../server/common/get-server-auth-session";

export const withAuth = (getServerSidePropsFunc: GetServerSideProps) => {
  return async (context: any): Promise<GetServerSidePropsResult<any>> => {
    const session = await getServerAuthSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return await getServerSidePropsFunc(context);
  };
};
