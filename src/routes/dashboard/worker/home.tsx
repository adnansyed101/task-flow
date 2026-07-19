import SectionHeader from '#/components/dashboard/section-header'
import StatCard from '#/components/dashboard/stat-card'
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
import type { ResponseSubmissionType } from '#/lib/schema/submissions'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/dashboard/worker/home')({
  component: WorkerHomePage,
})

type SubmissionResponseType = {
  data: ResponseSubmissionType[]
  message: string
  success: boolean
}

function WorkerHomePage() {
  const session = Route.useRouteContext()

  const submissions = useQuery({
    queryKey: ['appSubs'],
    queryFn: async (): Promise<SubmissionResponseType> => {
      try {
        const response = await axios.get('/api/submission')
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

  return (
    <>
      <SectionHeader
        title={`Welcome back, ${session.user.name.split(' ')[0]}`}
        subtitle="Here's what's happening with your work."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total submissions" value={20} />
        <StatCard label="Pending review" value={'pending'} />
        <StatCard
          label="Total earnings"
          value={`${100} coins`}
          hint={`≈ $${(200 / 20).toFixed(2)}`}
        />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-2xl">Approved submissions</h3>
        </div>
        <Card className="px-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Payable</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.isLoading || submissions.isPending ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : (
                <>
                  {submissions.data.data.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-8 text-center text-sm text-muted-foreground"
                      >
                        No submissions waiting for review.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {submissions.data.data.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">
                            {s.task.taskTitle}
                          </TableCell>
                          <TableCell>{s.task.payableAmount} coins</TableCell>
                          <TableCell>{s.task.buyer.name}</TableCell>
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
      </div>
    </>
  )
}
