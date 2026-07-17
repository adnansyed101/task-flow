import { z } from 'zod'

export const PaymentSchema = z.object({
  id: z.string(), // Optional if validating before creation
  amount: z.number().positive('Amount must be greater than 0'),
  coinsBought: z
    .number()
    .int()
    .positive('Coins bought must be a positive integer'),
  paymentDate: z.date(), // Automatically handles server side injection
  transactionId: z.string().min(1, 'Transaction ID is required'),
  buyerId: z.string().cuid('Invalid buyer reference format'),
})

export type PaymentType = z.infer<typeof PaymentSchema>
