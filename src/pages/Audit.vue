<template>
  <div id="analysis" class="slide-in-right">
    <Breadcrumb />
    <BetaMessage
      class="flex flex-row items-center p-5 mb-8 bg-blue-200 border-b-2 border-blue-300 rounded alert"
    />

    <div class="items-center mb-6">
      <h1 class="mb-3 text-3xl font-semibold text-gray-800 lg:mb-0">
        Page Audit
      </h1>
      <p>Audit any given web page to find out how it's put together.</p>
      <hr class="mt-2" />
      <p class="mt-5 text-3xl">Coming Soon</p>
    </div>
  </div>
</template>

<script>
import BetaMessage from "@/components/BetaMessage";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: {
    BetaMessage,
    Breadcrumb,
  },
};
</script>

<style>
</style>