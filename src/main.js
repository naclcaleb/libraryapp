import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import Antd from 'ant-design-vue'
import './style/antd-theme.css'

import * as firebase from 'firebase/app'
require('firebase/auth')

Vue.use(Chartkick.use(Chart))

Vue.use(Antd)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAK_IpdgskWh8FP9doRqf114mu0D9XnObE",
  authDomain: "highlow-promotional.firebaseapp.com",
  databaseURL: "https://highlow-promotional.firebaseio.com",
  projectId: "highlow-promotional",
  storageBucket: "highlow-promotional.appspot.com",
  messagingSenderId: "709246017339",
  appId: "1:709246017339:web:76f28cd244ef5120"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().signInWithEmailAndPassword('naclcaleb@gmail.com', 'hester').then((data) => {
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
