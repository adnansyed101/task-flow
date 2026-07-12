import { z } from 'zod'
import { customUserSchema } from './user'

const baseSubmissionSchema = z.object({
  id: z.string(),
  taskId: z.string(),
  taskTitle: z.string(),
  payableAmount: z.number(),
  workerEmail: z.string().email(), // Added .email() validation for safety
  workerName: z.string(),
  submissionDetails: z.string(),
  currentDate: z.string(), // Assumes ISO string or formatted date string
  status: z.union([
    z.literal('pending'),
    z.literal('approved'),
    z.literal('rejected'),
  ]),
})

export const FormSubmissionSchema = baseSubmissionSchema.extend({
  buyerId: z.string().min(1, 'Buyer is required'),
})

export const ResponseSubmissionSchema = baseSubmissionSchema.extend({
  buyer: customUserSchema,
})

export type FormSubmissionValues = z.infer<typeof FormSubmissionSchema>
export type ResponseSubmission = z.infer<typeof ResponseSubmissionSchema>
