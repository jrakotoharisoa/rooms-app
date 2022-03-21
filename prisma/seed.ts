import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // cleanup the existing database
  await prisma.room.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });

  const room101 = await prisma.room.create({
    data: {
      slug: "101",
      name: "1.01",
      configuration: "U",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room101.id,
    },
  });

  const room102 = await prisma.room.create({
    data: {
      slug: "102",
      name: "1.02",
      configuration: "BOARD",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room102.id,
    },
  });
  const room103 = await prisma.room.create({
    data: {
      slug: "103",
      name: "1.03",
      configuration: "CASUAL",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room103.id,
    },
  });
  const room104 = await prisma.room.create({
    data: {
      slug: "104",
      name: "1.04",
      configuration: "THEATER",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room104.id,
    },
  });
  const room201 = await prisma.room.create({
    data: {
      slug: "201",
      name: "2.01",
      configuration: "U",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room201.id,
    },
  });

  const room202 = await prisma.room.create({
    data: {
      slug: "202",
      name: "2.02",
      configuration: "BOARD",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room202.id,
    },
  });
  const room203 = await prisma.room.create({
    data: {
      slug: "203",
      name: "2.03",
      configuration: "CASUAL",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room203.id,
    },
  });
  const room204 = await prisma.room.create({
    data: {
      slug: "204",
      name: "2.04",
      configuration: "THEATER",
    },
  });
  await prisma.equipment.create({
    data: {
      tv: true,
      videoprojector: false,
      visio: true,
      paperboard: true,
      roomId: room204.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
