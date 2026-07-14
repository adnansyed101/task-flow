import { z } from 'zod'
import { customUserSchema } from './user'

const baseTaskSchema = z.object({
  id: z.string(),
  taskTitle: z.string(),
  taskDetail: z.string(),
  requiredWorkers: z.number(),
  payableAmount: z.number(),
  completionDate: z.date({ message: 'Please select a valid date' }),
  submissionInfo: z.string(),
  taskImageUrl: z.string(),
  status: z.union([
    z.literal('pending'),
    z.literal('approved'),
    z.literal('rejected'),
  ]),
})

export const FormTaskSchema = baseTaskSchema.extend({
  buyerId: z.string().min(1, 'Buyer is required'),
})

export const ResponseTaskSchema = baseTaskSchema.extend({
  buyer: customUserSchema,
})

export type FormTaskValuesType = z.infer<typeof FormTaskSchema>
export type ResponseTaskType = z.infer<typeof ResponseTaskSchema>
