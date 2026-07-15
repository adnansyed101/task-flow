import { prisma } from '#/db'
import { ensureSession } from '#/middleware/auth.function'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const submissionSchema = z.object({
  status: z.union([
    z.literal('pending'),
    z.literal('approved'),
    z.literal('rejected'),
  ]),
  id: z.string(),
})

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
              status: 'pending',
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
      PATCH: async ({ request }) => {
        const body = await request.json()

        const validatedData = submissionSchema.parse(body)

        try {
          const updatedSubmission = await prisma.$transaction(async (tx) => {
            const updateSubmission = await tx.submission.update({
              where: {
                id: validatedData.id,
              },
              data: {
                status: validatedData.status,
              },
              include: {
                task: true,
              },
            })

            if (validatedData.status === 'rejected') {
              await tx.task.update({
                where: {
                  id: updateSubmission.taskId,
                },
                data: {
                  requiredWorkers: {
                    increment: 1,
                  },
                },
              })
            }

            if (validatedData.status === 'approved') {
              await tx.user.update({
                where: {
                  id: updateSubmission.workerId,
                },
                data: {
                  coin: {
                    increment: updateSubmission.task.payableAmount,
                  },
                },
              })
            }

            return updateSubmission
          })

          return Response.json({
            success: true,
            data: updatedSubmission,
            message: 'Submission Updated Successfully.',
          })
        } catch (error) {
          // z.parse() throws a ZodError if validation fails
          if (error instanceof z.ZodError) {
            return Response.json({ success: false, error: error.issues })
          }

          // Handle database or other unexpected errors
          return Response.json(
            {
              success: false,
              error: 'Internal server error in updating submission.',
            },
            { status: 400 },
          )
        }
      },
    },
  },
})
