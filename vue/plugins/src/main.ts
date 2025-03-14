import { createApp } from 'vue'
import App from './App.vue'
import translate from './plugins/translate'
import tooltip from './plugins/tooltip'

const app = createApp(App)

app.use(translate, {
  defaultLanguage: 'en',
  languages: {
    en: {
      hello: 'Hello world'
    },
    th: {
      hello: 'สวัสดีชาวโลก'
    },
    jp: {
      hello: 'こんにちは世界'
    }
  }
})

app.use(tooltip)

app.mount('#app')
