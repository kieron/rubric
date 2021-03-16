<template>
  <div
    class="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg dark:bg-gray-800 slide-in-right"
  >
    <div class="flex flex-col overflow-y-auto">
      <div class="flex items-center justify-center p-6 sm:p-12">
        <div class="w-full">
          <h1
            class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Forgot password
          </h1>
          <form @submit.prevent="resetPassword">
            <label class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400">Email</span>
              <input
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Jane Doe"
                type="email"
                v-model="email"
                required
              />
            </label>

            <button
              class="flex justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-purple"
              type="submit"
              :disabled="this.loader.loading === true"
            >
              <span v-if="!loader.loading">Change Password</span>
              <LoadingSpinner
                class="w-5 h-5 ml-3 fill-current"
                v-if="loader.loading"
              />
            </button>
          </form>
          <SuccessMessage
            class="flex flex-row items-center p-5 mt-5 bg-green-200 border-b-2 border-green-300 rounded alert swing-in-top-fwd"
            v-if="successMessage && !errorHandler.error"
            v-bind:message="successMessage"
          />
          <ErrorMessage
            class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded alert swing-in-top-fwd"
            v-bind:message="errorHandler.errorMessage"
            v-if="errorHandler.error === true && !successMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import SuccessMessage from "@/components/SuccessMessage";
import config from "../../config";

export default {
  name: "Forgotten",
  components: {
    ErrorMessage,
    LoadingSpinner,
    SuccessMessage,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    if (this.isLoggedIn === true) this.$router.push("/");
  },
  data() {
    return {
      successMessage: "",
      email: "",
      token: this.$route.params.token,
      api_url: config.API_URL,

      errorHandler: {
        error: false,
        errorMessage: "Something Went Wrong",
      },

      loader: {
        loaded: false,
        loading: false,
      },
    };
  },
  methods: {
    resetPassword: async function () {
      this.loader.loading = true;
      try {
        const url = `${this.api_url}/reset-password/`;
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({ email: this.email }),
        };
        let response = await fetch(url, options);
        let data = await response.json();
        if (data.error) {
          this.errorHandler.error = true;
          this.errorHandler.errorMessage = data.error.message;
        } else {
          this.errorHandler.error = false;
          this.successMessage = "Check your email for a password reset link!";
        }
      } catch (err) {
        this.errorHandler.error = true;
        this.errorHandler.errorMessage = err;
      } finally {
        this.loader.loading = false;
      }
    },
  },
};
</script>