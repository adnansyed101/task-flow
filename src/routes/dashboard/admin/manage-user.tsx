import SectionHeader from '#/components/dashboard/section-header'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/admin/manage-user')({
  component: ManageUsers,
})

function ManageUsers() {
  return (
    <>
      <SectionHeader
        title="Manage users"
        subtitle="Change roles or remove accounts."
      />
      <Card className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Coins</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={u.photoURL} />
                      <AvatarFallback>{u.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {u.email}
                </TableCell>
                <TableCell>{u.coins}</TableCell>
                <TableCell>
                  <Select
                    value={u.role}
                    // onValueChange={(v) => {
                    //   updateUserRole(u.id, v as Role)
                    //   toast.success('Role updated')
                    // }}
                  >
                    <SelectTrigger className="h-8 w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="worker">Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                No Users Yet
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
