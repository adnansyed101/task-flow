import { prisma } from '#/db'
import { ensureSession } from '#/middleware/auth.function'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/submission/')({
  server: {
    handlers: {
      // Fetch submission based on current buyer id.
      GET: async () => {
        const session = await ensureSession()

        try {
          const submissions = await prisma.submission.findMany({
            where: {
              task: {
                buyerId: session.user.id,
              },
            },
            include: {
              task: true,
              worker: true,
            },
          })

          return Response.json({
            success: true,
            data: submissions,
            message: 'Submissions Fetched Successfully.',
          })
        } catch (error) {
          // Handle database or other unexpected errors
          return Response.json(
            {
              success: false,
              error: 'Internal server error in fetching submissions.',
            },
            { status: 400 },
          )
        }
      },
    },
  },
})
