import { prisma } from '#/db'
import { ensureSession } from '#/middleware/auth.function'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/payment-history/')({
  server: {
    handlers: {
      GET: async () => {
        const session = await ensureSession()

        try {
          const payments = await prisma.payment.findMany({
            where: {
              buyerId: session.user.id,
            },
          })

          return Response.json({
            success: true,
            data: payments,
            message: 'Successfully fetched payments.',
          })
        } catch (error) {
          // Handle database or other unexpected errors
          return Response.json(
            {
              success: false,
              error: 'Internal server error in fetching payment history.',
            },
            { status: 400 },
          )
        }
      },
    },
  },
})
