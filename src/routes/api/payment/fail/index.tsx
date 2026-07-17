import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/payment/fail/')({
  server: {
    handlers: {
      POST: () => {
        return Response.redirect(
          `${process.env.BETTER_AUTH_URL}/dashboard/buyer/payment-history`,
        )
      },
    },
  },
})
