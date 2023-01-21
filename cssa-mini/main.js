
// #ifndef VUE3

import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.wxEnv= "prod-9gip97mx4bfa32a3"
const app = new Vue({
    ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import './static/iconfont/iconfont.css'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif