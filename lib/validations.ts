import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const carSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  color: z.string().min(1, 'Color is required'),
  size: z.enum(['MOTORCYCLE', 'HATCHBACK', 'SEDAN', 'SUV', 'TRUCK', 'VAN']),
  licensePlate: z.string().optional(),
})

export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Service is required'),
  carId: z.string().min(1, 'Vehicle is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  address: z.string().min(1, 'Address is required'),
  lat: z.number().optional(),
  lng: z.number().optional(),
  addons: z.array(z.string()).default([]),
  notes: z.string().optional(),
  promoCode: z.string().optional(),
})

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, 'Message is too short'),
})
