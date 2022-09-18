import { fileURLToPath, URL } from 'url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: { // css模块化 文件以.module.[css|less|scss]结尾
      hashPrefix: 'Polaris-',
    },
    preprocessorOptions: {
      css: {
        javascriptEnabled: true,
      },
      scss: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('postcss-nested')
      ]
    }
  },
  plugins: [

    createSvgIconsPlugin({
      // 指定要缓存的文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: '[name]'
    }),
    vue({
      template: { transformAssetUrls }
    }),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,
      include: path.resolve(__dirname, './src/locales/**')
    }),
    vueJsx(),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true
  }
})
