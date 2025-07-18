import { cookies, headers } from "next/headers"
import stringify from "json-stringify-pretty-compact"
import Code from "@/components/Code"
import Pre from "@/components/Pre"
import { redirect } from "next/navigation"
import Button from "@/components/Button"

// เนื่องจาก Set Cookies จะสามารถใช้ได้เฉพาะ Server Action, Route Handler เท่านั้น
// ส่วนของการใช้งาน Server Action จะได้เรียนรู้ในภายหลัง
// อ่านเพิ่มเติม: https://nextjs.org/docs/app/api-reference/functions/cookies#good-to-know
export async function setCookieRedirectAction() {
  "use server"
  const cookiesList = await cookies()
  cookiesList.set("redirected", "yes, and it will expire in 5 seconds", { maxAge: 5 })
  return redirect("/4-functions/server")
}

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
          <Code>cookies().get("redirected")</Code>
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
