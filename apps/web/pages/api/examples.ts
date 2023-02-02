import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "@wyre-zayroll/db/src";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const examples = await prisma.example.findMany();
  res.status(200).json({ message: "Hello World" });
};

export default examples;
