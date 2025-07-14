export default async function ForceCache() {
  const user = await fetch('https://randomuser.me/api?nat=us', { cache: 'force-cache' })
    .then((res) => res.json())
    .then((data) => `${data.results[0].name.first} ${data.results[0].name.last}`)
  return (
    <>
      <p>Current leaderboard (force-cache): {user}</p>
    </>
  )
}
