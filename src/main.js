import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import store from "./store";

// Layouts
import Default from "@/layouts/Default";

// Views
import Home from "@/pages/Home";
const view = (name) => () => import(`@/pages/${name}.vue`);

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: Default,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "/analysis",
        name: "Analysis",
        component: view("Analysis"),
      },
      {
        path: "/blueprint",
        name: "Blueprint",
        component: view("Blueprint"),
      },
      { path: "*", name: "PageNotFound", component: view("PageNotFound") },
    ],
  },
];

const router = new Router({
  mode: "history",
  routes,
  linkActiveClass: "bg-gray-30",
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
