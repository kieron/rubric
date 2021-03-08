import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import store from "./store";
import LoadScript from "vue-plugin-load-script";

// Layouts
import Default from "@/layouts/Default";

// Views
import Dashboard from "@/pages/Dashboard";
const view = (name) => () => import(`@/pages/${name}.vue`);

import "@/assets/css/tailwind.css";

Vue.config.productionTip = true;
Vue.use(LoadScript);
Vue.use(Router);

// Analytics for Live Site
if (process.env.NODE_ENV === "production") {
  Vue.loadScript("https://analytics.alderaan.network/js/plausible.js");
}

// Visual Tailwind Breakpoints
if (process.env.NODE_ENV !== "production") {
  Vue.loadScript("https://awesomecdn.netlify.app/tw.js");
}

const routes = [
  {
    path: "/",
    component: Default,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/login",
        name: "Login",
        component: view("Login"),
      },
      {
        path: "/register",
        name: "Register",
        component: view("Register"),
      },
      {
        path: "/forgotten",
        name: "Forgotten Password",
        component: view("ForgottenPassword"),
      },
      {
        path: "/analysis",
        name: "SERP Analysis",
        component: view("Analysis"),
      },
      {
        path: "/blueprint",
        name: "Blueprint Editor",
        component: view("Blueprint"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/page-audit",
        name: "Page Audit",
        component: view("Audit"),
        props: true,
      },
      {
        path: "/privacy",
        name: "Privacy Policy",
        component: view("Privacy"),
      },
      { path: "*", name: "PageNotFound", component: view("PageNotFound") },
    ],
  },
];

const router = new Router({
  mode: "history",
  routes,

  scrollBehavior(_, __, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
