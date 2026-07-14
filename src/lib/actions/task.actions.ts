import { createServerFn } from '@tanstack/react-start'
import { FormTaskSchema } from '../schema/task'
import { prisma } from '#/db'
import { toast } from 'sonner'
import z from 'zod'

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

const fetchTasksParamsSchema = z.object({
  buyerId: z.string(),
})

export const getTasks = createServerFn({ method: 'GET' })
  .validator(fetchTasksParamsSchema.parse)
  .handler(async ({ data }) => {
    const tasks = await prisma.task.findMany({
      where: {
        buyerId: data.buyerId,
      },
    })
    return tasks
  })
