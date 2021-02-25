<template>
  <div>
    <div class="px-4 mt-8 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">TOOLS</p>
      <router-link
        to="/analysis"
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
        @click.native="toggleSidebar()"
      >
        <ChartSquareBarIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">SERP Analysis</span>
      </router-link>
      <router-link
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        to="/blueprint"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <CubeTransparentIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Blueprint Editor</span>
      </router-link>
      <router-link
        to="/nowhere"
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <BriefcaseIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Page Audit</span>
      </router-link>
    </div>
    <div class="px-4 mt-5 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">HELP</p>
      <a
        href="mailto:hello@rubricseo.com?subject=Feedback%20-%20Rubric%20SEO"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <ChatIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Provide Feedback</span>
      </a>
    </div>
    <div class="px-4 mt-5 mb-4 text-gray-800">
      <p class="pl-4 mb-4 text-xs font-semibold text-gray-600">DEV UTILS</p>
      <router-link
        to="/register"
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
        @click.native="toggleSidebar()"
      >
        <UserAddIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Register</span>
      </router-link>
      <router-link
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        to="/login"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 mb-2 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <LoginIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Log In</span>
      </router-link>
      <router-link
        to="/forgotten"
        active-class="border-l-8 border-indigo-600 bg-gray-30"
        title="Coming Soon"
        @click.native="toggleSidebar()"
        class="flex items-center w-full h-10 pl-4 text-gray-800 duration-150 rounded-lg cursor-pointer hover:bg-gray-30"
      >
        <HeartIcon class="w-6 h-6 mr-2 text-gray-700" />

        <span class="font-medium text-gray-800">Forgotten Password</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CubeTransparentIcon,
  LoginIcon,
  ChartSquareBarIcon,
  BriefcaseIcon,
  UserAddIcon,
  HeartIcon,
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
    BriefcaseIcon,
    UserAddIcon,
    HeartIcon,
    LoginIcon,
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
  },
};
</script>