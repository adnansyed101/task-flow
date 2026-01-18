import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: 'Maria Garcia',
    role: 'Worker',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    quote:
      'TaskFlow changed my life! I started earning from home during the pandemic and now I make $500+ monthly just completing simple tasks in my free time.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Buyer',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    quote:
      "As a digital marketer, I need quick turnaround on tasks. TaskFlow's worker network is incredible - my tasks get completed within hours, not days.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Aisha Patel',
    role: 'Worker',
    avatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face',
    quote:
      "The payment system is so reliable! I've never had an issue withdrawing my earnings. Best platform I've worked on in 5 years of freelancing.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Robert Chang',
    role: 'Buyer',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    quote:
      'Quality of work is outstanding. The verification system ensures I get real engagement for my social media campaigns. Worth every penny!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Worker',
    avatar:
      'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=150&h=150&fit=crop&crop=face',
    quote:
      "Started as a side hustle, now it's my main income source. The variety of tasks keeps it interesting and the coin system is so motivating!",
    rating: 5,
  },
]

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-linear-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            <span>Testimonials</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our community of workers and buyers who have transformed
            their work life
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="testimonials-swiper pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Card className="h-full card-hover">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Quote className="w-5 h-5 text-primary" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-accent fill-accent"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: hsl(var(--muted-foreground));
          opacity: 0.3;
          transition: all 0.3s;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: hsl(var(--primary));
          opacity: 1;
        }
      `}</style>
    </section>
  )
}

export default TestimonialsSection
