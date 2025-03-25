// https://nuxt.com/docs/api/configuration/nuxt-c onfig
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    // UPPER_SNAKE_CASE
    // camelCase
    apiToken: '',
    jwtSecret: '',
    public: {
      webTitle: '',
      webDescription: '',
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
