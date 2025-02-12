import { createAuthClient } from 'better-auth/vue'

const runtimeConfig = useRuntimeConfig()
const auth = createAuthClient({
  baseURL: runtimeConfig.public.apiUrl
})

export const useAuth = () => auth
