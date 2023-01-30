import React from "react";
import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";

export const PlusIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
  width={13}
  height={13}
  viewBox="0 0 13 13"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <path
    d="M6.167 7.334v-.5H1.333a.5.5 0 110-1h4.834V1a.5.5 0 111 0v4.834H12a.5.5 0 110 1H7.167v4.833a.5.5 0 11-1 0V7.334z"
    fill="#210D35"
    stroke="#FDFFFC"
  />
  </chakra.svg>
);
