import Vue from 'vue'
import Vuex from 'vuex'
import { REPLACE } from '../store/mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    app: {
      navText: '领域管理',
      active: '1',
      loading: true
    }
  },
  mutations: {
    [REPLACE] (state, payload) {
      state.app = {
        ...state.app,
        ...payload
      }
    }
  },
  actions: {
    [REPLACE] (context, payload) {
      context.commit(REPLACE, payload)
    }
  }
})

export default store
