// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

// import Vuex from 'vuex'
import App from './App'
import router from './router'

import store from '@/pages/VuexPage/store'
import 'weui'

import jQuery from 'jquery'
import 'font-awesome/css/font-awesome.css'

Vue.use(VueCompositionAPI);

// Set jQuery plugin
window.jQuery = window.jquery = window.$ = jQuery

Vue.config.productionTip = false

// Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
