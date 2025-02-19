import { PrismaClient } from '@prisma/client'
import { sample } from 'lodash-es'
import { faker } from '@faker-js/faker'

const TOTAL_PRODUCT = 1000
const prisma = new PrismaClient()

console.log('Seeding...')

// ลบทั้งหมดก่อน
await prisma.product.deleteMany()
await prisma.category.deleteMany()

await prisma.category.createMany({
  data: [
    { name: 'Food' },
    { name: 'Drinks' },
    { name: 'Electronics' },
    { name: 'Home' },
    { name: 'Beauty' },
    { name: 'Clothing' },
  ]
})

const categories = await prisma.category.findMany()

for (let i = 0; i < TOTAL_PRODUCT; i++) {
  const category = sample(categories)
  if (!category) {
    continue
  }
  await prisma.product.create({
    data: {
      title: faker.commerce.productName(),
      price: faker.number.float({ min: 5, max: 500, multipleOf: 0.25 }),
      quantity: faker.number.int({ min: 1, max: 100 }),
      categoryId: category.id
    }
  })
}

console.log('Done!')
