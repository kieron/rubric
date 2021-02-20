<template>
  <div>
    <div class="px-4 mt-8 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">MENU</p>
      <router-link
        to="/analysis"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
        @click.native="toggleSidebar()"
      >
        <ChartSquareBarIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">SERP Analysis</span>
      </router-link>
      <router-link
        to="/blueprint"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <CubeTransparentIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Blueprint Tool</span>
      </router-link>
    </div>
    <div class="px-4 mt-5 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">HELP</p>
      <a
        href="mailto:hello@kieron.io?subject=Feedback%20-%20Rubric%20SEO"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <ChatIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Provide Feedback</span>
      </a>
    </div>
    <div class="px-4 mt-5 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">HELP</p>
      <div
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <PresentationChartLineIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Something</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CubeTransparentIcon,
  PresentationChartLineIcon,
  ChartSquareBarIcon,
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
    PresentationChartLineIcon,
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
  },
};
</script>