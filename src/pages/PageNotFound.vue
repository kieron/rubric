<template>
  <div class="flex items-center text-gray-800 bg-indigo-200 gradient">
    <div class="container flex flex-wrap items-center p-4 mx-auto">
      <div class="w-full p-4 text-center md:w-5/12">
        <img src="@/assets/not-found.svg" alt="Not Found" />
      </div>
      <div class="w-full p-4 text-center md:w-7/12 md:text-left">
        <div class="text-6xl font-medium">404</div>
        <div class="mb-4 text-xl font-medium md:text-3xl">
          Oops. We couldn't find this page.
        </div>
        <div class="mb-8 text-lg">
          You may have mistyped the address or the page may have moved.
        </div>
        <router-link
          active-class="bg-indigo-600"
          class="flex items-center justify-center w-40 h-16 px-4 mb-2 font-semibold text-center text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
          to="/"
          >Go Home</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>