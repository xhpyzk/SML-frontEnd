import Vue from 'vue'
import axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mousetrap from 'mousetrap'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(ElementUI)
const { getCurrentWindow } = require('electron').remote

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

Mousetrap.bind('left right left right', function () {
  console.log('open dev tools')
  getCurrentWindow().webContents.openDevTools()
  return false
})
