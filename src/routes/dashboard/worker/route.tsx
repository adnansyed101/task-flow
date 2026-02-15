import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { FileText, Clock, Coins, TrendingUp, CheckCircle } from 'lucide-react'
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

// Mock data
const stats = [
  {
    title: 'Total Submissions',
    value: '48',
    icon: FileText,
    change: '+12 this week',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Pending Submissions',
    value: '5',
    icon: Clock,
    change: 'Awaiting review',
    color: 'bg-warning/10 text-warning',
  },
  {
    title: 'Total Earnings',
    value: '1,250',
    icon: Coins,
    change: '+320 this month',
    color: 'bg-success/10 text-success',
  },
]

const approvedSubmissions = [
  {
    id: 1,
    taskTitle: 'Watch YouTube Video & Comment',
    payableAmount: 15,
    buyerName: 'TechReviews Inc.',
    status: 'approved',
    date: '2024-01-15',
  },
  {
    id: 2,
    taskTitle: 'Follow Instagram Account',
    payableAmount: 10,
    buyerName: 'Fashion Brand X',
    status: 'approved',
    date: '2024-01-14',
  },
  {
    id: 3,
    taskTitle: 'Sign up for Newsletter',
    payableAmount: 20,
    buyerName: 'Startup Labs',
    status: 'approved',
    date: '2024-01-13',
  },
  {
    id: 4,
    taskTitle: 'Rate App on Play Store',
    payableAmount: 25,
    buyerName: 'AppDev Studio',
    status: 'approved',
    date: '2024-01-12',
  },
]

export const Route = createFileRoute('/dashboard/worker')({
  component: WorkerDashboardPage,
})

function WorkerDashboardPage() {
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

      {/* Approved Submissions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Approved Submissions</CardTitle>
            <Badge variant="secondary" className="gap-1">
              <CheckCircle className="w-3 h-3" />
              {approvedSubmissions.length} approved
            </Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Title</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.taskTitle}
                    </TableCell>
                    <TableCell>{submission.buyerName}</TableCell>
                    <TableCell>
                      <div className="coin-badge text-xs">
                        <Coins className="w-3 h-3" />+{submission.payableAmount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-success/10 text-success border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
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
