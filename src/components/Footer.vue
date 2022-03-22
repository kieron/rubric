<template functional>
  <div
    class="items-center justify-between w-full px-8 py-6 text-sm border-t  dark:bg-gray-900 dark:border-gray-600 dark:text-gray-400 lg:flex"
  >
    <p class="mb-2 lg:mb-0">©RUBRIC Copyright {{ new Date().getFullYear() }}</p>

    <div class="flex">
      <a href="/tos" class="mr-6 hover:text-gray-900 dark:hover:text-red-400"
        >Terms of Service</a
      >
      <router-link
        to="/privacy"
        class="mr-6 hover:text-gray-900 dark:hover:text-red-400"
        >Privacy Policy</router-link
      >
    </div>
  </div>
</template>
