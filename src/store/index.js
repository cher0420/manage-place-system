import Vue from 'vue'
import Vuex from 'vuex'
import { REPLACE, UPDATETABLE } from '../store/mutation-types'
import {MENUS} from '../constants/constants'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    app: {
      navText: '领域管理',
      active: '1',
      login: false,
      loading: false,
      menu: MENUS,
      tableData: []
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
    },
    [UPDATETABLE] (context, payload) {

      context.commit(REPLACE, payload)
    },
  }
})

export default store
