<template>
  <div id="analysis" class="slide-in-right">
    <Breadcrumb />
    <BetaMessage />

    <div class="items-center mb-6">
      <h1
        class="mb-3 text-3xl font-semibold text-gray-800 dark:text-gray-300 lg:mb-0"
      >
        My Account
      </h1>
      <p class="text-gray-800 dark:text-gray-300">It's all about you.</p>
      <hr class="mt-2" />
      <div class="dark:text-gray-400">
        <div class="flex my-5">
          <p>
            Logged In: <strong v-if="isLoggedIn">True</strong
            ><strong v-if="!isLoggedIn">False</strong>
          </p>
        </div>
        <div class="flex my-5">
          <p>
            Email:
            <strong v-if="userDetails" class="break-all">{{
              userDetails.email || "null"
            }}</strong>
          </p>
        </div>
        <div class="flex my-5">
          <p>
            Token:
            <strong v-if="userDetails" class="break-all">{{
              userDetails.token || "null"
            }}</strong>
          </p>
        </div>
        <div class="flex my-5">
          <p>
            ID:
            <strong v-if="userDetails" class="break-all">{{
              userDetails._id || "null"
            }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetaMessage from "@/components/BetaMessage";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "Account",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    userDetails: function () {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  components: {
    Breadcrumb,
    BetaMessage,
  },

  methods: {},
};
</script>

<style>
</style>