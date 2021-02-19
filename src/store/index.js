import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blueprintData: {},
    sideBarOpen: false,
  },
  getters: {
    getBlueprint: (state) => {
      return state.blueprintData;
    },
    sideBarOpen: (state) => {
      return state.sideBarOpen;
    },
  },
  mutations: {
    addBlueprint: (state, data) => {
      state.blueprintData = data;
    },
    toggleSidebar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
  },
  actions: {
    async addBluePrintData({ commit }, data) {
      commit("addBlueprint", data);
    },
    toggleSidebar(context) {
      context.commit("toggleSidebar");
    },
  },
});
