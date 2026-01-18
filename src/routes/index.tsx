import BestWorkersSection from '@/components/home/best-workers-section'
import CTASection from '@/components/home/cta-section'
import FeaturesSection from '@/components/home/features-section'
import HeroSection from '@/components/home/hero-section'
import HowItWorksSection from '@/components/home/how-it-works-section'
import TaskCategoriesSection from '@/components/home/task-categories-section'
import TestimonialsSection from '@/components/home/testimonials-section'
import Navbar from '@/components/layout/navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BestWorkersSection />
        <HowItWorksSection />
        <TaskCategoriesSection />
        <TestimonialsSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  )
}
