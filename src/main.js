import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/style/index.scss'
import '@/style/element-variables.scss'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(store)

import './utils/permission'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
