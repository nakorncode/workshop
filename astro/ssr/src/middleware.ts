import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname === '/api/products' && context.request.method === 'POST') {
    const token = context.request.headers.get('Authorization')
    if (token !== 'secret') {
      return new Response(null, { status: 401 })
    }
  }
  const response = await next()
  response.headers.set('X-Powered-By', 'Astro')
  return response
});
