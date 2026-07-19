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
import { paymentsKey } from '#/lib/constants'
import type { PaymentType } from '#/lib/schema/payments'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { format } from 'date-fns'

export const Route = createFileRoute('/dashboard/buyer/payment-history')({
  component: PaymentHistory,
})

type PaymentResponseType = {
  data: PaymentType[]
  message: string
  success: boolean
}

function PaymentHistory() {
  const payments = useQuery({
    queryKey: [paymentsKey],
    queryFn: async (): Promise<PaymentResponseType> => {
      try {
        const response = await axios.get('/api/payment-history')
        return response.data
      } catch (error) {
        // Handle database or other unexpected errors
        return { success: false, message: 'Internal server error', data: [] }
      }
    },
  })

  if (payments.error) {
    return (
      <>
        <h1>Something went wrong</h1>
        <p>{payments.error.toString()}</p>
      </>
    )
  }

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
              <TableHead>Transaction Id</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Coins</TableHead>
              <TableHead>Payment Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.isLoading || payments.isPending ? (
              // Show Spinner if data is loading
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : (
              <>
                {/* Check if any payments are made. */}
                {payments.data.data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No payments yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {/* If payments are made map over it. */}
                    {payments.data.data.map((p) => (
                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          {p.transactionId}
                        </TableCell>
                        <TableCell>{p.amount}</TableCell>
                        <TableCell>{p.coinsBought}</TableCell>
                        <TableCell>
                          {format(p.paymentDate, 'dd / MMMM / yyyy')}
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
