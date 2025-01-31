import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories: Prisma.CategoryCreateInput[] = [
  { name: 'Programming' },
  { name: 'Databases' },
  { name: 'DevOps' },
  { name: 'Frontend' },
  { name: 'Backend' },
]

async function seed() {
  for (const category of categories) {
    await prisma.category.create({ data: category })
  }
}

seed()
