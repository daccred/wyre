// import * as BullBoard from 'bull-board';
import routes from './router/routes';
import cors from 'cors';
import express from 'express';

const server = express();
/* Enable cors:: should limit origin once stabls */
server.use(
  cors({
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
    origin: '*',
  })
);

/* --- JSON Parser for incoming requests --- */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* For the UI and API Routes*/
// server.use('/bull-board-ui', BullBoard.UI);
server.use('/v1', routes);
server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});

export default server;
