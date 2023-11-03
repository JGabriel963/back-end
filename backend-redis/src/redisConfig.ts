import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL);

// redis.get()
async function getRedis(value: string) {
  return await redisClient.get(value);
}

// redis.set(key, value)
async function setRedis(key: string, value: string) {
  return await redisClient.set(key, value);
}

export { redisClient, getRedis, setRedis };
