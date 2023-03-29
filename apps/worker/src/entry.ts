import logger from './core/logger';
import secrets from './core/secrets';
import queue from './queue';
import server from './server';

async function main() {
  /* Instantiate the Redis Queue Here */
  queue();

  /* Start & Listen on HTTP Server */
  await server.listen({ port: secrets.PORT, host: secrets.HOST });
  logger.info(`Running at http://${secrets.HOST}:${secrets.PORT}`);
}

process.on('unhandledRejection', (err) => {
  if (err) {
    console.error(err);
    logger.debug(err);
  }
  process.exit(1);
});

main();
