// Backend = H3 (Nitro)
export default defineEventHandler((event) => {
  deleteCookie(event, 'token')
  sendRedirect(event, '/')
})