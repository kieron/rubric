import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blueprintData: {},
    sideBarOpen: false,
    containerFull: false,
    accessToken: null,
    status: "",
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
    api_url:
      process.env.NODE_ENV === "production"
        ? "https://rubricseo-api.herokuapp.com"
        : "http://localhost:3001",
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    userDetails: () => JSON.parse(localStorage.getItem("user")),
    getBlueprint: (state) => state.blueprintData,
    sideBarOpen: (state) => state.sideBarOpen,
    containerFull: (state) => state.containerFull,
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
    auth_error(state, msg) {
      state.status = msg;
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = {};
      // location.reload();
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
      return new (async () => {
        commit("auth_request");
        const url = `${state.api_url}/login`;
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            user,
          }),
        };
        try {
          let response = await fetch(url, options);
          let data = await response.json();
          if (data.error) {
            commit("auth_error", data.error);
          } else {
            const token = data.user.token;
            const user = data.user;
            delete user.password;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            commit("auth_success", token, user);
          }
        } catch (error) {
          commit("auth_error", error);
        }
      })();
    },
    register({ commit, state }, user) {
      return new (async () => {
        commit("auth_request");
        const url = `${state.api_url}/register`;
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            user,
          }),
        };
        let response = await fetch(url, options);
        let data = await response.json();
        if (data.error) {
          commit("auth_error", data.error);
        } else {
          const token = data.user.token;
          const user = data.user;
          delete user.password;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          commit("auth_success", token, user);
        }
      })();
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        resolve();
      });
    },
  },
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
