import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  ListTodo,
  Clock,
  CreditCard,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  Coins,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Mock data
const stats = [
  {
    title: 'Total Tasks',
    value: '12',
    icon: ListTodo,
    change: '+3 this week',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Pending Workers',
    value: '45',
    icon: Clock,
    change: 'Awaiting completion',
    color: 'bg-warning/10 text-warning',
  },
  {
    title: 'Total Paid',
    value: '$520',
    icon: CreditCard,
    change: 'This month',
    color: 'bg-success/10 text-success',
  },
]

const pendingSubmissions = [
  {
    id: 1,
    workerName: 'Sarah Johnson',
    taskTitle: 'Watch YouTube Video & Comment',
    payableAmount: 15,
    submissionDetails:
      "Video watched for 5 minutes, commented: 'Great tutorial on React hooks! Very helpful for beginners.'",
    submittedAt: '2024-01-15 14:30',
  },
  {
    id: 2,
    workerName: 'Michael Chen',
    taskTitle: 'Follow Instagram Account',
    payableAmount: 10,
    submissionDetails:
      'Screenshot attached showing follow confirmation. Account: @techreviewshub',
    submittedAt: '2024-01-15 13:45',
  },
  {
    id: 3,
    workerName: 'Emily Williams',
    taskTitle: 'Sign up for Newsletter',
    payableAmount: 20,
    submissionDetails:
      'Confirmation email received and screenshot attached. Email: emily.w@email.com',
    submittedAt: '2024-01-15 12:20',
  },
]

export const Route = createFileRoute('/dashboard/buyer/')({
  component: BuyerDashboardPage,
})

function BuyerDashboardPage() {
  const handleApprove = (submissionId: number) => {
    console.log('Approving submission:', submissionId)
    // Will implement actual approval logic
  }

  const handleReject = (submissionId: number) => {
    console.log('Rejecting submission:', submissionId)
    // Will implement actual rejection logic
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-display font-bold">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-success" />
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tasks to Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Tasks to Review</CardTitle>
            <Badge variant="secondary" className="gap-1">
              <Clock className="w-3 h-3" />
              {pendingSubmissions.length} pending
            </Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead>Task Title</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Submission</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.workerName}
                    </TableCell>
                    <TableCell>{submission.taskTitle}</TableCell>
                    <TableCell>
                      <div className="coin-badge text-xs">
                        <Coins className="w-3 h-3" />
                        {submission.payableAmount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submission Details</DialogTitle>
                            <DialogDescription>
                              Submitted by {submission.workerName} at{' '}
                              {submission.submittedAt}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 p-4 bg-secondary rounded-lg">
                            <p className="text-sm">
                              {submission.submissionDetails}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          className="bg-success hover:bg-success/90 text-success-foreground"
                          onClick={() => handleApprove(submission.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(submission.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
