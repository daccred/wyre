import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../utils/trpc";

export default function Page() {
  const router = useRouter();
  const query = router.query;
  const mutation = trpc.auth.verifyUserEmail.useMutation();

  React.useEffect(() => {
    const { id, token, expires } = query;
    console.log(id, token, expires);

    // mutation.mutate({
    //   id: id as string,
    //   expires: expires as string,
    //   token: token as string,
    // });
    router.push("/login");
  }, [query, mutation]);
  return <div>loading...</div>;
}
