import Vue from 'vue'
import Vuex from 'vuex'

import itemStore from './modules/itemStore.js'
import userStore from './modules/userStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    itemStore,
    userStore
  }
})
