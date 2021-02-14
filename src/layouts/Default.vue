<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <Sidebar />
      <main
        class="w-full pl-0 bg-white lg:pl-64"
        :class="sideBarOpen ? 'overlay' : ''"
        id="main-content"
      >
        <Navbar />

        <div class="p-6 mb-20 bg-white">
          <router-view />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "DefaultLayout",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
};
</script>