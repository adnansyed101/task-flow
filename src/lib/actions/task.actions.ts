import { createServerFn } from '@tanstack/react-start'
import { FormTaskSchema } from '../schema/task'

export const createTask = createServerFn({ method: 'POST' }).validator(
  FormTaskSchema,
)
