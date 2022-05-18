<template>
  <div
    class="flex-1 h-full max-w-4xl mx-auto overflow-hidden  dark:bg-gray-800 slide-in-right"
  >
    <div class="flex items-center justify-center p-6 sm:p-12">
      <div class="w-full">
        <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
          Create account
        </h1>
        <form @submit.prevent="register">
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">Email</span>
            <input
              class="block w-full mt-1 text-sm  dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="jane.doe@gmail.com"
              autocomplete="email"
              type="email"
              required
              v-model="email"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">Password</span>
            <input
              class="block w-full mt-1 text-sm  dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="***************"
              type="password"
              autocomplete="new-password"
              required
              id="password"
              v-model="password"
              v-on:input="passwordStrength()"
            />
            <span v-if="passwordComplexityError" class="text-xs text-red-500"
              >Your password should be at least 8 characters in length, and
              contain either a number, special character or an uppercase
              letter.</span
            >
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">
              Confirm password
            </span>
            <input
              class="block w-full mt-1 text-sm  dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="***************"
              type="password"
              id="password_confirmation"
              autocomplete="new-password"
              v-model="password_confirmation"
              required
            />
            <span v-if="passwordMatchError" class="text-xs text-red-500"
              >Password does not match!</span
            >
          </label>

          <div class="flex mt-6 text-sm">
            <label class="flex items-center dark:text-gray-400">
              <input
                type="checkbox"
                class="text-purple-600  form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                required
              />
              <span class="ml-2">
                I agree to the
                <router-link to="/privacy" target="_blank" class="underline"
                  >privacy policy</router-link
                >
              </span>
            </label>
          </div>
          <button
            class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white align-middle transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg  active:bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-purple"
            type="submit"
          >
            <span v-if="authStatus !== 'loading'">Create Account</span>
            <LoadingSpinner
              class="w-5 h-5 ml-3 fill-current"
              v-if="authStatus === 'loading'"
            />
          </button>
          <!-- You should use a button here, as the anchor is only used for the example  -->
        </form>
        <ErrorMessage
          class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded  alert swing-in-top-fwd"
          v-bind:message="$store.getters.authStatus.message"
          v-if="authStatus !== 'success' && authStatus.message"
        />
        <hr class="my-8" />

        <p class="mt-2">
          <router-link
            class="text-sm font-medium text-purple-600  dark:text-purple-400 hover:underline"
            to="/login"
          >
            Already have an account? Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import config from "../../config";

export default {
  name: "Register",
  components: {
    ErrorMessage,
    LoadingSpinner,
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    authStatus: function() {
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
      password_confirmation: "",
      passwordMatchError: false,
      passwordComplexityError: false,
      api_url: config.API_URL,
      loader: {
        loading: false,
      },
    };
  },
  methods: {
    register: async function() {
      if (!this.passwordComplexityError) {
        if (this.password === this.password_confirmation) {
          this.passwordMatchError = false;
          let data = {
            name: this.name,
            email: this.email,
            password: this.password,
          };
          try {
            await this.$store.dispatch("register", data);
            if (this.$store.getters.authStatus === "success") {
              this.$router.push("/verification-message");
            }
          } catch (err) {
            console.log(err);
          } finally {
            this.loader.loading = false;
          }
        } else {
          this.passwordMatchError = true;
          document.getElementById("password_confirmation").focus();
        }
      } else {
        document.getElementById("password").focus();
      }
    },
    passwordStrength: function() {
      const mediumRegex = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
      );

      if (mediumRegex.test(this.password)) {
        this.passwordComplexityError = false;
      } else {
        this.passwordComplexityError = true;
      }
    },
  },
  watch: {
    password_confirmation: function() {
      if (
        this.passwordMatchError &&
        this.password === this.password_confirmation
      ) {
        this.passwordMatchError = false;
      }
    },
  },
};
</script>
