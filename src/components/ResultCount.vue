<template>
  <div
    class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 hover:font-bold md:text-sm"
    :class="[hoverColour]"
  >
    <component
      :is="icon"
      class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
    />

    <span
      v-bind:title="title"
      class="text-xs whitespace-no-wrap align-middle md:text-sm"
      >{{ label }}</span
    >
  </div>
</template>

<script>
import {
  AnnotationIcon,
  PhotographIcon,
  NewspaperIcon,
  TemplateIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
} from "@vue-hero-icons/outline";

export default {
  name: "ResultCount",
  components: {
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
    TemplateIcon,
    ShieldCheckIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
  },
  props: ["icon", "label", "hoverColour", "title"],
};
</script>

<style>
</style>