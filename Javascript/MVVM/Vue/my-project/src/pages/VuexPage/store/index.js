import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import demo from './modules/demo'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// 利用 modules 分割 store
export default new Vuex.Store({
  modules: {
    cart,
    products,
    demo,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})
