import { prisma } from '#/db'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/payment/success/$id')({
  server: {
    handlers: {
      POST: async ({ params, request }) => {
        // Get User ID
        const { id } = params
        const url = new URL(request.url)
        const cost = Number(url.searchParams.get('cost'))
        const coin = Number(url.searchParams.get('coin'))
        const transId = String(url.searchParams.get('transId'))

        try {
          await prisma.payment.create({
            data: {
              amount: cost,
              coinsBought: coin,
              paymentDate: new Date(),
              transactionId: transId,
              buyerId: id,
            },
          })

          return Response.redirect(
            `${process.env.BETTER_AUTH_URL}/dashboard/buyer/payment-history`,
          )
        } catch (error) {
          // Handle database or other unexpected errors
          return Response.json(
            {
              success: false,
              error: 'Internal server error in creating transaction.',
            },
            { status: 400 },
          )
        }
      },
    },
  },
})
