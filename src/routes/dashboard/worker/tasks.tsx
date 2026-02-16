import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Coins, Calendar, Users, Eye, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock data - will be replaced with real data
const tasks = [
  {
    id: 1,
    title: 'Watch YouTube Video & Comment',
    buyerName: 'TechReviews Inc.',
    completionDate: '2024-01-20',
    payableAmount: 15,
    requiredWorkers: 45,
    imageUrl:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Follow Instagram Account',
    buyerName: 'Fashion Brand X',
    completionDate: '2024-01-18',
    payableAmount: 10,
    requiredWorkers: 120,
    imageUrl:
      'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'Sign up for Newsletter',
    buyerName: 'Startup Labs',
    completionDate: '2024-01-22',
    payableAmount: 20,
    requiredWorkers: 30,
    imageUrl:
      'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=400&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'Rate App on Play Store',
    buyerName: 'AppDev Studio',
    completionDate: '2024-01-25',
    payableAmount: 25,
    requiredWorkers: 80,
    imageUrl:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
  },
  {
    id: 5,
    title: 'Complete Survey',
    buyerName: 'Market Research Co.',
    completionDate: '2024-01-19',
    payableAmount: 30,
    requiredWorkers: 25,
    imageUrl:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop',
  },
  {
    id: 6,
    title: 'Download & Try App',
    buyerName: 'GameDev Inc.',
    completionDate: '2024-01-21',
    payableAmount: 35,
    requiredWorkers: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
  },
]

export const Route = createFileRoute('/dashboard/worker/tasks')({
  component: TasksPage,
})

function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Available Tasks</h1>
          <p className="text-muted-foreground">
            Browse and complete tasks to earn coins
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {tasks.length} tasks available
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover overflow-hidden group">
              {/* Task Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={task.imageUrl}
                  alt={task.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <div className="coin-badge">
                    <Coins className="w-3.5 h-3.5" />+{task.payableAmount}
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {task.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>By {task.buyerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Due: {new Date(task.completionDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-success" />
                    <span className="text-success font-medium">
                      {task.requiredWorkers} spots left
                    </span>
                  </div>
                </div>

                <Link to={`/dashboard/tasks/${task.id}`}>
                  <Button className="w-full btn-primary-gradient">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
