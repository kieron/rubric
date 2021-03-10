<template>
  <div>
    <div
      class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-100 border-2 border-green-500 rounded-full alert-icon"
    >
      <span class="text-green-500">
        <CheckIcon class="w-6 h-6" />
      </span>
    </div>
    <div class="ml-4 alert-content">
      <div class="text-lg font-semibold text-green-800 alert-title">
        Success
      </div>
      <div class="text-sm text-green-600 alert-description">
        {{ message }}
        <EmojiHappyIcon class="inline w-4 h-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { EmojiHappyIcon, CheckIcon } from "@vue-hero-icons/outline";

export default {
  name: "ErrorMessage",
  components: {
    EmojiHappyIcon,
    CheckIcon,
  },
  props: ["message"],
};
</script>
<style>
</style>