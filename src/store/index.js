import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser : null
  },
  mutations: {
    setCurrentUser : function (state, user) {
      state.currentUser = user
    }
  },
  actions: {
  },
  modules: {
  }
})
export  default store