import SectionHeader from '#/components/dashboard/section-header'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/buyer/add-task')({
  component: AddTaskPage,
})

function AddTaskPage() {
  const { session } = Route.useRouteContext()
  if (!session) {
    throw new Error('No session found in add task page')
  }

  function submit() {
    console.log('submit')
  }

  return (
    <>
      <SectionHeader
        title="Post a new task"
        subtitle="Describe the work, set your reward, and reach thousands of workers."
      />

      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6 lg:col-span-2">
          <Label>Task title</Label>
          <Input
            required
            // value={f.title}
            // onChange={(e) => setF({ ...f, title: e.target.value })}
            className="mt-1.5"
            placeholder="e.g. Watch my YouTube video and leave a comment"
          />
        </Card>
        <Card className="p-6 lg:col-span-2">
          <Label>Task detail</Label>
          <Textarea
            required
            rows={4}
            // value={f.detail}
            // onChange={(e) => setF({ ...f, detail: e.target.value })}
            className="mt-1.5"
            placeholder="Explain exactly what the worker needs to do."
          />
        </Card>
        <Card className="p-6">
          <Label>Required workers</Label>
          <Input
            type="number"
            min={1}
            // value={f.requiredWorkers}
            // onChange={(e) =>
            //   setF({ ...f, requiredWorkers: Number(e.target.value) })
            // }
            className="mt-1.5"
          />
        </Card>
        <Card className="p-6">
          <Label>Payable amount (coins each)</Label>
          <Input
            type="number"
            min={1}
            // value={f.payableAmount}
            // onChange={(e) =>
            //   setF({ ...f, payableAmount: Number(e.target.value) })
            // }
            className="mt-1.5"
          />
        </Card>
        <Card className="p-6">
          <Label>Completion date</Label>
          <Input
            type="date"
            // value={f.completionDate}
            // onChange={(e) => setF({ ...f, completionDate: e.target.value })}
            className="mt-1.5"
          />
        </Card>
        <Card className="p-6">
          <Label>Task image URL</Label>
          <Input
            // value={f.imageUrl}
            // onChange={(e) => setF({ ...f, imageUrl: e.target.value })}
            className="mt-1.5"
            placeholder="Optional — link to a preview image"
          />
        </Card>
        <Card className="p-6 lg:col-span-2">
          <Label>Submission info</Label>
          <Textarea
            required
            rows={2}
            // value={f.submissionInfo}
            // onChange={(e) => setF({ ...f, submissionInfo: e.target.value })}
            className="mt-1.5"
            placeholder="What proof do you need? (e.g. screenshot with visible username)"
          />
        </Card>
        <Card className="flex flex-wrap items-center justify-between gap-4 p-6 lg:col-span-2">
          <div>
            <div className="text-xs uppercase text-muted-foreground">
              Total cost
            </div>
            <div className="font-display text-3xl">{100} coins</div>
            <p className="text-xs text-muted-foreground">
              You have {session.user.coin} available
            </p>
          </div>
          <Button size="lg" type="submit" className="rounded-full">
            Post task
          </Button>
        </Card>
      </form>
    </>
  )
}
