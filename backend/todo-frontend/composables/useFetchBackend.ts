import { ofetch } from 'ofetch'

export const useFetchBackend = () => {
  const runtimeConfig = useRuntimeConfig()
  console.log(runtimeConfig.public.apiBase)
  return ofetch.create({ baseURL: runtimeConfig.public.apiUrl })
}
