import SectionHeader from '#/components/dashboard/section-header'
import { createFileRoute } from '@tanstack/react-router'
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

export const Route = createFileRoute('/dashboard/admin/withdraw-requests')({
  component: WithdrawRequestRoute,
})

function WithdrawRequestRoute() {
  return (
    <>
      <SectionHeader
        title="Withdraw requests"
        subtitle="Approve payouts to release worker earnings."
      />
      <Card className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Worker</TableHead>
              <TableHead>Coins</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {withdrawals.map((w) => (
                <TableRow key={w.id}>
                  <TableCell className="font-medium">{w.workerName}</TableCell>
                  <TableCell>{w.withdrawalCoin}</TableCell>
                  <TableCell>${w.withdrawalAmount.toFixed(2)}</TableCell>
                  <TableCell>{w.paymentSystem}</TableCell>
                  <TableCell>
                    <StatusBadge status={w.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {w.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => {
                          approveWithdrawal(w.id);
                          toast.success("Approved");
                        }}
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))} */}

            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No withdrawal requests.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
