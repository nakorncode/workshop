import { ClientEnv } from './ClientEnv'
import { ServerEnv } from './ServerEnv'

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Environment Variables</h1>
      <ClientEnv></ClientEnv>
      <hr className="my-4"/>
      <ServerEnv></ServerEnv>
    </>
  )
}
