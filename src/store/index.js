/**
 * @description vuex
 * @author simple
 * @date 2018/11/17 09:46
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
