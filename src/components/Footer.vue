<template functional>
  <div
    class="items-center justify-between w-full px-8 py-6 text-gray-700 border-t dark:border-gray-600 lg:flex"
  >
    <p class="mb-2 lg:mb-0 dark:text-gray-400">©RUBRIC Copyright 2021</p>

    <div class="flex text-sm text-gray-600 md:text-base">
      <a
        href="/"
        class="mr-6 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red-400"
        >Terms of Service</a
      >
      <router-link
        to="/privacy"
        class="mr-6 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red-400"
        >Privacy Policy</router-link
      >
    </div>
  </div>
</template>