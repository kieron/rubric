<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <Sidebar />
      <main class="w-full pl-0 bg-white lg:pl-64" id="main-content">
        <Navbar />

        <div class="container p-6 mx-auto mb-20 bg-white">
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

export default {
  name: "DefaultLayout",
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
};
</script>