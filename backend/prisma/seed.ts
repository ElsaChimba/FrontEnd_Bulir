import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.tableType.createMany({
    data: [
      { name: 'Mesa para 2', capacity: 2, price: 5000 },
      { name: 'Mesa para 4', capacity: 4, price: 8000 },
      { name: 'Mesa para 7', capacity: 7, price: 12000 },
      { name: 'Mesa para 12', capacity: 12, price: 18000 },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
