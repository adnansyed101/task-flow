import { z } from 'zod'
import { customUserSchema } from './user'
import { ResponseTaskSchema } from './task'

const baseSubmissionSchema = z.object({
  id: z.string(),
  submissionDetails: z.string(),
  currentDate: z.date(), // Assumes ISO string or formatted date string
  status: z.union([
    z.literal('pending'),
    z.literal('approved'),
    z.literal('rejected'),
  ]),
})

export const FormSubmissionSchema = baseSubmissionSchema.extend({
  workerId: z.string().min(1, 'Worker Id is required'),
  taskId: z.string().min(1, 'Task Id is required'),
})

export const ResponseSubmissionSchema = baseSubmissionSchema.extend({
  worker: customUserSchema,
  task: ResponseTaskSchema,
  currentDate: z.date(),
})

export type FormSubmissionValuesType = z.infer<typeof FormSubmissionSchema>
export type ResponseSubmissionType = z.infer<typeof ResponseSubmissionSchema>
