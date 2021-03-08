import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blueprintData: {},
    sideBarOpen: false,
    containerFull: false,
    accessToken: null,
    auth: {
      loggedIn: false,
      loggedOut: true,
      currentUser: {
        email: null,
      },
    },
  },
  getters: {
    loggedIn: ({ loggedIn }) => loggedIn,

    getBlueprint: (state) => {
      return state.blueprintData;
    },
    getQuestions: (state) => {
      var questions = [];
      if (Object.keys(state.blueprintData).length) {
        for (const result of state.blueprintData.results) {
          for (const question of result.questions) {
            questions.push(question);
          }
        }
        // Still need to add Google's questions here
      }
      return questions.filter(onlyUnique);
    },
    getHeaders: (state) => {
      var headers = [];
      if (Object.keys(state.blueprintData).length) {
        for (const result of state.blueprintData.results) {
          for (const header of result.headers) {
            headers.push(header);
          }
        }
      }
      return headers.filter(onlyUnique);
    },
    sideBarOpen: (state) => {
      return state.sideBarOpen;
    },
    containerFull: (state) => {
      return state.containerFull;
    },
  },
  mutations: {
    addBlueprint: (state, data) => {
      state.blueprintData = data;
    },
    toggleSidebar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    toggleContainer(state) {
      state.containerFull = !state.containerFull;
    },
  },
  actions: {
    async addBluePrintData({ commit }, data) {
      commit("addBlueprint", data);
    },
    toggleSidebar(context) {
      context.commit("toggleSidebar");
    },
    toggleContainer(context) {
      context.commit("toggleContainer");
    },
    login() {
      //Stuff
    },
  },
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
