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

export const Route = createFileRoute('/dashboard/admin/home')({
  component: DashboardPage,
})

function DashboardPage() {
  const session = Route.useRouteContext()

  if (!session) {
    throw new Error('No session found in buyer home page')
  }

  return (
    <>
      <SectionHeader
        title={`Welcome back, ${session.user.name.split(' ')[0]}`}
        subtitle="Here's what's happening with your work."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total submissions" value={20} />
        <StatCard label="Pending review" value={30} />
        <StatCard
          label="Total earnings"
          value={`${10} coins`}
          hint={`≈ $${(100 / 20).toFixed(2)}`}
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
              <TableRow>
                <TableCell className="font-medium">This is task 1</TableCell>
                <TableCell>20 coins</TableCell>
                <TableCell>Md Adnan</TableCell>
                <TableCell>
                  <StatusBadge status="approved" />
                </TableCell>
              </TableRow>
              {/* {subs.filter((s) => s.status === 'approved').length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    No approved submissions yet. Complete tasks to see them
                    here.
                  </TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  )
}
