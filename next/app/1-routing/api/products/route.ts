import { getProducts } from "../../lib/products"

export async function GET() {
  const products = await getProducts()
  return Response.json({ data: products })
  // หรืออาจจะใช้ new Response() แบบด้านล่าง ส่งพร้อม Headers แต่ Next.js สามารถ Handle Content-Type ได้เอง
  // 👇
  // return new Response(
  //   JSON.stringify(products),
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
}

// ส่วนนี้แนะนำให้ทดสอบด้วย Postman หรือ curl
export async function POST(request: Request) {
  try {
    const product = await request.json()
    // สร้างข้อมูลใหม่...
    return Response.json({ message: "Product created", data: product })
  } catch (error) {
    console.error("Error creating product:", error)
    return Response.json({ message: "Failed to create product", error: (error as Error).message })
  }
}
