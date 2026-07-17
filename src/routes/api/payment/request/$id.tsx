import { createFileRoute } from '@tanstack/react-router'
import { prisma } from '#/db'
import { v4 as uuidv4 } from 'uuid'
import { SslCommerzPayment } from 'sslcommerz'

export const Route = createFileRoute('/api/payment/request/$id')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        // Get User ID
        const { id } = params
        const url = new URL(request.url)
        const cost = url.searchParams.get('cost')
        const coin = url.searchParams.get('coin')

        try {
          const user = await prisma.user.findUnique({
            where: {
              id,
            },
          })

          if (!user) throw new Error('User Not Found for SSL Payment.')

          // SSLCommerz Setup
          const store_id = process.env.SSLCOMMERZ_STORE_ID
          const store_password = process.env.SSLCOMMERZ_STORE_Password
          const is_live = false // true for live, false for sandbox

          const data = {
            total_amount: cost,
            currency: 'BDT',
            tran_id: uuidv4(), // use unique tran_id for each api call
            success_url: `${process.env.BETTER_AUTH_URL}/api/payment/success/${user.id}?cost=${cost}&coin=${coin}&transId=${uuidv4()}`,
            fail_url: `${process.env.BETTER_AUTH_URL}/api/payment/fail`,
            cancel_url: `${process.env.BETTER_AUTH_URL}/api/payment/cancel`,
            ipn_url: `${process.env.BETTER_AUTH_URL}/api/payment/ipn`,
            shipping_method: 'Digital',
            product_name: 'Coins',
            product_category: 'Coins',
            product_profile: 'general',
            cus_name: user.name,
            cus_email: user.email,
            cus_add1: 'Email Address.',
            cus_add2: 'Email Address.',
            cus_city: 'Email Address.',
            cus_state: 'Email Address.',
            cus_postcode: 'Email Address.',
            cus_country: 'Email Address.',
            cus_phone: '01711111111',
            ship_name: user.name,
            ship_add1: 'Email Address.',
            ship_add2: 'Email Address.',
            ship_city: 'Email Address.',
            ship_state: 'Email Address.',
            ship_postcode: 'Email Address.',
            ship_country: 'Email Address.',
          }

          const sslcz = new SslCommerzPayment(store_id, store_password, is_live)

          const GatewayPageURL: any = await sslcz
            .init(data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((apiResponse: any) => apiResponse.GatewayPageURL)

          return Response.json({ success: true, url: GatewayPageURL })
        } catch (error) {
          return Response.json({
            success: false,
            message: 'Error occured in sslcommerz payment get.',
          })
        }
      },
    },
  },
})
