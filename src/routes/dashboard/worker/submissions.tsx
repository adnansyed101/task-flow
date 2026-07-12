import { createFileRoute } from '@tanstack/react-router'
import EmptyState from '#/components/dashboard/empty-state'
import SectionHeader from '#/components/dashboard/section-header'
import StatCard from '#/components/dashboard/stat-card'
import StatusBadge from '#/components/dashboard/status-badge'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/worker/submissions')({
  component: SubmissionsPage,
})

function SubmissionsPage() {
  const [page, setPage] = useState(0)
  const perPage = 5
  const pages = Math.max(1, Math.ceil(20 / perPage))
  // const shown = subs.slice(page * perPage, page * perPage + perPage)
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
            {/* {shown.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.taskTitle}</TableCell>
                <TableCell>{s.buyerName}</TableCell>
                <TableCell>{s.payableAmount} coins</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(s.currentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={s.status} />
                </TableCell>
              </TableRow>
            ))} */}
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No submissions yet.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      {/* {subs.length > perPage && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Page {page + 1} of {pages}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page >= pages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )} */}
    </>
  )
}
