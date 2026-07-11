import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '#/db'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ['admin', 'worker', 'buyer'],
        required: true,
        defaultValue: 'worker',
        input: true,
      },
    },
  },
  plugins: [tanstackStartCookies()],
})
