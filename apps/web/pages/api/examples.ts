import { type NextApiRequest, type NextApiResponse } from 'next';

import { prisma } from '@wyrecc/db';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.example.findMany();
  res.status(200).json(result);
};

export default examples;
