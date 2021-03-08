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
        ? "https://rubricseo-api.herokuapp.com"
        : "http://localhost:3001",
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
        let response = await fetch(url, options);
        let data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          const token = data.user.token;
          const user = data.user;
          console.log(user);
          localStorage.setItem("token", token);
          // axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
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
          console.log(data.error);
        } else {
          const token = data.user.token;
          const user = data.user;
          console.log(user);
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
        }
        // axios({ url: state.api_url, data: user, method: "POST" })
        //   .then((resp) => {
        //     const token = resp.data.token;
        //     const user = resp.data.user;
        //     localStorage.setItem("token", token);
        //     commit("auth_success", token, user);
        //     resolve(resp);
        //   })
        //   .catch((err) => {
        //     commit("auth_error", err);
        //     localStorage.removeItem("token");
        //     reject(err);
        //   });
      })();
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
