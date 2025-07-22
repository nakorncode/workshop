// เนื่องจาก Set Cookies จะสามารถใช้ได้เฉพาะ Server Action, Route Handler เท่านั้น
// ส่วนของการใช้งาน Server Action จะได้เรียนรู้ในภายหลัง
// อ่านเพิ่มเติม: https://nextjs.org/docs/app/api-reference/functions/cookies#good-to-know

"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function setCookieRedirectAction() {
  const cookiesList = await cookies()
  cookiesList.set("redirected", "yes, and it will expire in 5 seconds", { maxAge: 5 })
  return redirect("/4-functions/server")
}
