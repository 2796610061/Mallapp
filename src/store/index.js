import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    sids: 0,
  },
  mutations: {
    getCount(state,val){
      state.count=val
      // console.log(state.count)
    },
    getsid(state,val){
      state.sids=val
    },
  },
  actions: {
  },
  modules: {
  }
})
