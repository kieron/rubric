<template>
  <div
    class="flex-grow px-4 py-3 mt-2 bg-gray-100 border rounded lg:mx-1"
    v-if="articleData.length"
  >
    <h3 class="font-bold text-gray-700 text-md">{{ title }}</h3>
    <div class="flex flex-wrap my-3 -m-1">
      <span
        v-for="question in articleData"
        :key="question.id"
        class="py-0.5 px-1 m-1 text-sm font-bold leading-loose bg-indigo-100 border border-indigo-200 rounded"
        >{{ question }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderQuestions",
  props: ["articleData", "title"],
};
</script>

<style>
</style>