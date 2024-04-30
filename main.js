
// #ifndef VUE3

import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import './static/iconfont/iconfont.css'
import uviewPlus from './uni_modules/uview-plus'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  return {
    app
  }
}
// #endif