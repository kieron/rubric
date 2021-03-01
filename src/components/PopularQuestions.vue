<template>
  <div
    class="flex-grow px-4 py-3 mt-2 bg-gray-100 border rounded"
    v-if="data.length"
  >
    <h3 class="font-bold text-gray-700 text-md">{{ title }}</h3>
    <p class="mt-2 text-xl text-gray-500">
      You may wish to include these in your content.
    </p>
    <p class="mt-2 text-sm text-gray-500">
      We are currently showing the ones we think are relevant, use the button
      below to see all popular headers.
    </p>
    <div class="flex flex-wrap my-3 -m-1">
      <span
        v-for="header in weighted"
        :key="header.id"
        class="p-1 m-1 text-sm font-bold leading-loose border border-indigo-200 rounded"
        :class="{ 'text-gray-400': header.weight === false }"
        >{{ header.header }}</span
      >
    </div>
    <button @click="showMoreToggle()" title="Show More">
      <ChevronDownIcon class="w-6 h-6 text-gray-500" />
    </button>
    <div
      v-if="showMore"
      class="flex flex-wrap my-3 -m-1 swing-in-top-fwd"
      :class="{ hidden: !showMore }"
    >
      <span
        v-for="header in unWeighted"
        :key="header.id"
        class="p-1 m-1 text-sm font-bold leading-loose border border-indigo-200 rounded"
        :class="{ 'text-gray-400': header.weight === false }"
        >{{ header.header }}</span
      >
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from "@vue-hero-icons/outline";

export default {
  components: {
    ChevronDownIcon,
  },
  name: "PopularQuestions",
  props: ["data", "title"],
  data() {
    return {
      showMore: false,
    };
  },
  methods: {
    showMoreToggle() {
      this.showMore = !this.showMore;
    },
  },
  computed: {
    weighted: function () {
      return this.data.filter(function (item) {
        return item.weight === true;
      });
    },
    unWeighted: function () {
      return this.data.filter(function (item) {
        return item.weight === false;
      });
    },
  },
};
</script>

<style>
.swing-in-top-fwd {
  -webkit-animation: swing-in-top-fwd 0.5s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@-webkit-keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}

.swing-in-top-fwd {
  -webkit-animation: swing-in-top-fwd 0.8s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation: swing-in-top-fwd 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@-webkit-keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}
</style>