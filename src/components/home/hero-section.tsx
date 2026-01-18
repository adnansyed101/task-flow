import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { motion } from 'motion/react'
import { ArrowRight, Coins, Users, Zap } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    id: 1,
    title: 'Earn Money Completing',
    highlight: 'Micro Tasks',
    description:
      'Join thousands of workers earning daily by completing simple online tasks. No experience needed.',
    icon: Coins,
    cta: 'Start Earning',
    ctaLink: '/register',
  },

  {
    id: 2,
    title: 'Scale Your Business with',
    highlight: 'Global Workers',
    description:
      'Access a worldwide network of skilled workers ready to complete your tasks quickly and affordably.',
    icon: Users,
    cta: 'Post Your First Task',
    ctaLink: '/register',
  },
  {
    id: 3,
    title: 'Fast, Secure &',
    highlight: 'Reliable Payments',
    description:
      'Get paid instantly for completed work. Multiple withdrawal options with industry-leading security.',
    icon: Zap,
    cta: 'Learn More',
    ctaLink: '/how-it-works',
  },
]

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 right-0 w-150 h-150 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-accent/10 rounded-full blur-3xl" />

      {/* Floating Coins Animation */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-[10%] w-16 h-16 rounded-2xl bg-linear-to-br from-coin to-coin-glow shadow-coin flex items-center justify-center"
      >
        <span className="text-2xl font-bold text-coin-foreground">$</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-48 right-[15%] w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/80 shadow-glow flex items-center justify-center"
      >
        <Coins className="w-6 h-6 text-primary-foreground" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-32 right-[25%] w-10 h-10 rounded-lg bg-linear-to-br from-coin to-coin-glow shadow-coin flex items-center justify-center"
      >
        <span className="text-lg font-bold text-coin-foreground">¢</span>
      </motion.div>

      <div className="container-custom relative z-10">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-12">
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                  >
                    <slide.icon className="w-4 h-4" />
                    <span>Trusted by 50,000+ users worldwide</span>
                  </motion.div>

                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                    {slide.title}{' '}
                    <span className="gradient-text-gold">
                      {slide.highlight}
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to={slide.ctaLink}>
                      <Button
                        size="lg"
                        className="btn-primary-gradient text-lg px-8 py-6"
                      >
                        {slide.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/how-it-works">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-6"
                      >
                        How It Works
                      </Button>
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                    {[
                      { value: '50K+', label: 'Active Users' },
                      { value: '$2M+', label: 'Paid Out' },
                      { value: '100K+', label: 'Tasks Done' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="text-center lg:text-left"
                      >
                        <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hero Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative hidden lg:block"
                >
                  <div className="relative w-full aspect-square max-w-lg mx-auto">
                    {/* Main Card */}
                    <div className="absolute inset-0 rounded-3xl bg-card shadow-2xl border border-border/50 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center">
                            <Coins className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              Task Completed!
                            </p>
                            <p className="text-sm text-muted-foreground">
                              YouTube Video View
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-secondary" />
                              <div className="flex-1 h-3 rounded-full bg-secondary" />
                              <div className="coin-badge text-xs">
                                <Coins className="w-3 h-3" />
                                +10
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        <span className="text-muted-foreground">
                          Your Balance
                        </span>
                        <div className="coin-badge text-lg">
                          <Coins className="w-5 h-5" />
                          250
                        </div>
                      </div>
                    </div>

                    {/* Floating notification */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                          <span className="text-success-foreground text-sm">
                            ✓
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Payment Sent!
                          </p>
                          <p className="text-xs text-muted-foreground">
                            +$25.00
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default HeroSection
