export default async function getRandomName() {
  const data = await fetch('https://randomuser.me/api/').then((res) => res.json()) as { results: { name: { first: string, last: string } }[] }
  const name = data.results[0].name.first + ' ' + data.results[0].name.last
  return name
}
