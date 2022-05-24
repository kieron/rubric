<template>
  <div
    class="flex-1 h-full max-w-4xl mx-auto overflow-hidden  slide-in-right dark:bg-gray-800"
  >
    <div class="flex flex-col overflow-y-auto">
      <div class="flex items-center justify-center p-6 sm:p-12">
        <div class="w-full">
          <h1
            class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Verification
          </h1>
          <p>

          </p>
          <p class="mt-2 text-sm text-gray-500 md:text-base" v-if="loader.loading">
            Your account is being verified, please wait...
          </p>
          <p class="mt-2 text-sm text-gray-500 md:text-base" v-else-if="authStatus === 'success'">
            Your account has been verified redirecting to login page...
          </p>
          <button
            @click="resendVerificationLink"
            v-if="error"
            class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white align-middle transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg  active:bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-purple"
          >
            <span v-if="authStatus !== 'loading'">Resend verification token</span>
            <LoadingSpinner
              class="w-5 h-5 ml-3 fill-current"
              v-if="authStatus === 'loading'"
            />
          </button>

          <LoadingSpinner v-if="loader.loading" class="w-12 h-12 mt-2" />
          <ErrorMessage
            class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded  alert swing-in-top-fwd"
            v-bind:message="authStatus.message"
            v-if="authStatus !== 'success' && authStatus.message"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner";
import config from "../../config";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "Login",
  components: {
    LoadingSpinner,
    ErrorMessage,
  },
  computed: {
    authStatus: function() {
      return this.$store.getters.authStatus;
    },
  },
  mounted() {
    if (this.isLoggedIn === true) this.$router.push("/");
    this.verify()
  },
  data() {
    return {
      api_url: config.API_URL,
      error:null,
      loader: {
        loading: false,
      },
    };
  },
  methods: {
    verify: async function() {
      this.loader.loading = true;
      const email = this.$route.params.email;
      const mailToken = this.$route.params.token;
      this.error = null
      try {
        await this.$store.dispatch("verifyAccount", { email, mailToken });

        if (this.authStatus === "success") {
         setTimeout(()=>{
            this.$router.push("/login");
         },1500)
        }
      } catch (err) {
        this.error = err.message
        console.log(err);
      } finally {
        this.loader.loading = false;
      }
    },
    resendVerificationLink: async function() {
      this.loader.loading = true;
      const email = this.$route.params.email;
      this.error = null
      try {
        await this.$store.dispatch("resendVerificationLink", { email });
  
        if (this.authStatus === "success") {
          this.$router.push("/verification-message");
        }
      } catch (err) {
        this.error = err.message
        console.log(err);
      } finally {
        this.loader.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
