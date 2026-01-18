import { motion } from 'framer-motion'
import { Youtube, Globe, MessageSquare, Eye, Share2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'


const taskCategories = [
  {
    title: 'Social Media',
    description: 'Engage with content across all major platforms',
    icon: Share2,
    tasks: ['Like posts', 'Follow accounts', 'Share content', 'Comment'],
    color: 'from-pink-500 to-rose-500',
    count: '2,450+',
  },
  {
    title: 'YouTube',
    description: 'Watch, like, and engage with video content',
    icon: Youtube,
    tasks: ['Watch videos', 'Subscribe', 'Like videos', 'Comments'],
    color: 'from-red-500 to-red-600',
    count: '1,890+',
  },
  {
    title: 'Website Traffic',
    description: 'Visit websites and complete specific actions',
    icon: Globe,
    tasks: ['Site visits', 'Sign ups', 'App installs', 'Surveys'],
    color: 'from-blue-500 to-indigo-500',
    count: '3,200+',
  },
  {
    title: 'Reviews & Ratings',
    description: 'Provide genuine feedback and reviews',
    icon: MessageSquare,
    tasks: ['App reviews', 'Product ratings', 'Testimonials', 'Feedback'],
    color: 'from-emerald-500 to-teal-500',
    count: '890+',
  },
]

const TaskCategoriesSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Eye className="w-4 h-4" />
            <span>Task Categories</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Diverse <span className="gradient-text">Task Types</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From social media engagement to market research, find tasks that
            match your skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {taskCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full card-hover group relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <CardContent className="p-6">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {category.title}
                    </h3>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {category.count} tasks
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Task Types */}
                  <div className="flex flex-wrap gap-2">
                    {category.tasks.map((task) => (
                      <span
                        key={task}
                        className="text-xs px-2 py-1 rounded-lg bg-secondary text-secondary-foreground"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TaskCategoriesSection
