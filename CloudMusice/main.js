import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import store from './store/index.js'
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store=store
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif