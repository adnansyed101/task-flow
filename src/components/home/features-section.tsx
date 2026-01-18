import { motion } from 'framer-motion'
import { Shield, Zap, Globe, Headphones, CreditCard, Lock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Verified Workers',
    description:
      'Every worker goes through our verification process ensuring quality work',
  },
  {
    icon: Zap,
    title: 'Instant Payments',
    description: 'Get paid immediately after task approval. No waiting periods',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access workers from 150+ countries for diverse perspectives',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated support team is always ready to help you',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'Withdraw via Bkash, Rocket, Nagad, and more payment methods',
  },
  {
    icon: Lock,
    title: 'Secure Platform',
    description: 'Bank-level security protects your data and transactions',
  },
]

const FeaturesSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="gradient-text">TaskFlow</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with trust, speed, and reliability at its core
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 group"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
