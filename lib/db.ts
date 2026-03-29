import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const client = new PrismaClient()

  // Soft-delete middleware dropped logic for MVP compatibility with Prisma v6 extension API.
  // We can add it back via $extends when needed.

  return client
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// In Next.js dev mode, reuse the single instance to avoid exhausted connection pools
const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db

export { db }
