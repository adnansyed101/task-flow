import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/worker/')({
  component: WorkerIndex,
})

function WorkerIndex() {
  return <Navigate to="/dashboard/worker/home" />
}
