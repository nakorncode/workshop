import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const products = sqliteTable("products", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  price: int().notNull(),
})
