import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-cn.json'

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof zhCN

const i18n = createI18n({
  globalInjection: true,
  locale: 'zh-CN',
  legacy: false,
  messages: {
    'zh-CN': zhCN
  }
})
export default i18n;