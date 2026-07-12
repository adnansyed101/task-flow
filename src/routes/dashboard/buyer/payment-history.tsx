import SectionHeader from '#/components/dashboard/section-header'
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

export const Route = createFileRoute('/dashboard/buyer/payment-history')({
  component: PaymentHistory,
})

function PaymentHistory() {
  return (
    <>
      <SectionHeader
        title="Payment history"
        subtitle="Every top-up you've made on Micron."
      />
      <Card className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Coins</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                {new Date().toLocaleString()}
              </TableCell>
              <TableCell>+ 10</TableCell>
              <TableCell>$20</TableCell>
              <TableCell>Card ····4242</TableCell>
            </TableRow>

            {/* {payments.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No payments yet.
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
