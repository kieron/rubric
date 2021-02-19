<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->

  <div
    class="hidden w-3/4 h-screen border-r lg:fixed md:w-1/3 lg:w-64 md:top-0 md:left-0 lg:block bg-gray-25 sidebar"
    id="main-nav"
  >
    <router-link
      active-class="bg-gray-25"
      to="/"
      class="flex items-center w-full h-20 px-4 mb-8"
    >
      <svg
        class="w-8 h-8 ml-2 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        ></path>
      </svg>
      <p class="pl-4 text-3xl font-semibold text-gray-800">RUBRIC</p>
    </router-link>
    <MenuItems />
  </div>
</template>

<script>
import MenuItems from "@/components/MenuItems";

export default {
  name: "Sidebar",
  components: {
    MenuItems,
  },
  data() {
    return {};
  },
};
</script>

