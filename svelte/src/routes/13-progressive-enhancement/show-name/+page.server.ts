import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = ({ cookies }) => {
  const name = cookies.get('name')
  if (!name) {
    return error(404, "Name not found in cookies")
  }
  return { name }
}
