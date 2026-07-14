import { prisma } from '#/db'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/task/$id')({
  server: {
    handlers: {
      DELETE: async ({ params }) => {
        try {
          const { id } = params

          const deletedtask = await prisma.task.delete({
            where: {
              id,
            },
          })

          return Response.json({
            success: true,
            data: deletedtask,
            message: 'Task Deleted Successfully.',
          })
        } catch (error: any) {
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
