import Vue from "vue";
import Vuex from "vuex";
import config from "../../config";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: {},
    sideBarOpen: false,
    containerFull: false,
    accessToken: null,
    status: "",
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
    api_url: config.API_URL,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    userDetails: () => JSON.parse(localStorage.getItem("user")),
    sideBarOpen: (state) => state.sideBarOpen,
    containerFull: (state) => state.containerFull,
    getTheme: (state) => {
      return state.theme;
    },
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
      localStorage.theme = theme;
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
    auth_success(state, payload = {token:null,user:null}) {
      const {token,user} = payload
      state.status = "success";
      console.log(token, user)
      if (!token || !user) return;
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
    },
  },
  actions: {
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
          const response = await fetch(url, options);
          const data = await response.json();
          if (data.error) {
            commit("auth_error", data.error);
          } else {
            const token = data.user.token;
            const user = data.user;
            console.log(token,user)
            delete user.password;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            commit("auth_success", {token, user});
          }
        } catch (error) {
          commit("auth_error", error);
        }
      })();
    },
    verifyAccount({ commit, state }, payload) {
      const { email, mailToken } = payload;
      return new (async () => {
        commit("auth_request");
        const url = `${state.api_url}/verifytoken/${email}/${mailToken}`;
        const options = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
        try {
          const response = await fetch(url, options);

          const data = await response.json();

          if (data.error || !response.ok) {
            commit("auth_error", data.error ? data.error : data.msg);
            throw new Error(data.msg);
          } else {
            commit("auth_success");
          }
        } catch (error) {
          commit("auth_error", error);
          throw new Error(error.message);
        }
      })();
    },
    resendVerificationLink({ commit, state }, payload) {
      const { email } = payload;
      return new (async () => {
        commit("auth_request");
        const url = `${state.api_url}/retrytoken`;
        const options = {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
        try {
          const response = await fetch(url, options);

          const data = await response.json();

          if (data.error || !response.ok) {
            commit("auth_error", data.error ? data.error : data.msg);
            throw new Error(data.msg);
          } else {
            commit("auth_success");
          }
        } catch (error) {
          commit("auth_error", error);
          throw new Error(error.message);
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
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.error) {
          commit("auth_error", data.error);
        } else {
          // const token = data.user.token;
          // const user = data.user;
          // delete user.password;
          // localStorage.setItem("token", token);
          // localStorage.setItem("user", JSON.stringify(user));
          // commit("auth_success", token, user);
          commit("auth_success");
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
    initTheme({ commit }) {
      const cachedTheme = localStorage.theme ? localStorage.theme : false;
      const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;

      if (cachedTheme) commit("SET_THEME", cachedTheme);
      else if (userPrefersDark) commit("SET_THEME", "dark");
      else commit("SET_THEME", "light");
    },
    toggleTheme({ commit }) {
      switch (localStorage.theme) {
        case "light":
          commit("SET_THEME", "dark");
          break;

        default:
          commit("SET_THEME", "light");
          break;
      }
    },
  },
});
