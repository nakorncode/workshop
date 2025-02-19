import { ofetch } from 'ofetch'

export const useFetchBackend = () => {
  const runtimeConfig = useRuntimeConfig()
  return ofetch.create({
    baseURL: runtimeConfig.public.apiUrl,
    credentials: 'include'
  })
}
