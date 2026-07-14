import SectionHeader from '#/components/dashboard/section-header'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
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
import { getTasks } from '#/lib/actions/task.actions'
import { ensureSession } from '#/middleware/auth.function'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/buyer/my-task')({
  component: MyTasks,
  loader: async () => {
    const session = await ensureSession()
    const tasks = await getTasks({ data: { buyerId: session.user.id } })
    return tasks
  },
})

async function MyTasks() {
  const [editing, setEditing] = useState<any>(null)
  const myTasks = Route.useLoaderData()

  // const myTasks = await getTasks({ data: { buyerId: session.user.id } })

  console.log(myTasks)

  return (
    <>
      <SectionHeader
        title="My tasks"
        subtitle="Update details or delete a task to refund its remaining coins."
      />
      <Card className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slots left</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="max-w-md truncate font-medium">
                {/* {t.title} */}
                This is task 1
              </TableCell>
              <TableCell>20</TableCell>
              <TableCell>300 coins</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date().toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  // onClick={() => openEdit(t)}
                >
                  Update
                </Button>{' '}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  // onClick={() => {
                  //   deleteTask(t.id)
                  //   toast('Task deleted, coins refunded')
                  // }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>

            {/* {sorted.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  You haven't posted any tasks yet.
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                // value={f.title}
                // onChange={(e) => setF({ ...f, title: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Detail</Label>
              <Textarea
                rows={3}
                // value={f.detail}
                // onChange={(e) => setF({ ...f, detail: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Submission info</Label>
              <Textarea
                rows={2}
                // value={f.submissionInfo}
                // onChange={(e) => setF({ ...f, submissionInfo: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <Button className="rounded-full">Save changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
