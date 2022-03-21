import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import store from "./store";
import LoadScript from "vue-plugin-load-script";

// Layouts
import Default from "@/layouts/Default";

// Views
const view = (name) => () => import(`@/pages/${name}.vue`);

import "@/assets/css/tailwind.css";
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(LoadScript);
Vue.use(Router);

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
        path: "/",
        name: "Home",
        component: view("Home"),
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
        path: "/account",
        name: "Account",
        component: view("Account"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/forgot-password",
        name: "Forgotten Password",
        component: view("ForgottenPassword"),
      },
      {
        path: "/confirm-password/:token",
        name: "Confirm Password",
        component: view("ConfirmPassword"),
      },
      {
        path: "/analysis",
        name: "SERP Analysis",
        component: view("Analysis"),
        props: true,
        meta: {
          requiresAuth: true,
        },
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
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/privacy",
        name: "Privacy Policy",
        component: view("Privacy"),
      },
      {
        path: "/tos",
        name: "Terms of Service",
        component: view("TermsOfService"),
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
