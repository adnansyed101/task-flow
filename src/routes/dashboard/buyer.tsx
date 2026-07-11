import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/buyer')({
  component: BuyerPage,
})

function BuyerPage() {
  return (
    <div>
      Hello "/dashboard/buyer"!
      <p>asdadsdasdasdasd</p>
    </div>
  )
}
