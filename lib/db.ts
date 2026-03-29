import { PrismaClient, Prisma } from '@prisma/client'

const prismaClientSingleton = () => {
  const client = new PrismaClient()

  // Soft-delete middleware
  client.$use(async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>) => {
    // Models with soft-delete implementation
    const softDeleteModels = ['User', 'Car', 'Booking']
    
    if (params.model && softDeleteModels.includes(params.model)) {
      if (params.action === 'delete') {
        // Change to update with deletedAt
        params.action = 'update'
        params.args['data'] = { deletedAt: new Date() }
      }
      if (params.action === 'deleteMany') {
        // Change to updateMany
        params.action = 'updateMany'
        if (params.args.data !== undefined) {
          params.args.data['deletedAt'] = new Date()
        } else {
          params.args['data'] = { deletedAt: new Date() }
        }
      }
      
      // Filter out soft-deleted records in queries
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        // Change to findFirst & filter
        params.action = 'findFirst'
        // Add deletedAt = null filter
        if (params.args.where) {
          if (params.args.where.deletedAt === undefined) {
            params.args.where['deletedAt'] = null
          }
        } else {
          params.args['where'] = { deletedAt: null }
        }
      }
      if (params.action === 'findMany' || params.action === 'count') {
        if (params.args.where) {
          if (params.args.where.deletedAt === undefined) {
            params.args.where['deletedAt'] = null
          }
        } else {
          params.args['where'] = { deletedAt: null }
        }
      }
    }
    return next(params)
  })

  return client
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// In Next.js dev mode, reuse the single instance to avoid exhausted connection pools
const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db

export { db }
