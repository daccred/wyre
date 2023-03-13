import React from "react";

import { Meta } from "../../layouts";
import View from "../../views/Profile";

export default function Page() {
  return (
    <>
      <Meta />
      <View />
    </>
  );
}

Page.requireAuth = true;
