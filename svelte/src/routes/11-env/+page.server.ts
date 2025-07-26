import type { PageServerLoad } from "./$types"
import { PRIVATE_KEY } from "$env/static/private"
import { env } from "$env/dynamic/private"

export const load: PageServerLoad = () => {
  return {
    PRIVATE_KEY,
    DYNAMIC_PRIVATE_KEY: env.PRIVATE_KEY,
  }
}
