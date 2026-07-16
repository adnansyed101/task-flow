import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Coins,
  Users,
  ShieldCheck,
  Sparkles,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { SiteHeader, SiteFooter } from '@/components/site-chrome'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Micron — Micro-tasks that pay, fast.' },
      {
        name: 'description',
        content:
          'Post small tasks or complete them to earn coins. A minimal, honest micro-task marketplace.',
      },
    ],
  }),
  component: Home,
})

const slides = [
  {
    kicker: 'Earn on your own time',
    heading: 'Small tasks. Real payouts.',
    body: 'Turn spare minutes into coins. Complete simple tasks from verified buyers and cash out from 200 coins.',
    cta: 'Start earning',
    to: '/auth/register' as const,
  },
  {
    kicker: 'For buyers',
    heading: 'Get real work done, fast.',
    body: 'Reach thousands of ready workers. Post a task in under a minute — pay only for approved submissions.',
    cta: 'Post a task',
    to: '/auth/register' as const,
  },
  {
    kicker: 'Built for trust',
    heading: 'Transparent. Reviewed. Paid.',
    body: 'Every submission is reviewed. Every approved task is instantly paid in coins you can withdraw.',
    cta: 'See how it works',
    to: '/auth/register' as const,
  },
]

function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])
  const s = slides[i]
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-[0.4]" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div
              key={i + 'k'}
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground"
            >
              <Sparkles className="h-3 w-3 text-accent" />
              {s.kicker}
            </div>
            <h1
              key={i + 'h'}
              className="animate-fade-up mt-6 text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              {s.heading}
            </h1>
            <p
              key={i + 'p'}
              className="animate-fade-up mt-6 max-w-xl text-balance text-lg text-muted-foreground"
            >
              {s.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to={s.to}>
                  {s.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full"
              >
                <a href="#how">How it works</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? 'w-8 bg-primary' : 'w-3 bg-border'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <div className="ml-3 flex items-center gap-1">
                <button
                  onClick={() =>
                    setI((v) => (v - 1 + slides.length) % slides.length)
                  }
                  className="rounded-full border border-border p-1.5 hover:bg-muted"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setI((v) => (v + 1) % slides.length)}
                  className="rounded-full border border-border p-1.5 hover:bg-muted"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="animate-fade-up relative">
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Live task
                </div>
                <div className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs text-success-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Open
                </div>
              </div>
              <div className="mt-4 font-display text-2xl leading-tight">
                Write a 5-star Google review for Sunrise Cafe
              </div>
              <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-xl border border-border">
                <div className="p-3">
                  <div className="text-[10px] uppercase text-muted-foreground">
                    Reward
                  </div>
                  <div className="mt-1 flex items-center gap-1 font-medium">
                    <Coins className="h-3.5 w-3.5 text-accent" /> 10
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase text-muted-foreground">
                    Slots
                  </div>
                  <div className="mt-1 font-medium">15 left</div>
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase text-muted-foreground">
                    Due
                  </div>
                  <div className="mt-1 font-medium">7d</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=nadia"
                  className="h-8 w-8 rounded-full border border-border bg-muted"
                  alt=""
                />
                <div className="text-sm">
                  <div className="font-medium">Nadia R.</div>
                  <div className="text-xs text-muted-foreground">
                    Verified buyer · 24 tasks
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-card p-4 shadow-sm sm:block">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Coins className="h-3.5 w-3.5 text-accent" /> Approved
              </div>
              <div className="mt-1 font-display text-2xl">+10 coins</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { k: '128k+', v: 'Tasks completed' },
    { k: '$42k', v: 'Paid to workers' },
    { k: '9,200', v: 'Active workers' },
    { k: '1.6k', v: 'Trusted buyers' },
  ]
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-4 sm:grid-cols-4 sm:px-6">
        {stats.map((s) => (
          <div key={s.v} className="py-6 text-center">
            <div className="font-display text-3xl">{s.k}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      icon: Users,
      t: 'Create an account',
      b: 'Sign up as a worker or buyer. Workers start with 10 coins, buyers with 50.',
    },
    {
      icon: Zap,
      t: 'Post or pick a task',
      b: 'Buyers post small, well-scoped tasks. Workers browse and submit proof.',
    },
    {
      icon: ShieldCheck,
      t: 'Get paid on approval',
      b: 'Buyer approves the submission — coins are instantly credited to the worker.',
    },
  ]
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Workflow
          </div>
          <h2 className="mt-2 text-balance font-display text-4xl sm:text-5xl">
            Three steps. That's it.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
          We stripped the platform to the essentials — post, complete, pay.
          Nothing in the way of getting work done.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.t}
            className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="font-display text-4xl text-muted-foreground/40">
                0{i + 1}
              </div>
            </div>
            <div className="mt-6 text-lg font-medium">{s.t}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.b}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function BestWorkers() {
  const users = [
    {
      id: 'admin-1',
      name: 'Platform Admin',
      email: 'admin@microtask.io',
      password: 'Admin@123',
      photoURL: 'https://api.dicebear.com/7.x/notionists/svg?seed=admin',
      role: 'admin',
      coins: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'buyer-1',
      name: 'Nadia Rahman',
      email: 'buyer@microtask.io',
      password: 'Buyer@123',
      photoURL: 'https://api.dicebear.com/7.x/notionists/svg?seed=nadia',
      role: 'buyer',
      coins: 320,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'worker-1',
      name: 'Arif Hasan',
      email: 'worker@microtask.io',
      password: 'Worker@123',
      photoURL: 'https://api.dicebear.com/7.x/notionists/svg?seed=arif',
      role: 'worker',
      coins: 420,
      createdAt: new Date().toISOString(),
    },
    ...['Sara', 'Kenji', 'Priya', 'Diego', 'Emma', 'Liam'].map((n, i) => ({
      id: `worker-${i + 2}`,
      name: n + ' ' + ['Chen', 'Ito', 'Sharma', 'Rossi', 'Novak', 'Walker'][i],
      email: `${n.toLowerCase()}@microtask.io`,
      password: 'Worker@123',
      photoURL: `https://api.dicebear.com/7.x/notionists/svg?seed=${n}`,
      role: 'worker',
      coins: 380 - i * 40,
      createdAt: new Date().toISOString(),
    })),
  ]

  const workers = users
    .filter((u) => u.role === 'worker')
    .sort((a, b) => b.coins - a.coins)
    .slice(0, 6)

  return (
    <section id="workers" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Top of the leaderboard
          </div>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">
            Best workers this month
          </h2>
        </div>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workers.map((w, i) => (
          <div
            key={w.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <div className="relative">
              <img
                src={w.photoURL}
                alt={w.name}
                className="h-14 w-14 rounded-full bg-muted ring-2 ring-border"
              />
              <div className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                #{i + 1}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{w.name}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Coins className="h-3 w-3 text-accent" />
                <span className="tabular-nums">{w.coins} coins</span>
              </div>
            </div>
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
          </div>
        ))}
      </div>
    </section>
  )
}

const TESTIMONIALS = [
  {
    q: 'I made my first $20 in three evenings. The interface is refreshingly simple.',
    n: 'Aisha B.',
    r: 'Worker',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=aisha',
  },
  {
    q: 'We got 200 real reviews in a week without touching customer support once.',
    n: 'Tomás Ruiz',
    r: 'Buyer',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=tomas',
  },
  {
    q: 'No spam, no fake tasks. Payouts hit exactly when they say they will.',
    n: 'Marta K.',
    r: 'Worker',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=marta',
  },
  {
    q: 'The moderation is real. Bad submissions get rejected and my coins refund.',
    n: 'Rahim I.',
    r: 'Buyer',
    img: 'https://api.dicebear.com/7.x/notionists/svg?seed=rahim',
  },
]

function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setI((v) => (v + 1) % TESTIMONIALS.length),
      5000,
    )
    return () => clearInterval(t)
  }, [])
  const t = TESTIMONIALS[i]
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          What people say
        </div>
        <blockquote
          key={i}
          className="animate-fade-up mt-6 text-balance font-display text-3xl leading-tight sm:text-4xl"
        >
          "{t.q}"
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <img src={t.img} className="h-10 w-10 rounded-full bg-muted" alt="" />
          <div className="text-left">
            <div className="text-sm font-medium">{t.n}</div>
            <div className="text-xs text-muted-foreground">{t.r}</div>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-1.5">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? 'w-6 bg-primary' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TaskCategories() {
  const cats = [
    { t: 'Social engagement', c: 'Likes, follows, comments' },
    { t: 'Content review', c: 'Ratings and reviews' },
    { t: 'Data tasks', c: 'Tagging & short surveys' },
    { t: 'Testing', c: 'Try apps and report bugs' },
    { t: 'Translation', c: 'Short-form language work' },
    { t: 'Research', c: 'Simple fact-finding' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Categories
      </div>
      <h2 className="mt-2 max-w-2xl font-display text-4xl sm:text-5xl">
        Bite-sized work across every corner of the web.
      </h2>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <div
            key={c.t}
            className="group flex items-center justify-between bg-card p-6 transition-colors hover:bg-muted"
          >
            <div>
              <div className="font-medium">{c.t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.c}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        ))}
      </div>
    </section>
  )
}

function CTABand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground sm:p-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              Start earning, or start hiring — in under a minute.
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/70">
              No fees to sign up. No credit card. Just clean, straightforward
              work.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full"
            >
              <Link to="/auth/register">Create account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/auth/login">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <BestWorkers />
      <Testimonials />
      <TaskCategories />
      <CTABand />
      <SiteFooter />
    </div>
  )
}
