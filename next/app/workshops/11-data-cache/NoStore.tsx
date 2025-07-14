export default async function NoStore() {
  const user = await fetch('https://randomuser.me/api?nat=us', { cache: 'no-store' })
    .then((res) => res.json())
    .then((data) => `${data.results[0].name.first} ${data.results[0].name.last}`)
  return (
    <div>
      <p>Current leaderboard (no-store): {user}</p>
    </div>
  )
}
