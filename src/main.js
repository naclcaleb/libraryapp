import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import Antd from 'ant-design-vue'
import './style/antd-theme.css'

Vue.use(Chartkick.use(Chart))

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
