// ส่วนการทำงานของ Backend

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  console.log('params:', params.entries())
  return new Response('Hello from backend (GET)')
}

export async function POST(request: Request) {
  const body = await request.json()
  console.log('body:', body)
  return new Response('Hello from backend (POST)')
}
