import { cookies, headers } from "next/headers"
import stringify from "json-stringify-pretty-compact"
import Code from "@/components/Code"
import Pre from "@/components/Pre"
import Button from "@/components/Button"
import { setCookieRedirectAction } from "./actions"

export default async function Page() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Server Functions</h2>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          <Code>headers()</Code>
          <Pre>{stringify(await headers())}</Pre>
        </li>
        <li>
          <Code>cookies()</Code>
          <Pre>{stringify(await cookies())}</Pre>
        </li>
        <li>
          <Code>cookies().get(&quot;redirected&quot;)</Code>
          <Pre>{stringify((await cookies()).get("redirected"))}</Pre>
        </li>
        <li>
          <form action={setCookieRedirectAction}>
            <Button type="submit" className="text-blue-600 underline cursor-pointer">Set Cookie and Redirect</Button>
          </form>
        </li>
        <li>
          <a href="/4-functions/server/show-not-found-page" className="text-blue-600 underline">Not Found</a>
        </li>
      </ul>
    </div>
  )
}
