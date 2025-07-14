// จากตัวอย่าง 6, 7 จะแนะนำให้ใช้ npm run build เพื่อดูผลลัพธ์

interface Author {
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    medium: string
  }
}

export default async function Page() {
  // เนื่องจากการใช้ fetch() ตามปกติบน Next.js จะมีการ Cache ให้ทันที จึงเป็น Static
  // จึงเป็นเรื่องนึงที่จะไม่แนะนำให้ใช้ Axios หรือ HTTP Client อื่นๆแทน
  // เพราะจะขาดคุณสมบัติการตรวจสอบ Static, Dynamic Page โดยอัตโนมัติ
  const author = await fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => data.results[0] as Author)
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Static Page</h1>
      <img src={author.picture.medium} alt={author.name.first} className="rounded-full mb-2" />
      <p>Name: {author.name.title} {author.name.first} {author.name.last}</p>
      <p>Email: {author.email}</p>
    </>
  )
}
