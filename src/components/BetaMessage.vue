<template>
  <div
    class="flex flex-row items-center p-5 mb-8 bg-blue-200 border-b-2 border-blue-300 rounded dark:border-indigo-800 dark:bg-indigo-900 alert"
  >
    <div
      class="flex items-center justify-center flex-shrink-0 bg-blue-100 border-2 border-blue-500 rounded-full md:h-10 md:w-10 w-7 h-7 alert-icon"
    >
      <span class="text-blue-500">
        <InformationCircleIcon class="w-6 h-6" />
      </span>
    </div>
    <div class="ml-4 alert-content">
      <div
        class="text-lg font-semibold text-blue-800 dark:text-blue-200 alert-title"
      >
        Info
      </div>
      <div class="text-sm text-blue-600 dark:text-blue-300 alert-description">
        Hey! Thanks for looking at Rubric! Though still in the very early stages
        of development- I would really appreciate your feedback on the project,
        and naturally, stuff may break or may not even work at all yet! Thanks.
      </div>
    </div>
  </div>
</template>

<script>
import { InformationCircleIcon } from "@vue-hero-icons/outline";

export default {
  name: "BetaMessage",

  components: {
    InformationCircleIcon,
  },
};
</script>

<style>
</style>