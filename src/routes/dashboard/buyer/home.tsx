import SectionHeader from '#/components/dashboard/section-header'
import StatCard from '#/components/dashboard/stat-card'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { submissionsKey } from '#/lib/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { ResponseSubmissionType } from '#/lib/schema/submissions'
import { Spinner } from '#/components/ui/spinner'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/buyer/home')({
  component: BuyerHomePage,
})

type SubmissionResponseType = {
  data: ResponseSubmissionType[]
  message: string
  success: boolean
}

function BuyerHomePage() {
  const session = Route.useRouteContext()

  const submissions = useQuery({
    queryKey: [submissionsKey],
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

  if (submissions.isError) {
    return <>Some error</>
  }

  return (
    <>
      <SectionHeader
        title={`Hello, ${session.user.name.split(' ')[0]}`}
        subtitle="A quick look at your tasks and reviews."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total tasks" value={0} />
        <StatCard label="Pending workers" value={0} />
        <StatCard label="Coins paid out" value={0} />
      </div>
      <div className="mt-8">
        <h3 className="mb-3 font-display text-2xl">Tasks to review</h3>
        <Card className="px-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Payable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.isLoading || submissions.isLoading ? (
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell className="flex justify-center">
                    <Spinner />
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              ) : (
                <>
                  {submissions.data?.data.map((s) => (
                    <ReviewRow key={s.id} sub={s} />
                  ))}

                  {submissions.data?.data.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-8 text-center text-sm text-muted-foreground"
                      >
                        No submissions waiting for review.
                      </TableCell>
                    </TableRow>
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

function ReviewRow({ sub }: { sub: ResponseSubmissionType }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const updateSubmissionMutation = useMutation({
    mutationFn: async (status: 'pending' | 'approved' | 'rejected') => {
      try {
        const response = await axios.patch('/api/submission', {
          status,
          id: sub.id,
        })
        return response.data
      } catch (error) {
        // Handle database or other unexpected errors
        return { success: false, message: 'Internal server error' }
      }
    },
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({ queryKey: [submissionsKey] })
      return toast.success(data.message)
    },
  })

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{sub.worker.name}</TableCell>
        <TableCell className="max-w-xs truncate">
          {sub.task.taskTitle}
        </TableCell>
        <TableCell>{sub.task.payableAmount} coins</TableCell>
        <TableCell>{sub.status}</TableCell>
        <TableCell className="text-right">
          <div className="inline-flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
              View
            </Button>
            <Button
              size="sm"
              onClick={() => updateSubmissionMutation.mutate('approved')}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => updateSubmissionMutation.mutate('rejected')}
            >
              Reject
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission from {sub.worker.name}</DialogTitle>
            <DialogDescription>{sub.task.taskTitle}</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border bg-muted p-4 text-sm whitespace-pre-wrap">
            {sub.submissionDetails}
          </div>
          <div className="text-xs text-muted-foreground">
            Submitted {new Date(sub.currentDate).toLocaleString()}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
