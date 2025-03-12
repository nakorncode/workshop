<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n, I18nT } from 'vue-i18n'

const { n, t, locale } = useI18n({
  useScope: 'global', // ต้องตั้งค่านี้เพื่อเรียกใช้บน Config ด้วยเช่นกัน หากจะใช้ร่วมกับ messages ด้านล่าง
  messages: {
    en: {
      composition: {
        hello: 'Hello World (Composition API)'
      }
    },
    th: {
      composition: {
        hello: 'สวัสดีชาวโลก (Composition API)'
      }
    },
    ja: {
      composition: {
        hello: 'こんにちは世界 (Composition API)'
      }
    }
  }
})

const total = ref(1)
const prices = {
  en: 9.99,
  th: 339,
  ja: 1499
}
const priceOnLocale = computed<string>(() => {
  return n(prices[locale.value], 'currency')
})
</script>

<template>
  <div class="max-w-md p-4">
    <p><b>Current locale:</b> {{ locale }}</p>
    <p class="mt-2">
      <b class="mr-2">Switch language:</b>
      <select v-model="locale" class="border border-gray-400 rounded p-1">
        <option value="en">English</option>
        <option value="th">Thai</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
      </select>
    </p>

    <hr>

    <!-- ⚠️ ไม่แนะนำวิธีนี้ และมี console.warn() ขึ้นมาว่า Deprecated -->
    <h2>Template API</h2>
    <p>{{ $t('hello') }}</p>

    <hr>

    <!-- ✅ แนะนำ ต้องเรียก useI18n() ก่อน -->
    <h2>Composition API</h2>
    <p>{{ t('hello') }}</p>

    <hr>

    <h2>Params</h2>
    <p class="mb-2">{{ t('productCount', { total }) }}</p>
    <button type="button" @click="total++">Increase</button>

    <hr>

    <h2>Number Formatting</h2>
    <p>{{ t('productPrice', { price: priceOnLocale }) }}</p>

    <hr>

    <h2>Component Interpolation</h2>
    <I18nT keypath="iAccept" tag="p">
      <template #label>
        <a href="#terms" class="underline text-blue-600">{{ t('terms') }}</a>
      </template>
    </I18nT>

    <I18nT keypath="iAccept" tag="p">
      <template #label>
        <a href="#privacy" class="underline text-blue-600">{{ t('privacy') }}</a>
      </template>
    </I18nT>

    <hr>

    <!-- ✅ แนะนำหากระบบมีภาษาน้อย -->
    <h2>From Config Plugin</h2>
    <p>{{ t('config.hello') }}</p>

    <hr>

    <!-- ✅ แนะนำหากต้องการทำ Local Scope และยังได้ TypeScript Suggestion อีกด้วย -->
    <h2>From Composition API</h2>
    <p>{{ t('composition.hello') }}</p>

    <hr>

    <!-- ✅ แนะนำหากระบบมีภาษาเยอะ หรือใช้เครื่องมือแปลภาษาภายนอกช่วยเหลือ -->
    <h2>From JSON File</h2>
    <p>{{ t('file.hello') }}</p>
  </div>
</template>
