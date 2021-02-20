<template>
  <div
    class="hidden w-3/4 h-screen border-r lg:fixed md:w-1/3 lg:w-64 md:top-0 md:left-0 lg:block bg-gray-25 sidebar"
    id="main-nav"
  >
    <router-link
      active-class="bg-gray-25"
      to="/"
      class="flex items-center w-full h-20 px-4 mb-8"
    >
      <EmojiHappyIcon class="w-8 h-8 ml-2 text-indigo-600" />

      <p class="pl-4 text-3xl font-semibold text-gray-800">RUBRIC</p>
    </router-link>
    <MenuItems />
  </div>
</template>

<script>
import MenuItems from "@/components/MenuItems";
import { EmojiHappyIcon } from "@vue-hero-icons/outline";
export default {
  name: "Sidebar",
  components: {
    MenuItems,
    EmojiHappyIcon,
  },
  data() {
    return {};
  },
};
</script>

