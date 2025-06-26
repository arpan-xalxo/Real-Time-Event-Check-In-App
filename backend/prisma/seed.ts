import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create test users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      id: 'user1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      id: 'user2',
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
  });

  // Create test events
  const event1 = await prisma.event.upsert({
    where: { id: 'event1' },
    update: {},
    create: {
      id: 'event1',
      name: 'Tech Meetup 2024',
      location: 'San Francisco, CA',
      startTime: new Date('2024-07-15T18:00:00Z'),
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: 'event2' },
    update: {},
    create: {
      id: 'event2',
      name: 'Open Mic Night',
      location: 'Downtown Coffee Shop',
      startTime: new Date('2024-07-20T19:00:00Z'),
    },
  });

  const event3 = await prisma.event.upsert({
    where: { id: 'event3' },
    update: {},
    create: {
      id: 'event3',
      name: 'College Fest',
      location: 'University Campus',
      startTime: new Date('2024-07-25T16:00:00Z'),
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Users created:', { user1, user2 });
  console.log('Events created:', { event1, event2, event3 });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 