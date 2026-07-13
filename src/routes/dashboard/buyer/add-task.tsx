import SectionHeader from '#/components/dashboard/section-header'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { FormTaskSchema, type FormTaskValuesType } from '#/lib/schema/task'
import { taskConstant } from '#/lib/constants'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '#/components/ui/calendar'
import { createTask } from '#/lib/actions/task.actions'
import { Spinner } from '#/components/ui/spinner'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/buyer/add-task')({
  component: AddTaskPage,
})

function AddTaskPage() {
  const session = Route.useRouteContext()

  const form = useForm<FormTaskValuesType>({
    resolver: zodResolver(FormTaskSchema),
    defaultValues: { ...taskConstant, buyerId: session.user.id },
  })

  async function onSubmit(data: FormTaskValuesType) {
    const task = await createTask({ data })

    if (task) {
      toast.success('Task posted successfully')
      form.reset()
    }
  }

  const requiredWorkers = form.watch('requiredWorkers')
  const payableAmount = form.watch('payableAmount')

  const total = requiredWorkers * payableAmount

  return (
    <>
      <SectionHeader
        title="Post a new task"
        subtitle="Describe the work, set your reward, and reach thousands of workers."
      />

      <form onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}>
        <FieldGroup className="grid gap-4 lg:grid-cols-2">
          <Controller
            name="taskTitle"
            control={form.control}
            render={({ field, fieldState }) => (
              <Card className="p-6 lg:col-span-2">
                <Field>
                  <FieldLabel htmlFor="taskTitle">Task Title</FieldLabel>
                  <Input
                    id="taskTitle"
                    {...field}
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Task Title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </Card>
            )}
          />

          <Controller
            name="taskDetail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Card className="p-6 lg:col-span-2">
                <Field>
                  <FieldLabel htmlFor="taskDetail">Task Details</FieldLabel>
                  <Textarea
                    rows={6}
                    id="taskDetail"
                    {...field}
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Task Details"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </Card>
            )}
          />

          <Controller
            name="requiredWorkers"
            control={form.control}
            render={({ field, fieldState }) => (
              <Card className="p-6">
                <Field>
                  <FieldLabel htmlFor="requiredWorkers">
                    Required Workers
                  </FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    id="requiredWorkers"
                    {...field}
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter number of workers required."
                    autoComplete="off"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </Card>
            )}
          />
          <Controller
            name="payableAmount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Card className="p-6">
                <Field>
                  <FieldLabel htmlFor="payableAmount">
                    Payable Amount
                  </FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    id="payableAmount"
                    {...field}
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Task Details"
                    autoComplete="off"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </Card>
            )}
          />
          <Controller
            name="completionDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Card className="p-6">
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="completionDate"
                    className="text-sm font-medium"
                  >
                    Completion Date
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant={'outline'}>
                        {field.value.toLocaleDateString()}
                        <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        required
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{ before: new Date() }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </Card>
            )}
          />

          <Controller
            name="taskImageUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Card className="p-6">
                <Field>
                  <FieldLabel htmlFor="taskImageUrl">Task Image URL</FieldLabel>
                  <Input
                    id="taskImageUrl"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Optional — link to a preview image"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </Card>
            )}
          />
          <Controller
            name="submissionInfo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Card className="p-6 lg:col-span-2">
                <Field>
                  <FieldLabel htmlFor="submissionInfo">
                    Submission Info
                  </FieldLabel>
                  <Textarea
                    rows={2}
                    id="submissionInfo"
                    {...field}
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="What proof do you need? (e.g. screenshot with visible username)"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </Card>
            )}
          />
          <Card className="flex flex-row items-center justify-between gap-4 p-6 lg:col-span-2">
            <div>
              <div className="text-xs uppercase text-muted-foreground">
                Total cost
              </div>
              <div className="font-display text-3xl">{total} coins</div>
              <div className="text-xs text-muted-foreground">
                You have {session.user.coin} available
              </div>
            </div>
            <div>
              <Button
                size="lg"
                type="submit"
                className="rounded-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Spinner />}
                {form.formState.isSubmitting ? 'Posting task' : 'Post task'}
              </Button>
            </div>
          </Card>
        </FieldGroup>
      </form>
    </>
  )
}
