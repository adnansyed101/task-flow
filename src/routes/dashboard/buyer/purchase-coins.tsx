import SectionHeader from '#/components/dashboard/section-header'
import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Coins, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/buyer/purchase-coins')({
  component: PurchaseCoins,
})

interface CartItem {
  coins: number
  price: number
  quantity: number
}

function PurchaseCoins() {
  const [cart, setCart] = useState<CartItem[]>([])

  const COIN_PACKS = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ]

  const totalCoins = cart.reduce(
    (sum, item) => sum + item.coins * item.quantity,
    0,
  )
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  function addToCart(coins: number, price: number) {
    setCart((prev) => {
      const existing = prev.find((item) => item.coins === coins)
      if (existing) {
        return prev.map((item) =>
          item.coins === coins
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { coins, price, quantity: 1 }]
    })
    toast.success(`${coins} coins added to cart`)
  }

  function removeFromCart(coins: number) {
    setCart((prev) => prev.filter((item) => item.coins !== coins))
  }

  function checkout() {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    toast.success(`Purchased ${totalCoins} coins for $${totalPrice}`)
    setCart([])
  }

  return (
    <>
      <SectionHeader
        title="Purchase coins"
        subtitle="Top up to post more tasks. Payments are simulated in this demo."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COIN_PACKS.map((p) => {
          const inCart = cart.find((item) => item.coins === p.coins)
          return (
            <div
              key={p.coins}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
            >
              <Coins className="h-6 w-6 text-accent" />
              <div className="mt-6 font-display text-4xl">{p.coins}</div>
              <div className="mt-1 text-sm text-muted-foreground">coins</div>
              <div className="mt-6 flex items-end justify-between">
                <div className="text-2xl font-semibold">৳ {p.price}</div>
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={() => addToCart(p.coins, p.price)}
                >
                  {inCart ? `In cart (${inCart.quantity})` : 'Buy'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
      {cart.length > 0 && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 font-medium">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </div>
          <div className="mt-4 space-y-3">
            {cart.map((item) => (
              <div
                key={item.coins}
                className="flex items-center justify-between"
              >
                <span className="text-sm">
                  {item.coins} coins × {item.quantity}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    ${item.price * item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.coins)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="font-medium">
              {totalCoins} coins — ${totalPrice}
            </div>
            <Button onClick={checkout}>Checkout</Button>
          </div>
        </div>
      )}
    </>
  )
}
