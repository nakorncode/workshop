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
  // หากมีการกำหนด cache: 'no-store' จะไม่มีการ cache ข้อมูล
  // ทำให้ Next.js จะมองว่าเพจนี้เป็น Dynamic ในขั้นตอน Build
  // แต่บน Dev Tools อาจจะยังมองว่าเป็น Static
  const author = await fetch('https://randomuser.me/api/', { cache: 'no-store' })
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
