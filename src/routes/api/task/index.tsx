import { FormTaskSchema } from '#/lib/schema/task'
import { createFileRoute } from '@tanstack/react-router'
import { prisma } from '#/db'
import z from 'zod'
import { ensureSession } from '#/middleware/auth.function'

export const Route = createFileRoute('/api/task/')({
  server: {
    handlers: {
      GET: async () => {
        const session = await ensureSession()
        try {
          const tasks = await prisma.task.findMany({
            where: {
              buyerId: session.user.id,
            },
          })

          return Response.json({
            success: true,
            data: tasks,
            message: 'Task Created Successfully.',
          })
        } catch (error) {
          // Handle database or other unexpected errors
          return Response.json(
            {
              success: false,
              error: 'Internal server error in creating tasks.',
            },
            { status: 400 },
          )
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          body.completionDate = new Date(body.completionDate)
          const { id, ...vlaidatedData } = FormTaskSchema.parse(body)

          const session = await ensureSession()
          const total =
            vlaidatedData.payableAmount * vlaidatedData.requiredWorkers

          if (total > session.user.coin) {
            return Response.json({
              success: false,
              data: {},
              message: 'User does not have enough coins.',
            })
          }

          const newTask = await prisma.task.create({
            data: vlaidatedData,
          })

          return Response.json({
            success: true,
            data: newTask,
            message: 'Task Created Successfully.',
          })
        } catch (error: any) {
          // z.parse() throws a ZodError if validation fails
          if (error instanceof z.ZodError) {
            return Response.json(
              {
                success: false,
                error: error.issues,
                message: 'Zod Error',
              },
              { status: 400 },
            )
          }

          // Handle database or other unexpected errors
          return Response.json(
            {
              success: false,
              error: 'Internal server error in creating tasks.',
            },
            { status: 400 },
          )
        }
      },
      PATCH: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json()
          body.completionDate = new Date(body.completionDate)
          const vlaidatedData = FormTaskSchema.parse(body)

          const newTask = await prisma.task.update({
            where: {
              id: vlaidatedData.id,
            },
            data: vlaidatedData,
          })

          return Response.json({
            success: true,
            data: newTask,
            message: 'Task Updated Successfully.',
          })
        } catch (error: any) {
          // z.parse() throws a ZodError if validation fails
          if (error instanceof z.ZodError) {
            return Response.json({ success: false, error: error.issues })
          }

          // Handle database or other unexpected errors
          return Response.json(
            {
              success: false,
              error: 'Internal server error in creating tasks.',
            },
            { status: 400 },
          )
        }
      },
    },
  },
})
