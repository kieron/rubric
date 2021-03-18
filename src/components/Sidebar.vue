<template>
  <div
    class="hidden w-3/4 h-screen border-r dark:border-gray-600 lg:fixed md:w-1/3 lg:w-64 md:top-0 md:left-0 lg:block bg-gray-25 dark:bg-gray-800 sidebar"
    id="main-nav"
  >
    <router-link
      active-class="bg-gray-25 dark:bg-gray-800"
      to="/"
      class="flex items-center w-full h-20 px-4 mb-8 text-gray-800 hover:text-indigo-600 dark:hover:text-indigo-600 dark:text-indigo-200"
    >
      <DocumentTextIcon class="w-8 h-8 ml-2 text-indigo-600" />

      <p class="pl-2 text-3xl font-semibold">RUBRIC</p>
    </router-link>
    <MenuItems />
  </div>
</template>

<script>
import MenuItems from "@/components/MenuItems";
import { DocumentTextIcon } from "@vue-hero-icons/outline";
export default {
  name: "Sidebar",
  components: {
    MenuItems,
    DocumentTextIcon,
  },
  data() {
    return {};
  },
};
</script>

