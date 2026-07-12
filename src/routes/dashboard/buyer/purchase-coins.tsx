import SectionHeader from '#/components/dashboard/section-header'
import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Coins } from 'lucide-react'

export const Route = createFileRoute('/dashboard/buyer/purchase-coins')({
  component: PurchaseCoins,
})

function PurchaseCoins() {
  const COIN_PACKS = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ]
  return (
    <>
      <SectionHeader
        title="Purchase coins"
        subtitle="Top up to post more tasks. Payments are simulated in this demo."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COIN_PACKS.map((p) => (
          <div
            key={p.coins}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
          >
            <Coins className="h-6 w-6 text-accent" />
            <div className="mt-6 font-display text-4xl">{p.coins}</div>
            <div className="mt-1 text-sm text-muted-foreground">coins</div>
            <div className="mt-6 flex items-end justify-between">
              <div className="text-2xl font-semibold">${p.price}</div>
              <Button
                size="sm"
                className="rounded-full"
                // onClick={() => buy(p.coins, p.price)}
              >
                Buy
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
