import Redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: process.env.REDIS_PORT || 6379,
//   username: process.env.REDIS_USER || "root",
//   password: process.env.REDIS_PASSWORD || "NayMyo@1132",
//   reconnectOnError: () => 1,
// });

// redisClient.on("connect", () => console.log("Redis Connected"));
// redisClient.on("error", (err) => console.error("Redis Error:", err));

// redisClient.connect().catch(console.error);

// export default redisClient;

// Use a global variable to prevent multiple connections
if (!global.redisClient) {
  global.redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    reconnectOnError: () => 1,
  });

  global.redisClient.on("error", (err) => {
    console.error("❌ Redis Error:", err);
  });

  global.redisClient.on("connect", () => {
    console.log("✅ Connected to Redis successfully!");
  });
}

const redisClient = global.redisClient;
export default redisClient;
