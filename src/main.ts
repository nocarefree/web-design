import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import i18n from './i18n'

// import router from './router'
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js


const myApp = createApp(App)


myApp.use(i18n)
myApp.use(createPinia())
// myApp.use(router)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
