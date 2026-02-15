import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tasks')({
  component: TaskPage,
})

function TaskPage() {
  return <div>Hello "/dashboard/tasks"!</div>
}
