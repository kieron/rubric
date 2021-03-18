<template>
  <div>
    <div class="px-4 mt-8 mb-4 text-gray-800 dark:text-gray-500">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">TOOLS</p>
      <router-link
        to="/analysis"
        active-class="border-l-8 border-indigo-600 dark:border-indigo-200 bg-gray-30 dark:bg-gray-700 dark:text-indigo-200"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer dark:text-gray-500 dark:hover:text-indigo-200 hover:bg-gray-30 dark:hover:bg-gray-700"
        @click.native="toggleSidebar()"
      >
        <ChartSquareBarIcon class="w-6 h-6 mr-2" />

        <span class="font-medium">SERP Analysis</span>
      </router-link>
      <router-link
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        to="/blueprint"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer dark:text-gray-500 dark:hover:text-indigo-200 hover:bg-gray-30 dark:hover:bg-gray-700"
      >
        <CubeTransparentIcon class="w-6 h-6 mr-2" />

        <span class="font-medium">Blueprint Editor</span>
      </router-link>
      <!-- <router-link
        to="/page-audit"
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer dark:text-gray-500 dark:hover:text-indigo-200 hover:bg-gray-30 dark:hover:bg-gray-700"
      >
        <BriefcaseIcon class="w-6 h-6 mr-2" />

        <span class="font-medium">Page Audit</span>
      </router-link> -->
    </div>
    <div class="px-4 mt-5 mb-4 text-gray-800 dark:text-gray-500">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">HELP</p>
      <a
        href="mailto:hello@rubricseo.com?subject=Feedback%20-%20Rubric%20SEO"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer dark:text-gray-500 dark:hover:text-indigo-200 hover:bg-gray-30 dark:hover:bg-gray-700"
      >
        <ChatIcon class="w-6 h-6 mr-2" />

        <span class="font-medium">Provide Feedback</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CubeTransparentIcon,
  ChartSquareBarIcon,
  // BriefcaseIcon,
  ChatIcon,
} from "@vue-hero-icons/outline";

export default {
  name: "MenuItems",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  components: {
    CubeTransparentIcon,
    ChartSquareBarIcon,
    ChatIcon,
    // BriefcaseIcon,
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
  },
};
</script>