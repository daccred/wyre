import server from './server';
import req from 'supertest';

test('[GET] /_healthcheck', async () => {
  const res = await req(server).get('/_healthcheck');
  expect(typeof res.body.uptime).toBe('number');
});
