import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const productsTable = sqliteTable('products', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: int('price').notNull(),
})
