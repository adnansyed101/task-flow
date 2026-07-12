import SectionHeader from '#/components/dashboard/section-header'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

export const Route = createFileRoute('/dashboard/admin/manage-task')({
  component: ManageTaskPage,
})

function ManageTaskPage() {
  return (
    <>
      <SectionHeader
        title="Manage tasks"
        subtitle="Remove abusive or expired tasks."
      />
      <Card className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Slots</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {tasks.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="max-w-md truncate font-medium">
                  {t.title}
                </TableCell>
                <TableCell>{t.buyerName}</TableCell>
                <TableCell>{t.requiredWorkers}</TableCell>
                <TableCell>{t.payableAmount} coins</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      deleteTask(t.id)
                      toast('Task deleted')
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                No Tasks Yet
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
