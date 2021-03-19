<template>
  <div
    class="flex-1 h-full max-w-4xl mx-auto overflow-hidden slide-in-right dark:bg-gray-800"
  >
    <div class="flex flex-col overflow-y-auto">
      <div class="flex items-center justify-center p-6 sm:p-12">
        <div class="w-full">
          <h1
            class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Login
          </h1>
          <form @submit.prevent="login">
            <label class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400">Email</span>
              <input
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="jane.doe@gmail.com"
                type="email"
                v-model="email"
                id="email"
                required
              />
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">Password</span>
              <input
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="***************"
                type="password"
                v-model="password"
                id="password"
                required
              />
            </label>

            <button
              type="submit"
              class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white align-middle transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-purple"
              :disabled="this.loader.loading == 1"
              id="submit"
            >
              <span v-if="authStatus !== 'loading'">Log In</span>
              <LoadingSpinner
                class="w-5 h-5 ml-3 fill-current"
                v-if="authStatus === 'loading'"
              />
            </button>
          </form>
          <ErrorMessage
            class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded alert swing-in-top-fwd"
            v-bind:message="authStatus.message"
            v-if="authStatus !== 'success' && authStatus.message"
          />
          <hr class="my-8" />

          <p class="mt-4">
            <router-link
              class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
              to="/forgot-password"
            >
              Forgot your password?
            </router-link>
          </p>
          <p class="mt-1">
            <router-link
              class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
              to="/register"
            >
              Create account
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import config from "../../config";

export default {
  name: "Login",
  components: {
    ErrorMessage,
    LoadingSpinner,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    authStatus: function () {
      return this.$store.getters.authStatus;
    },
  },
  mounted() {
    if (this.isLoggedIn === true) this.$router.push("/");
  },
  data() {
    return {
      email: "",
      password: "",
      api_url: config.API_URL,

      loader: {
        loading: false,
      },
    };
  },
  methods: {
    login: async function () {
      this.loader.loading = true;
      let email = this.email;
      let password = this.password;
      try {
        await this.$store.dispatch("login", { email, password });
        if (this.authStatus === "success") {
          this.$router.push("/account");
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loader.loading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>