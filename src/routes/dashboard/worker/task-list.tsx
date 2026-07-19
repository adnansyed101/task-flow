import EmptyState from '#/components/dashboard/empty-state'
import SectionHeader from '#/components/dashboard/section-header'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Label } from '#/components/ui/label'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import type { ResponseTaskType } from '#/lib/schema/task'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { format } from 'date-fns'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/worker/task-list')({
  component: TaskListPage,
})

type TasksResponseType = {
  data: ResponseTaskType[]
  message: string
  success: boolean
}

function TaskListPage() {
  const [selected, setSelected] = useState<ResponseTaskType | null>(null)

  const tasks = useQuery({
    queryKey: ['worker-tasks'],
    queryFn: async (): Promise<TasksResponseType> => {
      try {
        const response = await axios.get('/api/task')
        return response.data
      } catch (error) {
        // Handle database or other unexpected errors
        return { success: false, message: 'Internal server error', data: [] }
      }
    },
  })

  if (tasks.error) {
    return (
      <>
        <h1>Something went wrong</h1>
        <p>{tasks.error.toString()}</p>
      </>
    )
  }

  return (
    <>
      <SectionHeader
        title="Available tasks"
        subtitle="Pick a task, complete it, and submit your proof."
      />

      {tasks.isLoading || tasks.isPending ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {tasks.data.data.length === 0 ? (
            <EmptyState
              title="No open tasks right now"
              hint="Check back soon."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.data.data.map((t) => (
                <div
                  key={t.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={t.taskImageUrl}
                      alt={t.taskTitle}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      by {t.buyer.name}
                    </div>
                    <div className="mt-1 line-clamp-2 font-medium">
                      {t.taskTitle}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground">Reward</div>
                        <div className="font-medium">
                          {t.payableAmount} coins
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Slots</div>
                        <div className="font-medium">{t.requiredWorkers}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Due</div>
                        <div className="font-medium">
                          {format(t.completionDate, 'dd / MMMM / yyyy')}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="mt-4 w-full rounded-full"
                      onClick={() => setSelected(t)}
                    >
                      View details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <TaskDetailsDialog task={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function TaskDetailsDialog({
  task,
  onClose,
}: {
  task: ResponseTaskType | null
  onClose: () => void
}) {
  const [details, setDetails] = useState('')
  // const user = currentUser();
  if (!task) return null

  const send = () => {
    if (!details.trim()) return toast.error('Please enter your submission.')

    toast.success('Submission sent for review')
    setDetails('')
    onClose()
  }

  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{task.taskTitle}</DialogTitle>
          <DialogDescription>Posted by {task.buyer.name}</DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <img
            src={task.taskImageUrl}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="grid grid-cols-3 gap-4 rounded-xl border border-border p-4 text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Reward</div>
            <div className="font-medium">{task.payableAmount} coins</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Slots left</div>
            <div className="font-medium">{task.requiredWorkers}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Deadline</div>
            <div className="font-medium">
              {format(task.completionDate, 'dd / MMMM / yyyy')}
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase text-muted-foreground">
            Task detail
          </div>
          <p className="mt-1 text-sm">{task.taskDetail}</p>
        </div>
        <div>
          <div className="text-xs font-medium uppercase text-muted-foreground">
            Submission required
          </div>
          <p className="mt-1 text-sm">{task.submissionInfo}</p>
        </div>
        <div>
          <Label htmlFor="sub">Your submission</Label>
          <Textarea
            id="sub"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mt-1.5"
            placeholder="Paste your proof (link, description, or screenshot URL)…"
          />
        </div>
        <Button className="rounded-full" onClick={send}>
          <Send className="mr-2 h-4 w-4" /> Submit for review
        </Button>
      </DialogContent>
    </Dialog>
  )
}
