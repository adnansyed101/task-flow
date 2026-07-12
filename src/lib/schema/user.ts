import { z } from 'zod'

export const customUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().url().nullable().optional(), // Can be null if no avatar is uploaded
  createdAt: z.date().safeParse(new Date()), // Handles both actual JS Date objects or ISO strings
  updatedAt: z.date().safeParse(new Date()),
})

export type CustomUserType = z.infer<typeof customUserSchema>
