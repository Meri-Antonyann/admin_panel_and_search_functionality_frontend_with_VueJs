import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import pagination from 'laravel-vue-pagination'

require('./plugins')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, pagination },
  template: '<App/>'
})
