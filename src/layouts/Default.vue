<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <Sidebar />
      <main
        class="w-full pl-0 bg-white lg:pl-64"
        id="main-con"
        :class="sideBarOpen ? 'overlay' : ''"
      >
        <Navbar />

        <div
          class="relative p-6 mx-auto mb-20 bg-white transition-width transition-slowest ease"
          :class="containerFull ? '' : 'container'"
        >
          <button
            @click="toggleContainer"
            title="Toggle Layout"
            class="hidden text-gray-600 2xl:block"
          >
            <ViewGridIcon class="absolute right-0 mr-6 mt-0.5" />
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

export default {
  name: "DefaultLayout",
  components: {
    ViewGridIcon,
    Sidebar,
    Navbar,
    Footer,
  },
  methods: {
    toggleContainer() {
      this.$store.dispatch("toggleContainer");
    },
  },
  computed: {
    ...mapState(["sideBarOpen", "containerFull"]),
  },
};
</script>