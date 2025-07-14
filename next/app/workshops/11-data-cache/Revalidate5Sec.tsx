export default async function Revalidate5Sec() {
  const user = await fetch('https://randomuser.me/api?nat=us', { next: { revalidate: 5 } })
    .then((res) => res.json())
    .then((data) => `${data.results[0].name.first} ${data.results[0].name.last}`)
  return (
    <div>
      <p>Current leaderboard (revalidate 5 sec): {user}</p>
    </div>
  )
}
