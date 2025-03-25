export default defineEventHandler((event) => {
  deleteCookie(event, 'token')
  return { data: {} }
})