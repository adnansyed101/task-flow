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
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/worker/home')({
  component: WorkerHomePage,
})

function WorkerHomePage() {
  const session = Route.useRouteContext()

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
        <Card>
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
              {/* {subs
                .filter((s) => s.status === 'approved')
                .map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.taskTitle}</TableCell>
                    <TableCell>{s.payableAmount} coins</TableCell>
                    <TableCell>{s.buyerName}</TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                  </TableRow>
                ))} */}

              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No approved submissions yet. Complete tasks to see them here.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  )
}
