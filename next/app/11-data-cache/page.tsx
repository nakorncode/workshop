interface Props {
  label: string
  user: {
    name: {
      first: string
      last: string
    }
  }
}

function CurrentLeaderboard(props: Props) {
  return (
    <div className="max-w-md">
      <h1 className="font-bold">Current Leaderboard ({props.label})</h1>
      <p>User: {props.user.name.first} {props.user.name.last}</p>
    </div>
  )
}

export default async function Page() {
  const defaultData = await fetch("https://randomuser.me/api?nat=us")
    .then(res => res.json() as Promise<{ results: { name: { first: string, last: string } }[] }>)

  const noStoreData = await fetch("https://randomuser.me/api?nat=us", { cache: "no-store" })
    .then(res => res.json() as Promise<{ results: { name: { first: string, last: string } }[] }>)

  const forceCacheData = await fetch("https://randomuser.me/api?nat=us", { cache: "force-cache" })
    .then(res => res.json() as Promise<{ results: { name: { first: string, last: string } }[] }>)

  const revalidateData = await fetch("https://randomuser.me/api?nat=us", { next: { revalidate: 5 } })
    .then(res => res.json() as Promise<{ results: { name: { first: string, last: string } }[] }>)

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Caching (Data Cache)</h1>
      <div className="space-y-8">
        <CurrentLeaderboard label="Default" user={defaultData.results[0]} />
        <CurrentLeaderboard label="No Store" user={noStoreData.results[0]} />
        <CurrentLeaderboard label="Force Cache" user={forceCacheData.results[0]} />
        <CurrentLeaderboard label="Revalidate" user={revalidateData.results[0]} />
      </div>
    </div>
  )
}
