import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import React from "react";

export const MonoIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g clipPath="url(#clip0_894_7098)">
      <path
        d="M20.886 6.678a.58.58 0 00-.922.47v6.175l-9.06-6.645a.58.58 0 00-.922.47v6.175L.922 6.678a.58.58 0 00-.922.47v8.725a.582.582 0 00.239.468l9.32 6.836a.58.58 0 00.922-.47v-6.175l9.06 6.645a.58.58 0 00.922-.47v-6.175l9.061 6.645a.58.58 0 00.922-.47v-8.724a.581.581 0 00-.24-.47l-9.32-6.835z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="clip0_894_7098">
        <path fill="#fff" d="M0 0H30V30H0z" />
      </clipPath>
    </defs>
  </chakra.svg>
);
