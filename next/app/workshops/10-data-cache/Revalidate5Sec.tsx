export default async function Revalidate5Sec() {
  const url = new URL('/api/leaderboard', process.env.NEXT_PUBLIC_BASE_URL)
  const user = await fetch(url, { next: { revalidate: 5 } })
    .then((res) => res.json())
    .then((data) => data.user)
  return (
    <div>
      <p>Current leaderboard (revalidate 5 sec): {user}</p>
    </div>
  )
}
