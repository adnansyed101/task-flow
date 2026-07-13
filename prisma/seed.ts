import { prisma } from '#/db'
import { Role, TaskStatus } from '@/generated/prisma/client.js'
import { auth } from '#/lib/auth'

async function main() {
  console.log('⏳ Starting database seeding...')

  // 1. Clean existing data to avoid unique constraint collisions
  // await prisma.notification.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.withdrawal.deleteMany()
  await prisma.submission.deleteMany()
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleaned existing database records.')

  // 2. Seed Users (Admin, Buyers, and Workers)
  // Reflecting required default coins from the prompt: Worker = 10, Buyer = 50

  await auth.api.signUpEmail({
    body: {
      email: 'admin@microtask.io',
      password: 'Admin@123',
      name: 'System Admin',
    },
  })

  const buyer1 = auth.api.signUpEmail({
    body: {
      name: 'John Buyer',
      email: 'buyer1@microtask.io',
      password: 'buyer1',
      role: Role.buyer,
      coin: 50.0, // Default coin allocation
    },
  })

  const buyer2 = auth.api.signUpEmail({
    body: {
      name: 'Jane Tech Corp',
      email: 'buyer2@microtask.io',
      password: 'buyer2',
      role: Role.buyer,
      coin: 500.0, // Represents a buyer who purchased extra coin
    },
  })

  const worker1 = auth.api.signUpEmail({
    body: {
      name: 'Alex Worker',
      email: 'worker1@microtask.io',
      password: 'worker1',
      role: Role.buyer,
      coin: 10.0, // Default coin allocation
    },
  })

  const worker2 = auth.api.signUpEmail({
    body: {
      name: 'Sam Microtasker',
      email: 'worker2@microtask.io',
      password: 'worker2',
      role: Role.worker,
      coin: 240.0, // Enough to test the 200-coin withdrawal limit
    },
  })

  console.log('👥 Users seeded successfully.')

  // 3. Seed Tasks (Created by Buyers)
  const task1 = await prisma.task.create({
    data: {
      taskTitle: 'Watch YouTube Video & Comment',
      taskDetail:
        'Watch the full 5-minute software engineering roadmap video and leave an insightful comment.',
      requiredWorkers: 10,
      payableAmount: 5.0,
      completionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      submissionInfo:
        'Submit a screenshot showing your comment alongside your channel name.',
      taskImageUrl:
        'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
      status: TaskStatus.approved,
      buyerId: (await buyer1).user.id,
    },
  })

  const task2 = await prisma.task.create({
    data: {
      taskTitle: 'Beta Test Mobile Application',
      taskDetail:
        'Download our staging app, sign up, and click through the onboarding workflow to log bugs.',
      requiredWorkers: 5,
      payableAmount: 25.0,
      completionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      submissionInfo:
        'Submit your signup email along with a bug description text.',
      taskImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      status: TaskStatus.approved,
      buyerId: (await buyer2).user.id,
    },
  })

  console.log('📝 Tasks seeded successfully.')

  // 4. Seed Submissions (Created by Workers on Tasks)
  await prisma.submission.create({
    data: {
      submissionDetails:
        'I watched the entire video. Channel name: CodingPro. Comment text: "Awesome roadmap layout!"',
      status: TaskStatus.pending,
      taskId: task1.id,
      workerId: (await worker1).user.id,
    },
  })

  await prisma.submission.create({
    data: {
      submissionDetails:
        'Registered using test_email@platform.com. Encountered an unhandled exception on the profile page step.',
      status: TaskStatus.approved, // Automatically adds flow variables if processing through service actions
      taskId: task2.id,
      workerId: (await worker2).user.id,
    },
  })

  console.log('📥 Submissions seeded successfully.')

  // 5. Seed Withdrawals (Worker payouts)
  // Business logic check: 20 coins = $1, min withdrawal = 200 coins ($10)
  await prisma.withdrawal.create({
    data: {
      withdrawalCoin: 200,
      withdrawalAmount: 10.0,
      paymentSystem: 'Bkash',
      accountNumber: '01712345678',
      status: TaskStatus.pending,
      workerId: (await worker2).user.id,
    },
  })

  console.log('🏦 Withdrawals seeded successfully.')

  // 6. Seed Payments (Stripe/Dummy top-ups by Buyers)
  await prisma.payment.create({
    data: {
      amount: 20.0, // Paid $20
      coinsBought: 500, // Enforces 500 coin exchange rule
      transactionId: 'ch_stripe_mock_123456789',
      buyerId: (await buyer2).user.id,
    },
  })

  console.log('💳 Payments seeded successfully.')

  // 7. Seed System Notifications
  // await prisma.notification.create({
  //   data: {
  //     userId: worker1.id,
  //     message:
  //       'Welcome to the platform! You received 10 complimentary starting coins.',
  //     actionRoute: '/dashboard/worker-home',
  //   },
  // })

  // console.log('🔔 Notifications seeded successfully.')
  console.log('🎉 Database seeding completed perfectly.')
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
