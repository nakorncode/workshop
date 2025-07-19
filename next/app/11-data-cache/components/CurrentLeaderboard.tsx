interface Props {
  label: string
  user: {
    name: {
      first: string
      last: string
    }
  }
}

export default function CurrentLeaderboard(props: Props) {
  return (
    <div className="max-w-md">
      <h1 className="font-bold">Current Leaderboard ({props.label})</h1>
      <p>User: {props.user.name.first} {props.user.name.last}</p>
    </div>
  )
}
