<template>
  <div
    class="h-screen leading-normal tracking-normal bg-white dark:bg-gray-800"
    id="main-body"
  >
    <div class="flex flex-wrap">
      <Sidebar />
      <main
        class="w-full pl-0 bg-white dark:bg-gray-800 lg:pl-64"
        id="main-con"
        :class="sideBarOpen ? 'overlay' : ''"
      >
        <Navbar />

        <div
          class="relative p-6 mx-auto bg-white dark:bg-gray-800 transition-width transition-slowest ease"
          :class="containerFull ? '' : 'container'"
        >
          <button
            v-if="$route.name == 'Blueprint Editor'"
            @click="toggleContainer"
            title="Toggle Layout"
            class="absolute right-0 z-10 hidden mr-6 text-gray-600 2xl:block"
          >
            <ViewGridIcon class="mt-0.5" />
          </button>
          <router-view />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mapState } from "vuex";
import { ViewGridIcon } from "@vue-hero-icons/outline";
import { mapGetters } from "vuex";

export default {
  name: "DefaultLayout",
  components: {
    ViewGridIcon,
    Sidebar,
    Navbar,
    Footer,
  },
  watch: {
    theme(newTheme) {
      newTheme === "light"
        ? document.querySelector("html").classList.remove("dark")
        : document.querySelector("html").classList.add("dark");
    },
  },
  methods: {
    toggleContainer() {
      this.$store.dispatch("toggleContainer");
    },
  },
  computed: {
    ...mapGetters({ theme: "getTheme" }),

    ...mapState(["sideBarOpen", "containerFull"]),
  },
  beforeMount() {
    this.$store.dispatch("initTheme");
  },
};
</script>