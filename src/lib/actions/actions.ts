import { createServerFn } from '@tanstack/react-start'
import { prisma } from '#/db'
import z from 'zod'

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
