export default async function ForceCache() {
  const url = new URL('/api/leaderboard', process.env.NEXT_PUBLIC_BASE_URL)
  const user = await fetch(url, { cache: 'force-cache' })
    .then((res) => res.json())
    .then((data) => data.user)
  return (
    <>
      <p>Current leaderboard (force-cache): {user}</p>
    </>
  )
}
