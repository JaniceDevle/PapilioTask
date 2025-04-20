import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 清空已有数据
  await prisma.notification.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.event.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // 创建用户
  const users = await prisma.user.createMany({
    data: [
      { username: 'alice', email: 'alice@example.com', passwordHash: 'hashed123' },
      { username: 'bob', email: 'bob@example.com', passwordHash: 'hashed123' },
      { username: 'charlie', email: 'charlie@example.com', passwordHash: 'hashed123' },
    ],
  });

  const allUsers = await prisma.user.findMany();

  // 创建任务
  await prisma.task.createMany({
    data: [
      {
        title: 'Design landing page',
        description: 'Create wireframe and mockup',
        status: 'Ongoing',
        priority: 'High',
        assigneeId: allUsers[0].id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Set up database schema',
        priority: 'Medium',
        assigneeId: allUsers[1].id,
      },
      {
        title: 'Prepare presentation',
        priority: 'Low',
        assigneeId: allUsers[2].id,
      },
    ],
  });

  // 创建事件
  await prisma.event.createMany({
    data: [
      {
        eventNumber: 'EVT-1000',
        name: 'Product Launch Planning',
        startDate: new Date(),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        labels: 'Meeting',
        status: 'Pending',
        assigneeId: allUsers[0].id,
      },
      {
        eventNumber: 'EVT-1001',
        name: 'Marketing Review',
        startDate: new Date(),
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        labels: 'Discussion',
        status: 'Ongoing',
        assigneeId: allUsers[1].id,
      },
    ],
  });

  // 创建里程碑
  await prisma.milestone.createMany({
    data: [
      {
        title: 'v1.0 Launch',
        description: 'Milestone for initial launch',
        completionPercent: 45,
        lastUpdatedById: allUsers[0].id,
      },
      {
        title: 'v1.1 Planning',
        completionPercent: 10,
        lastUpdatedById: allUsers[1].id,
      },
    ],
  });

  // 创建通知
  await prisma.notification.createMany({
    data: [
      {
        userId: allUsers[0].id,
        message: 'Task "Design landing page" is nearing deadline.',
      },
      {
        userId: allUsers[1].id,
        message: 'New task "Set up database schema" assigned.',
      },
    ],
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
