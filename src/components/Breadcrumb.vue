<template>
  <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
    <ol class="inline-flex p-0 list-none">
      <li class="flex items-center text-purple">
        <router-link
          to="/"
          class="text-gray-700 dark:hover:text-red-400 dark:text-gray-300"
          >Home</router-link
        >
        <svg
          class="w-3 h-3 mx-3 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      </li>
      <li class="flex items-center">
        <router-link
          :to="current"
          class="text-gray-600 dark:hover:text-red-400 dark:text-gray-300"
          >{{ $route.name }}</router-link
        >
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      current: this.$route.path,
    };
  },
};
</script>

<style>
</style>