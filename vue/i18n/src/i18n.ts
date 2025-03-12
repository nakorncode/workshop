import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import th from './locales/th.json'
import ja from './locales/ja.json'

const i18n = createI18n({
  // 👇 แนะนำให้ใช้เพื่อปิดการใช้งาน Options API
  // อ่านเพิ่มเติม: https://vue-i18n.intlify.dev/guide/advanced/composition.html
  // legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      hello: 'Hello world',
      productCount: 'Product count: {total}',
      productPrice: 'Product price: {price}',
      iAccept: 'I accept the {label}',
      terms: 'term of service',
      privacy: 'privacy policy',
      config: {
        hello: 'Hello world (Config)'
      },
      ...en // จากไฟล์ .json
    },
    th: {
      hello: 'สวัสดีชาวโลก',
      productCount: 'จํานวนสินค้า: {total} ชิ้น',
      productPrice: 'ราคาสินค้า: {price}',
      iAccept: 'ฉันยอมรับ {label}',
      terms: 'เงื่อนไขการใช้งาน',
      privacy: 'นโยบายความเป็นส่วนตัว',
      config: {
        hello: 'สวัสดีชาวโลก (Config)'
      },
      ...th // จากไฟล์ .json
    },
    ja: {
      hello: 'こんにちは世界',
      productCount: '製品数量: {total}',
      productPrice: '製品価格: {price}',
      iAccept: '私は {label} を受け入れます',
      terms: '利用規約',
      privacy: 'プライバシーポリシー',
      config: {
        hello: 'こんにちは世界 (Config)'
      },
      ...ja // จากไฟล์ .json
    }
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    th: {
      currency: {
        style: 'currency',
        currency: 'THB'
      }
    },
    ja: {
      currency: {
        style: 'currency',
        currency: 'JPY'
      }
    }
  }
})

export default i18n
