import { createFileRoute } from '@tanstack/react-router'
import SectionHeader from '#/components/dashboard/section-header'
import StatusBadge from '#/components/dashboard/status-badge'
import { Card } from '#/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { ResponseSubmissionType } from '#/lib/schema/submissions'
import { format } from 'date-fns'

export const Route = createFileRoute('/dashboard/worker/submissions')({
  component: SubmissionsPage,
})

type SubmissionResponseType = {
  data: ResponseSubmissionType[]
  message: string
  success: boolean
}

function SubmissionsPage() {
  const submissions = useQuery({
    queryKey: ['worker-subs'],
    queryFn: async (): Promise<SubmissionResponseType> => {
      try {
        const response = await axios.get('/api/submission/worker')
        return response.data
      } catch (error) {
        // Handle database or other unexpected errors
        return { success: false, message: 'Internal server error', data: [] }
      }
    },
  })

  if (submissions.error) {
    return (
      <>
        <h1>Something went wrong</h1>
        <p>{submissions.error.toString()}</p>
      </>
    )
  }

  console.log(submissions?.data?.data)

  return (
    <>
      <SectionHeader
        title="My submissions"
        subtitle="Track the review status of everything you've submitted."
      />
      <Card className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Payable</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.isLoading || submissions.isPending ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : (
              <>
                {submissions.data.data.length === 0 ? (
                  <>
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-10 text-center text-sm text-muted-foreground"
                      >
                        No submissions yet.
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    {submissions.data.data.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">
                          {s.task.taskTitle}
                        </TableCell>
                        <TableCell>{s.task.buyer.name}</TableCell>
                        <TableCell>{s.task.payableAmount} coins</TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(s.currentDate, 'dd / MMMM / yyyy')}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={s.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
