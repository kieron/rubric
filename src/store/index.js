import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blueprintData: {},
    sideBarOpen: false,
    containerFull: false,
    accessToken: null,
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    api_url:
      process.env.NODE_ENV === "production"
        ? "https://rubricseo-api.herokuapp.com/"
        : "http://localhost:3001/",
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,

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
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
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
    login({ commit, state }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: state.api_url,
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit, state }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: state.api_url, data: user, method: "POST" })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
