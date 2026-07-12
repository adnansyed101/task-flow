import SectionHeader from '#/components/dashboard/section-header'
import StatCard from '#/components/dashboard/stat-card'
import StatusBadge from '#/components/dashboard/status-badge'
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

export const Route = createFileRoute('/dashboard/buyer/home')({
  component: BuyerHomePage,
})

function BuyerHomePage() {
  const { session } = Route.useRouteContext()

  if (!session) {
    throw new Error('No session found in buyer home page')
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
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {mySubs
                .filter((s) => s.status === 'pending')
                .map((s) => (
                  <ReviewRow key={s.id} sub={s} />
                ))} */}

              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No submissions waiting for review.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  )
}

function ReviewRow({ sub }: { sub: any }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{sub.workerName}</TableCell>
        <TableCell className="max-w-xs truncate">{sub.taskTitle}</TableCell>
        <TableCell>{sub.payableAmount} coins</TableCell>
        <TableCell className="text-right">
          <div className="inline-flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
              View
            </Button>
            <Button size="sm" onClick={() => console.log('action')}>
              Approve
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => console.log('action')}
            >
              Reject
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission from {sub.workerName}</DialogTitle>
            <DialogDescription>{sub.taskTitle}</DialogDescription>
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
