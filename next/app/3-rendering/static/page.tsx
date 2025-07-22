// เมื่อเราเข้าหน้าเว็บนี้ทุกครั้งตอน Development จะยังคงเห็นการเปลี่ยนแปลงของข้อมูลตลอดเวลา
// แต่เมื่อเรา Build Production แล้วจะไม่เห็นการเปลี่ยนแปลงของข้อมูลอีกต่อไป จนกว่าจะมีการ Revalidate หรือ Build ใหม่

export default async function Page() {
  const res = await fetch("https://randomuser.me/api?nat=us&results=20")
  const data = await res.json() as {
    results: {
      name: {
        first: string
        last: string
      }
      email: string
      picture: {
        large: string
      }
    }[]
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Static User Data</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {data.results.map((user, index) => (
          <div key={index} className="p-5 bg-white rounded-lg shadow flex flex-col items-center">
            <img className="rounded-full" src={user.picture.large} alt="User Picture" />
            <p className="mt-4 font-bold">{user.name.first} {user.name.last}</p>
            <p>({user.email})</p>
          </div>
        ))}
      </div>
    </div>
  )
}
