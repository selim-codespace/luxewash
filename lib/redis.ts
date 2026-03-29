import Redis from 'ioredis'

const getRedisUrl = () => {
  if (process.env.KV_URL) {
    return process.env.KV_URL
  }
  return 'redis://localhost:6379'
}

export const redis = new Redis(getRedisUrl(), {
  maxRetriesPerRequest: null, // Required by BullMQ
})

/**
 * Attempt to lock a booking slot in Redis.
 * Used to temporarily reserve a slot while payment is processed.
 */
export async function lockSlot(slotKey: string, payload: any, ttlSeconds: number = 600) {
  const result = await redis.set(
    `lock:slot:${slotKey}`,
    JSON.stringify(payload),
    'EX',
    ttlSeconds,
    'NX' // Only set if it does not already exist
  )
  return result === 'OK'
}

/**
 * Release a previously locked slot.
 */
export async function releaseSlot(slotKey: string) {
  await redis.del(`lock:slot:${slotKey}`)
}

/**
 * Sliding window rate limiter
 */
export async function rateLimit(identifier: string, limit: number, windowSec: number) {
  const key = `rate-limit:${identifier}`
  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, windowSec)
  }
  return current <= limit
}
