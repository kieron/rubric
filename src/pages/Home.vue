<template>
  <div id="home" class="slide-in-right">
    <div class="flex" style="height: 600px">
      <div
        class="flex items-center px-8 text-center  lg:text-left md:px-12 lg:w-1/2"
      >
        <div>
          <h2
            class="text-3xl font-semibold text-gray-800  dark:text-gray-300 md:text-4xl"
          >
            Welcome to <span class="text-indigo-600">Rubric</span>
          </h2>
          <p class="mt-2 text-sm text-gray-500 md:text-base">
            If you are a content creator, Rubric can help you create winning SEO
            content for your website. It's designed to help you maximise your
            efficiency even if you are not an expert in SEO.
          </p>
          <p class="mt-2 text-sm text-gray-500 md:text-base">
            Perform your first SERP Analysis now!
          </p>
          <div class="flex justify-center mt-6 lg:justify-start">
            <router-link
              class="flex items-center self-center h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-900 rounded-lg  hover:bg-indigo-500 focus:outline-none"
              to="/analysis"
              v-if="isLoggedIn"
              >SERP Analysis</router-link
            >
            <router-link
              class="flex items-center self-center h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  hover:bg-indigo-500 focus:outline-none"
              to="/login"
              v-if="!isLoggedIn"
              >Login</router-link
            >
            <router-link
              class="flex items-center self-center h-16 px-4 mb-2 ml-2 font-semibold text-center text-gray-300 duration-150 bg-gray-700 rounded-lg  hover:bg-gray-300 hover:text-gray-700 focus:outline-none"
              to="/register"
              v-if="!isLoggedIn"
              >Sign Up</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>