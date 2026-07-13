import { createServerFn } from '@tanstack/react-start'
import { FormTaskSchema } from '../schema/task'
import { prisma } from '#/db'
import { toast } from 'sonner'

export const createTask = createServerFn({ method: 'POST' })
  .validator(FormTaskSchema)
  .handler(async ({ data }) => {
    const { id, ...taskData } = data
    const newTask = await prisma.task.create({
      data: taskData,
    })

    if (newTask) {
      toast.success('Task created successfully')
    }

    return newTask
  })
