import { products } from "@/db/schema"
import db from "@/lib/db"
import { eq } from "drizzle-orm"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await db.select().from(products).where(eq(products.id, Number(id))).get()
  if (!product) {
    return new Response("Product not found", { status: 404 })
  }
  return new Response(JSON.stringify(product), { status: 200 })
}
