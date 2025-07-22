import BadClientComponent from "./BadClientComponent"
import GoodClientComponent from "./GoodClientComponent"

export default function Page() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION
  const secretToken = process.env.SECRET_TOKEN
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Server component</h2>
      <ul className="list-disc pl-5">
        <li>App Version: {version}</li>
        <li>Secret Token: {secretToken}</li>
      </ul>

      <hr className="my-4" />

      <BadClientComponent />

      <hr className="my-4" />

      <GoodClientComponent />
    </div>
  )
}
