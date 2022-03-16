import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyload, {
  loading: require('assets/img/common/loading.jpeg')
})

FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
