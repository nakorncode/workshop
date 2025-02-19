import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },
  runtimeConfig: {
    public: {
      apiUrl: ''
    }
  },
  modules: [
    '@vee-validate/nuxt',
  ],
  vite: {
    plugins: [
      tailwindcss()
    ],
  }
})
