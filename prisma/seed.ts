import { prisma } from '#/db'
import { Role, TaskStatus } from '@/generated/prisma/client.js'
import { auth } from '#/lib/auth'

async function main() {
  console.log('⏳ Starting database seeding...')

  // 1. Clean existing data
  await prisma.payment.deleteMany()
  await prisma.withdrawal.deleteMany()
  await prisma.submission.deleteMany()
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleaned existing database records.')

  // 2. Seed Users
  await auth.api.signUpEmail({
    body: {
      email: 'admin@microtask.io',
      password: 'Admin@123',
      name: 'Admin System',
      role: Role.admin,
    },
  })

  await auth.api.signUpEmail({
    body: {
      email: 'buyer@microtask.io',
      password: 'Buyer@123',
      name: 'Buyer System',
      role: Role.buyer,
    },
  })

  await auth.api.signUpEmail({
    body: {
      email: 'worker@microtask.io',
      password: 'Worker@123',
      name: 'Worker System',
      role: Role.worker,
    },
  })

  const buyer = await prisma.user.findUniqueOrThrow({
    where: { email: 'buyer@microtask.io' },
  })

  const worker = await prisma.user.findUniqueOrThrow({
    where: { email: 'worker@microtask.io' },
  })

  console.log('👥 Users seeded successfully.')

  // 3. Seed Tasks (Created by Buyer)
  const task1 = await prisma.task.create({
    data: {
      taskTitle: 'Watch YouTube Video & Comment',
      taskDetail:
        'Watch the full 5-minute software engineering roadmap video and leave an insightful comment.',
      requiredWorkers: 10,
      payableAmount: 5.0,
      completionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      submissionInfo:
        'Submit a screenshot showing your comment alongside your channel name.',
      taskImageUrl:
        'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
      status: TaskStatus.approved,
      buyerId: buyer.id,
    },
  })

  const task2 = await prisma.task.create({
    data: {
      taskTitle: 'Beta Test Mobile Application',
      taskDetail:
        'Download our staging app, sign up, and click through the onboarding workflow to log bugs.',
      requiredWorkers: 5,
      payableAmount: 25.0,
      completionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      submissionInfo:
        'Submit your signup email along with a bug description text.',
      taskImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      status: TaskStatus.approved,
      buyerId: buyer.id,
    },
  })

  const task3 = await prisma.task.create({
    data: {
      taskTitle: 'Write Product Review',
      taskDetail:
        'Purchase our supplement sample and write an honest review on Amazon.',
      requiredWorkers: 3,
      payableAmount: 15.0,
      completionDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      submissionInfo: 'Submit the Amazon review link and a photo of the product.',
      taskImageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
      status: TaskStatus.pending,
      buyerId: buyer.id,
    },
  })

  const task4 = await prisma.task.create({
    data: {
      taskTitle: 'Social Media Share Campaign',
      taskDetail:
        'Share our launch post on Twitter/X and tag 3 friends in the replies.',
      requiredWorkers: 20,
      payableAmount: 2.0,
      completionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      submissionInfo: 'Submit the tweet URL and a screenshot of the tags.',
      taskImageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
      status: TaskStatus.approved,
      buyerId: buyer.id,
    },
  })

  const task5 = await prisma.task.create({
    data: {
      taskTitle: 'Download & Rate Our App',
      taskDetail:
        'Download our new fitness app, complete one workout session, and rate it 5 stars.',
      requiredWorkers: 8,
      payableAmount: 10.0,
      completionDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      submissionInfo:
        'Submit a screenshot of your app store rating and workout summary.',
      taskImageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8',
      status: TaskStatus.rejected,
      buyerId: buyer.id,
    },
  })

  console.log('📝 Tasks seeded successfully.')

  // 4. Seed Submissions (Worker submits to Buyer's tasks)
  await prisma.submission.create({
    data: {
      submissionDetails:
        'I watched the entire video. Channel name: CodingPro. Comment text: "Awesome roadmap layout!"',
      status: TaskStatus.pending,
      taskId: task1.id,
      workerId: worker.id,
    },
  })

  await prisma.submission.create({
    data: {
      submissionDetails:
        'Watched video on DevChannel. Comment: "Great content, very helpful for beginners!"',
      status: TaskStatus.approved,
      taskId: task1.id,
      workerId: worker.id,
    },
  })

  await prisma.submission.create({
    data: {
      submissionDetails:
        'Registered using test_email@platform.com. Encountered an unhandled exception on the profile page step.',
      status: TaskStatus.approved,
      taskId: task2.id,
      workerId: worker.id,
    },
  })

  await prisma.submission.create({
    data: {
      submissionDetails:
        'Beta tested on Android 14. Found 2 critical bugs in payment flow and 1 UI glitch.',
      status: TaskStatus.rejected,
      taskId: task2.id,
      workerId: worker.id,
    },
  })

  await prisma.submission.create({
    data: {
      submissionDetails:
        'Shared the launch post on Twitter. Tweet URL: https://x.com/worker/status/12345. Tagged @friend1, @friend2, @friend3.',
      status: TaskStatus.pending,
      taskId: task4.id,
      workerId: worker.id,
    },
  })

  await prisma.submission.create({
    data: {
      submissionDetails:
        'Shared on Facebook and Twitter. Links: fb.com/post/111, x.com/status/222.',
      status: TaskStatus.approved,
      taskId: task4.id,
      workerId: worker.id,
    },
  })

  await prisma.submission.create({
    data: {
      submissionDetails:
        'Downloaded app, completed 20-min HIIT session. Rated 5 stars on Play Store.',
      status: TaskStatus.rejected,
      taskId: task5.id,
      workerId: worker.id,
    },
  })

  console.log('📥 Submissions seeded successfully.')

  // 5. Seed Withdrawals (Worker payouts)
  await prisma.withdrawal.create({
    data: {
      withdrawalCoin: 200,
      withdrawalAmount: 10.0,
      paymentSystem: 'Bkash',
      accountNumber: '01712345678',
      status: TaskStatus.pending,
      workerId: worker.id,
    },
  })

  await prisma.withdrawal.create({
    data: {
      withdrawalCoin: 250,
      withdrawalAmount: 12.5,
      paymentSystem: 'Rocket',
      accountNumber: '01812345678',
      status: TaskStatus.approved,
      workerId: worker.id,
    },
  })

  await prisma.withdrawal.create({
    data: {
      withdrawalCoin: 300,
      withdrawalAmount: 15.0,
      paymentSystem: 'Nagad',
      accountNumber: '01912345678',
      status: TaskStatus.rejected,
      workerId: worker.id,
    },
  })

  console.log('🏦 Withdrawals seeded successfully.')

  // 6. Seed Payments (Buyer top-ups)
  await prisma.payment.create({
    data: {
      amount: 20.0,
      coinsBought: 500,
      transactionId: 'ch_stripe_mock_123456789',
      buyerId: buyer.id,
    },
  })

  await prisma.payment.create({
    data: {
      amount: 10.0,
      coinsBought: 250,
      transactionId: 'ch_stripe_mock_987654321',
      buyerId: buyer.id,
    },
  })

  await prisma.payment.create({
    data: {
      amount: 40.0,
      coinsBought: 1000,
      transactionId: 'ch_stripe_mock_555666777',
      buyerId: buyer.id,
    },
  })

  console.log('💳 Payments seeded successfully.')

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
