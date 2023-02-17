import NextAuth from "next-auth";
import { nextAuthOptions } from "../../../../../packages/api/src/auth";

export default NextAuth(nextAuthOptions);
