import { motion } from 'framer-motion'
import { Coins, Trophy, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const topWorkers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    coins: 15420,
    rank: 1,
    tasksCompleted: 892,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    coins: 12350,
    rank: 2,
    tasksCompleted: 756,
  },
  {
    id: 3,
    name: 'Emily Williams',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    coins: 11280,
    rank: 3,
    tasksCompleted: 654,
  },
  {
    id: 4,
    name: 'David Kim',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    coins: 9870,
    rank: 4,
    tasksCompleted: 589,
  },
  {
    id: 5,
    name: 'Jessica Brown',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    coins: 8650,
    rank: 5,
    tasksCompleted: 512,
  },
  {
    id: 6,
    name: 'Alex Rodriguez',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    coins: 7890,
    rank: 6,
    tasksCompleted: 478,
  },
]

const getRankBadge = (rank: number) => {
  if (rank === 1) return { color: 'from-yellow-400 to-amber-500', icon: '🥇' }
  if (rank === 2) return { color: 'from-gray-300 to-gray-400', icon: '🥈' }
  if (rank === 3) return { color: 'from-amber-600 to-amber-700', icon: '🥉' }
  return null
}

const BestWorkersSection = () => {
  return (
    <section className="section-padding bg-linear-to-b from-background to-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 text-accent" />
            <span>Top Performers</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Best <span className="gradient-text-gold">Workers</span> of the
            Month
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our highest earning workers who have mastered the art of task
            completion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topWorkers.map((worker, index) => {
            const rankBadge = getRankBadge(worker.rank)
            return (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`card-hover group relative overflow-hidden ${
                    worker.rank <= 3 ? 'border-2 border-accent/30' : ''
                  }`}
                >
                  {rankBadge && (
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-bl ${rankBadge.color} opacity-10`}
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar with rank badge */}
                      <div className="relative">
                        <div
                          className={`w-16 h-16 rounded-2xl overflow-hidden ring-2 ${
                            worker.rank <= 3 ? 'ring-accent' : 'ring-border'
                          }`}
                        >
                          <img
                            src={worker.avatar}
                            alt={worker.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {rankBadge && (
                          <div className="absolute -top-2 -right-2 text-2xl">
                            {rankBadge.icon}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">
                            {worker.name}
                          </h3>
                          {worker.rank <= 3 && (
                            <Star className="w-4 h-4 text-accent fill-accent" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {worker.tasksCompleted} tasks completed
                        </p>
                        <div className="coin-badge">
                          <Coins className="w-4 h-4" />
                          <span>{worker.coins.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Rank Number */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold ${
                          worker.rank <= 3
                            ? 'bg-linear-to-br from-accent to-accent/80 text-accent-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        #{worker.rank}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BestWorkersSection
