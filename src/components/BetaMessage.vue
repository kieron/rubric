<template>
  <div
    class="flex flex-row items-center p-5 mb-8 bg-blue-200 border-b-2 border-blue-300 rounded dark:border-indigo-800 dark:bg-indigo-900 alert"
  >
    <span class="text-blue-500">
      <InformationCircleIcon class="w-6 h-6" />
    </span>

    <div class="ml-4 alert-content">
      <div
        class="text-lg font-semibold text-blue-800 dark:text-blue-200 alert-title"
      >
        Info
      </div>
      <div class="text-sm text-blue-600 dark:text-blue-300 alert-description">
        Hey! Rubric is ALPHA software. Features may be broken and/or unstable.
        Please report issues! ✨
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