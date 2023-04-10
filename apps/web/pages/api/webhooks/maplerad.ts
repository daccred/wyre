// import { env } from "@/env/server.mjs";
import { type NextApiRequest, type NextApiResponse } from 'next';

import { prisma } from '@wyrecc/db';

const COMPLETED = 'completed';
const OK = 200;

const mapleradWebhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Retrieve the request's body
    const event = req.body;
    if (event.event === 'transfer.successful') {
      console.log('event', event);
      // send a status code of 200 to Paystack
      res.status(OK).send({ status: 'success' });
      // update the outbound transfer status
      const outboundTransaction = await prisma.transaction.findFirst({
        where: {
          id: event.reference,
        },
      });
      if (!outboundTransaction) {
        throw new Error('Transaction not found!');
      }
      // update the status of the outbound transaction
      await prisma.transaction.update({
        where: {
          id: outboundTransaction.id,
        },
        data: {
          status: COMPLETED,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default mapleradWebhookHandler;
