import Vue from 'vue'
import axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import router from './router'
import store from './store'
import fs from 'fs'
import sql from 'sql.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

var db = new sql.Database()
var data = db.export()
var buffer = Buffer.from(data)
fs.writeFileSync('sml.sqlite', buffer)
