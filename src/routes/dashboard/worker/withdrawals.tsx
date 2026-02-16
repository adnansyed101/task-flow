import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Coins, DollarSign, AlertCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

// Mock user data
const mockUserCoins = 450
const COINS_PER_DOLLAR = 20
const MIN_WITHDRAWAL_COINS = 200

export const Route = createFileRoute('/dashboard/worker/withdrawals')({
  component: WithdrawalsPage,
})

function WithdrawalsPage() {
  const [coinsToWithdraw, setCoinsToWithdraw] = useState('')
  const [paymentSystem, setPaymentSystem] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const withdrawalAmount = Math.floor(
    Number(coinsToWithdraw) / COINS_PER_DOLLAR,
  )
  const hasInsufficientCoins = Number(coinsToWithdraw) > mockUserCoins
  const belowMinimum = mockUserCoins < MIN_WITHDRAWAL_COINS
  const invalidAmount =
    Number(coinsToWithdraw) < MIN_WITHDRAWAL_COINS && coinsToWithdraw !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!coinsToWithdraw || !paymentSystem || !accountNumber) {
      toast.error('Please fill in all fields')
      return
    }

    if (hasInsufficientCoins || invalidAmount) {
      toast('Invalid withdrawal amount')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      toast.success('Withdrawal Request Submitted!', {
        description: `Your request for $${withdrawalAmount} has been submitted for review.`,
      })
      setIsSubmitting(false)
      setCoinsToWithdraw('')
      setPaymentSystem('')
      setAccountNumber('')
    }, 1500)
  }
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl font-bold mb-2">Withdrawals</h1>
        <p className="text-muted-foreground">
          Withdraw your earnings to your preferred payment method
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 mb-1">Your Balance</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-display font-bold">
                    {mockUserCoins}
                  </span>
                  <span className="text-xl">coins</span>
                  <span className="text-primary-foreground/80 mt-2">
                    = ${Math.floor(mockUserCoins / COINS_PER_DOLLAR)} USD
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exchange Rate Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-coin/20 flex items-center justify-center">
                <Coins className="w-5 h-5 text-coin-foreground" />
              </div>
              <div>
                <p className="font-medium">Exchange Rate</p>
                <p className="text-sm text-muted-foreground">
                  20 Coins = $1 USD | Minimum: 200 coins ($10)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Withdrawal Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>
              Fill in the details to request a withdrawal
            </CardDescription>
          </CardHeader>
          <CardContent>
            {belowMinimum ? (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-lg text-destructive">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="font-medium">Insufficient Balance</p>
                  <p className="text-sm">
                    You need at least 200 coins ($10) to withdraw.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coins">Coins to Withdraw *</Label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="coins"
                      type="number"
                      min={MIN_WITHDRAWAL_COINS}
                      max={mockUserCoins}
                      placeholder="Enter amount (min 200)"
                      className="pl-10"
                      value={coinsToWithdraw}
                      onChange={(e) => setCoinsToWithdraw(e.target.value)}
                    />
                  </div>
                  {invalidAmount && (
                    <p className="text-sm text-destructive">
                      Minimum withdrawal is 200 coins
                    </p>
                  )}
                  {hasInsufficientCoins && (
                    <p className="text-sm text-destructive">
                      You don't have enough coins
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Withdrawal Amount (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="text"
                      value={coinsToWithdraw ? `$${withdrawalAmount}` : ''}
                      className="pl-10 bg-secondary"
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment">Payment Method *</Label>
                  <Select
                    value={paymentSystem}
                    onValueChange={setPaymentSystem}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bkash">Bkash</SelectItem>
                      <SelectItem value="rocket">Rocket</SelectItem>
                      <SelectItem value="nagad">Nagad</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account">Account Number *</Label>
                  <Input
                    id="account"
                    type="text"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary-gradient"
                  disabled={
                    isSubmitting || hasInsufficientCoins || invalidAmount
                  }
                >
                  {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
