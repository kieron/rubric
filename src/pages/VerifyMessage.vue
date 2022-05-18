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
            Verification Email
          </h1>
          <p class="mt-2 text-sm text-gray-500 md:text-base">
            We have sent an email to verify that the registered email belongs to you. Please check your inbox.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import LoadingSpinner from "@/components/LoadingSpinner";
import config from "../../config";
// import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "Login",
//   components: {
//     LoadingSpinner,
//     ErrorMessage,
//   },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    authStatus: function() {
      return this.$store.getters.authStatus;
    },
  },
  mounted() {
    // if (this.isLoggedIn === true) this.$router.push("/");
  },
  data() {
    return {
      api_url: config.API_URL,

      loader: {
        loading: false,
      },
    };
  },
  methods: {
    // verify: async function() {
    //   this.loader.loading = true;
    //   const email = this.$route.params.email;
    //   const mailToken = this.$route.params.token;
    //   try {
    //     await this.$store.dispatch("verify", { email, mailToken });
    //     if (this.authStatus === "success") {
    //       this.$router.push("/login");
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   } finally {
    //     this.loader.loading = false;
    //   }
    // },
  },
};
</script>

<style scoped></style>
