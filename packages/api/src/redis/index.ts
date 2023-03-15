import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_URL,
    port: Number(process.env.REDIS_PORT),
  },

  password: process.env.REDIS_PASSWORD,
});
redisClient.on("error", (err) => console.warn(err));
redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch(() => console.warn("Failed to connect to Redis"));

export default redisClient;
