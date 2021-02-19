<template>
  <div>
    <div class="px-4 mt-8 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">MENU</p>
      <router-link
        to="/analysis"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
        @click.native="toggleSidebar()"
      >
        <svg
          class="w-6 h-6 mr-2 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="font-medium text-gray-800">SERP Analysis</span>
      </router-link>
      <router-link
        to="/blueprint"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <svg
          class="w-6 h-6 mr-2 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>
        <span class="font-medium text-gray-800">Blueprint Tool</span>
      </router-link>
    </div>
    <div class="px-4 mt-5 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">HELP</p>
      <a
        href="mailto:hello@kieron.io?subject=Feedback%20-%20Rubric%20SEO"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <svg
          class="w-6 h-6 mr-2 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>

        <span class="font-medium text-gray-800">Provide Feedback</span>
      </a>
    </div>
    <div class="px-4 mt-5 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">HELP</p>
      <div
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <svg
          class="w-6 h-6 mr-2 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          ></path>
        </svg>
        <span class="font-medium text-gray-800">Something</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MenuItems",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
  },
};
</script>