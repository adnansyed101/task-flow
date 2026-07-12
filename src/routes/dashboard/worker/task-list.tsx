import EmptyState from '#/components/dashboard/empty-state'
import SectionHeader from '#/components/dashboard/section-header'
import StatCard from '#/components/dashboard/stat-card'
import StatusBadge from '#/components/dashboard/status-badge'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Label } from '#/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { Textarea } from '#/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/worker/task-list')({
  component: TaskListPage,
})

const tasks = [
  {
    id: 'task-1',
    buyerId: 'buyer-1',
    buyerName: 'Nadia Rahman',
    buyerEmail: 'buyer@microtask.io',
    title: 'Watch YouTube video and leave a thoughtful comment',
    detail:
      'Watch the linked 3-minute video and leave a genuine comment (min 15 words) reflecting on the content.',
    requiredWorkers: 25,
    payableAmount: 6,
    completionDate: new Date(Date.now() + 6 * 864e5).toISOString().slice(0, 10),
    submissionInfo: 'Screenshot of your posted comment with visible username.',
    imageUrl:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    buyerId: 'buyer-1',
    buyerName: 'Nadia Rahman',
    buyerEmail: 'buyer@microtask.io',
    title: 'Follow our Instagram & like the pinned post',
    detail:
      'Follow @studio.north on Instagram and like the top pinned post. Send screenshot proof.',
    requiredWorkers: 40,
    payableAmount: 4,
    completionDate: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10),
    submissionInfo: 'Screenshot showing your username following the account.',
    imageUrl:
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 864e5).toISOString(),
  },
  {
    id: 'task-3',
    buyerId: 'buyer-1',
    buyerName: 'Nadia Rahman',
    buyerEmail: 'buyer@microtask.io',
    title: 'Write a 5-star Google review for our cafe',
    detail:
      'Write an honest, detailed Google review for Sunrise Cafe. Please only leave a review if you have actually visited.',
    requiredWorkers: 15,
    payableAmount: 10,
    completionDate: new Date(Date.now() + 10 * 864e5)
      .toISOString()
      .slice(0, 10),
    submissionInfo: 'Screenshot of the published review with your name.',
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 2 * 864e5).toISOString(),
  },
]

function TaskListPage() {
  const [selected, setSelected] = useState<any>(null)
  return (
    <>
      <SectionHeader
        title="Available tasks"
        subtitle="Pick a task, complete it, and submit your proof."
      />
      {tasks.length === 0 ? (
        <EmptyState title="No open tasks right now" hint="Check back soon." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={t.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  by {t.buyerName}
                </div>
                <div className="mt-1 line-clamp-2 font-medium">{t.title}</div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Reward</div>
                    <div className="font-medium">{t.payableAmount} coins</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Slots</div>
                    <div className="font-medium">{t.requiredWorkers}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Due</div>
                    <div className="font-medium">
                      {new Date(t.completionDate).toLocaleDateString(
                        undefined,
                        {
                          month: 'short',
                          day: 'numeric',
                        },
                      )}
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
      <TaskDetailsDialog task={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function TaskDetailsDialog({
  task,
  onClose,
}: {
  task: any
  onClose: () => void
}) {
  const [details, setDetails] = useState('')
  // const user = currentUser();
  if (!task) return null

  const send = () => {
    if (!details.trim()) return toast.error('Please enter your submission.')
    // submitTask({
    //   taskId: task.id,
    //   taskTitle: task.title,
    //   payableAmount: task.payableAmount,
    //   workerEmail: user.email,
    //   workerName: user.name,
    //   buyerName: task.buyerName,
    //   buyerEmail: task.buyerEmail,
    //   submissionDetails: details,
    // });
    toast.success('Submission sent for review')
    setDetails('')
    onClose()
  }

  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>Posted by {task.buyerName}</DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <img
            src={task.imageUrl}
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
              {new Date(task.completionDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase text-muted-foreground">
            Task detail
          </div>
          <p className="mt-1 text-sm">{task.detail}</p>
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
