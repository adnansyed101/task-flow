import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/buyer/add-task')({
  component: AddTaskPage,
})

function AddTaskPage() {
  return <div>Hello "/dashboard/buyer/add-task"!</div>
}
