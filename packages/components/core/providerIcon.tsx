import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import React from "react";

export const LogoutIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    width={25}
    height={25}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M20 12h-9.5m7.5 3l3-3-3-3m-5-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5a2 2 0 002-2v-1"
      stroke="#E71D36"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </chakra.svg>
);
