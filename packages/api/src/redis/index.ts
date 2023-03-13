import { createClient } from "redis";

const redisClient = createClient();
redisClient.on("error", (err) => console.warn(err));
redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch(() => console.warn("Failed to connect to Redis"));

export default redisClient;
