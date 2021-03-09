<template>
  <div>
    <div
      class="flex items-center justify-center flex-shrink-0 bg-red-100 border-2 border-red-500 rounded-full md:h-10 md:w-10 w-7 h-7 alert-icon"
    >
      <span class="text-red-500">
        <XIcon class="w-6 h-6" />
      </span>
    </div>
    <div class="ml-4 alert-content">
      <div class="text-lg font-semibold text-red-800 alert-title">Whoops</div>
      <div class="text-sm text-red-600 alert-description">
        {{ message }}
        <EmojiSadIcon class="inline w-4 h-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon, EmojiSadIcon } from "@vue-hero-icons/outline";

export default {
  name: "ErrorMessage",
  components: {
    EmojiSadIcon,
    XIcon,
  },
  props: ["message"],
};
</script>
<style>
</style>