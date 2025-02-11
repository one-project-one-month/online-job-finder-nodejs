import Redis from "ioredis";

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
  reconnectOnError: () => 1,
});

redisClient.on("connect", () => console.log("Redis Connected"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

redisClient.connect().catch(console.error);

export default redisClient;
