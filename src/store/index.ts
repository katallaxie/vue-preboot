import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import home from './modules/home'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    home,
  },
  strict: __DEV__,
  plugins: __DEV__ ? [createLogger({})] : []
})
