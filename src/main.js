import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";

import Analysis from "@/components/Analysis";
import AnalysisHome from "@/pages/Home";

import store from "./store";

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

Vue.use(Router);

const routes = [
  { path: "/", redirect: { name: "AnalysisHome" } },
  {
    path: "/analysis",
    component: Analysis,
    children: [
      { path: "/", redirect: { name: "AnalysisHome" } },
      { path: "home", name: "AnalysisHome", component: AnalysisHome },
    ],
  },
];

const router = new Router({
  mode: "history",
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
