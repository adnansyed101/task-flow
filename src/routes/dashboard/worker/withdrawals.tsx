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
import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'

export const Route = createFileRoute('/dashboard/worker/withdrawals')({
  component: WithdrawalsPage,
})

function WithdrawalsPage() {
  // const user = currentUser()!
  const [coin, setCoin] = useState(200)
  const [system, setSystem] = useState('Bkash')
  const [account, setAccount] = useState('')
  const enough = 500 >= 200
  const amount = coin / 20
  return (
    <>
      <SectionHeader
        title="Withdrawals"
        subtitle="20 coins = $1. Minimum withdrawal is 200 coins."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card className="p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Available balance
          </div>
          <div className="mt-2 font-display text-5xl">{20}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            ≈ ${(200 / 20).toFixed(2)} USD
          </div>
          <div className="mt-6 h-px bg-border" />
          <div className="mt-6 text-sm text-muted-foreground">
            Buyers purchase 10 coins for $1. Workers withdraw 20 coins for $1 —
            that spread keeps Micron running.
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label>Coins to withdraw</Label>
              <Input
                type="number"
                // value={400}
                min={200}
                // max={user.coins}
                // onChange={(e) => setCoin(Number(e.target.value))}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Amount ($)</Label>
              {/* <Input value={amount.toFixed(2)} disabled className="mt-1.5" /> */}
            </div>
            <div>
              <Label>Payment system</Label>
              <Select value={system} onValueChange={setSystem}>
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bkash">Bkash</SelectItem>
                  <SelectItem value="Rocket">Rocket</SelectItem>
                  <SelectItem value="Nagad">Nagad</SelectItem>
                  <SelectItem value="Bank transfer">Bank transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Account number</Label>
              <Input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="mt-1.5"
              />
            </div>
            {enough ? (
              <Button
                className="w-full rounded-full"
                size="lg"
                // onClick={submit}
              >
                Request withdrawal
              </Button>
            ) : (
              <div className="rounded-md border border-border bg-muted px-3 py-2 text-center text-sm text-muted-foreground">
                Insufficient coins — earn at least 200 to withdraw.
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  )
}
