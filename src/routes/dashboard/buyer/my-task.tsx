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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { Textarea } from '#/components/ui/textarea'
import { taskConstant, taskKey } from '#/lib/constants'
import { FormTaskSchema, type FormTaskValuesType } from '#/lib/schema/task'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import z from 'zod'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/buyer/my-task')({
  component: MyTasks,
})

type TasksResponseType = {
  data: FormTaskValuesType[]
  message: string
  success: boolean
}

function MyTasks() {
  const [selectedItem, setSelectedItem] =
    useState<FormTaskValuesType>(taskConstant)
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<FormTaskValuesType>({
    resolver: zodResolver(FormTaskSchema),
    values: selectedItem,
  })

  const { data: tasks } = useQuery({
    queryKey: [taskKey],
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

  // Mutation to create task.
  const updateTaskMutation = useMutation({
    mutationFn: async (newTaskData: FormTaskValuesType) => {
      try {
        const validatedData = FormTaskSchema.parse(newTaskData)
        const response = await axios.patch('/api/task', validatedData)
        return response.data
      } catch (error) {
        // z.parse() throws a ZodError if validation fails
        if (error instanceof z.ZodError) {
          return { success: false, error: error.issues }
        }

        // Handle database or other unexpected errors
        return { success: false, error: 'Internal server error' }
      }
    },
    // When successful, clear the cache to show the updated data
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({ queryKey: [taskKey] })
      return toast.success(data.message)
    },
    onError: (error) => {
      console.error('Error creating task:', error.message)
    },
  })

  // Mutation to create task.
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.delete(`/api/task/${id}`)
        return response.data
      } catch (error) {
        // z.parse() throws a ZodError if validation fails
        if (error instanceof z.ZodError) {
          return { success: false, error: error.issues }
        }

        // Handle database or other unexpected errors
        return { success: false, error: 'Internal server error' }
      }
    },
    // When successful, clear the cache to show the updated data
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({ queryKey: [taskKey] })
      return toast.success(data.message)
    },
    onError: (error) => {
      console.error('Error creating task:', error.message)
    },
  })

  const handleOpenDialog = (item: FormTaskValuesType) => {
    item.completionDate = new Date(item.completionDate)
    setSelectedItem(item)
    setIsOpen(true)
  }

  function onSubmit(taskData: FormTaskValuesType) {
    updateTaskMutation.mutate(taskData)
  }

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
            {tasks?.data.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="max-w-md truncate font-medium">
                  {t.taskTitle}
                </TableCell>
                <TableCell>{t.requiredWorkers}</TableCell>
                <TableCell>{t.payableAmount}</TableCell>
                <TableCell className="text-muted-foreground">
                  {format(t.completionDate, 'dd / MMMM / yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenDialog(t)}
                  >
                    Update
                  </Button>{' '}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      deleteMutation.mutate(t.id)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {tasks?.data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  You haven't posted any tasks yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update task</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="taskTitle"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="taskTitle">Title</FieldLabel>
                    <Input
                      id="taskTitle"
                      {...field}
                      required
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Title"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="taskDetail"
                control={form.control}
                render={({ field, fieldState }) => (
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
                )}
              />
              <Controller
                name="submissionInfo"
                control={form.control}
                render={({ field, fieldState }) => (
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
                )}
              />
            </FieldGroup>

            <Button className="rounded-full" type="submit">
              Save changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
