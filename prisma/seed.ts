import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // 1. Delete existing data
  console.log('Cleaning up existing data...')
  await prisma.bookingService.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.staffSchedule.deleteMany()
  await prisma.staff.deleteMany()
  await prisma.addon.deleteMany()
  await prisma.servicePricing.deleteMany()
  await prisma.service.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.subscriptionPlan.deleteMany()
  await prisma.promoCode.deleteMany()
  await prisma.car.deleteMany()
  await prisma.user.deleteMany()

  // 2. Create Users (Admin, Techs, Customers)
  console.log('Creating users...')
  const adminPassword = await hash('Admin123!', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@luxewash.com',
      name: 'LuxeWash Admin',
      role: 'ADMIN',
      passwordHash: adminPassword,
    },
  })

  // 3. Create Services
  console.log('Creating services...')
  const exteriorWash = await prisma.service.create({
    data: {
      name: 'Signature Exterior Wash',
      slug: 'signature-exterior',
      description: 'Our premium foam cannon exterior wash.',
      basePrice: 49.00,
      duration: 45,
      category: 'EXTERIOR',
      features: ['Foam Cannon Pre-Soak', 'Hand Wash & Dry', 'Wheel Cleaning', 'Tire Dressing'],
      pricingRules: {
        create: [
          { carSize: 'SEDAN', price: 49.00 },
          { carSize: 'SUV', price: 59.00 },
          { carSize: 'TRUCK', price: 69.00 },
        ],
      },
    },
  })

  const fullDetail = await prisma.service.create({
    data: {
      name: 'The Luxe Detail',
      slug: 'luxe-detail',
      description: 'Comprehensive interior and exterior detailing.',
      basePrice: 199.00,
      duration: 180,
      category: 'FULL_DETAIL',
      features: ['Signature Exterior Wash', 'Clay Bar Treatment', 'Interior Vacuum', 'Leather Conditioning', 'Glass Cleaning'],
      pricingRules: {
        create: [
          { carSize: 'SEDAN', price: 199.00 },
          { carSize: 'SUV', price: 249.00 },
          { carSize: 'TRUCK', price: 299.00 },
        ],
      },
    },
  })

  // 4. Create Addons
  console.log('Creating addons...')
  await prisma.addon.createMany({
    data: [
      { name: 'Ceramic Spray Wax', price: 29.00, duration: 15 },
      { name: 'Pet Hair Removal', price: 49.00, duration: 30 },
      { name: 'Headlight Restoration', price: 79.00, duration: 45 },
    ],
  })

  // 5. Create Subscription Plans
  console.log('Creating subscription plans...')
  await prisma.subscriptionPlan.create({
    data: {
      name: 'Luxe Club Gold',
      slug: 'luxe-club-gold',
      price: 149.00,
      stripePriceId: 'price_gold_placeholder',
      features: ['2 Full Details per month', 'Priority Booking', '10% off Addons'],
      washesPerMonth: 2,
    },
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
