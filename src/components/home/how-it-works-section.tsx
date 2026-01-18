import { motion } from 'framer-motion'
import { CheckCircle, Clock, DollarSign, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    step: 1,
    title: 'Create Your Account',
    description:
      'Sign up as a Worker to complete tasks or as a Buyer to post tasks. Get bonus coins instantly!',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: 2,
    title: 'Browse or Post Tasks',
    description:
      'Workers browse available tasks while Buyers create and manage their task campaigns.',
    icon: Clock,
    color: 'from-primary to-primary/70',
  },
  {
    step: 3,
    title: 'Complete & Verify',
    description:
      'Workers submit proof of completion. Buyers review and approve quality submissions.',
    icon: CheckCircle,
    color: 'from-success to-emerald-500',
  },
  {
    step: 4,
    title: 'Get Paid',
    description:
      'Earn coins for every approved task. Withdraw your earnings through multiple payment options.',
    icon: DollarSign,
    color: 'from-accent to-amber-500',
  },
]

const HowItWorksSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How <span className="gradient-text">TaskFlow</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and begin earning or getting tasks done right
            away
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-border to-transparent" />
              )}

              <Card className="h-full card-hover relative overflow-hidden group">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-14 h-14 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <span className="text-white font-display font-bold text-lg">
                        {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                      <step.icon className="w-7 h-7 text-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
