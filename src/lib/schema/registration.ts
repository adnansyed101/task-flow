import z from 'zod'

export const registrationSchema = z.object({
  image: z.string().url('Invalid image URL').optional(),
  fullName: z.string().min(3, 'Full Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['worker', 'buyer']),
})

export type RegistrationType = z.infer<typeof registrationSchema>

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type LoginType = z.infer<typeof loginSchema>
