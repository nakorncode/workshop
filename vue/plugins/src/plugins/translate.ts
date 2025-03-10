import { type App, ref } from 'vue'

interface TranslateOptions {
  defaultLanguage: string
  languages: {
    [lang: string]: Record<string, string>
  }
}

export const currentLanguage = ref('')

export default {
  install(app: App, options: TranslateOptions) {
    currentLanguage.value = localStorage.getItem('language') || options.defaultLanguage

    app.provide('translate', (key: string) => {
      return ref(options.languages[currentLanguage.value][key])
    })

    app.provide('setLanguage', (language: string) => {
      localStorage.setItem('language', language)
      currentLanguage.value = language
    })

    app.provide('currentLanguage', currentLanguage)
  }
}
