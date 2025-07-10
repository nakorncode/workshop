export default async function NoStore() {
  const url = new URL('/api/leaderboard', process.env.NEXT_PUBLIC_BASE_URL)
  const user = await fetch(url, { cache: 'no-store' })
    .then((res) => res.json())
    .then((data) => data.user)
  return (
    <div>
      <p>Current leaderboard (no-store): {user}</p>
    </div>
  )
}
