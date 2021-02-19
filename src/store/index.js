import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    blueprintData: {},
  },
  mutations: {
    addBlueprint: (state, data) => {
      state.blueprintData = data;
    },
  },
  actions: {
    async addBluePrintData({ commit }, data) {
      commit("addBlueprint", data);
    },
  },
  getters: {
    getBlueprint: (state) => {
      return state.blueprintData;
    },
  },
});
