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
      <div
        v-for="(header, index) in weighted"
        :key="header.id"
        class=""
        :class="{ 'text-gray-400': header.weight === false }"
      >
        <div
          class="relative flex py-0.5 px-4 m-1 hover-trigger text-sm font-bold leading-loose bg-indigo-100 border border-indigo-200 rounded transition duration-1000 ease-in-out"
        >
          <span class="">{{ header.header }}</span>
          <div
            class="absolute pl-5 transition duration-1000 ease-in-out del-grad right-1"
          >
            <button
              class="del-header scale-in-center"
              @click="removeWeighted(index)"
            >
              <XCircleIcon
                class="w-6 h-6 mb-0.5 text-gray-700 align-middle hover:text-red-400 del-header-icon transition duration-200 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="showMoreToggle()"
      title="Show More"
      class="flex items-center text-gray-500"
    >
      <span class="mr-1 text-sm">Show More</span>
      <ChevronDownIcon class="inline w-4 h-4" />
    </button>
    <div
      v-if="showMore"
      class="flex flex-row flex-wrap my-3 -m-1 swing-in-top-fwd"
      :class="{ hidden: !showMore }"
    >
      <div
        v-for="(header, index) in unWeighted"
        :key="header.id"
        class=""
        :class="{ 'text-gray-400': header.weight === false }"
      >
        <div
          class="relative flex py-0.5 px-4 m-1 hover-trigger text-sm font-bold leading-loose bg-indigo-100 border border-indigo-200 rounded transition duration-1000 ease-in-out"
        >
          <span class="">{{ header.header }}</span>
          <div
            class="absolute pl-5 transition duration-1000 ease-in-out del-grad right-1"
          >
            <button
              class="text-indigo-300 del-header scale-in-center"
              @click="makeWeighted(index)"
            >
              <PlusCircleIcon
                class="w-6 h-6 mb-0.5 text-gray-700 align-middle hover:text-green-400 del-header-icon transition duration-200 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronDownIcon,
  XCircleIcon,
  PlusCircleIcon,
} from "@vue-hero-icons/outline";

export default {
  components: {
    ChevronDownIcon,
    XCircleIcon,
    PlusCircleIcon,
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
    removeWeighted(index) {
      this.weighted[index].weight = !this.weighted[index].weight;
    },
    makeWeighted(index) {
      this.unWeighted[index].weight = !this.unWeighted[index].weight;
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
.hover-trigger .del-header {
  display: none;
  transition: display 1s ease-in-out;
}

.hover-trigger:hover .del-header {
  display: inline;
}

.hover-trigger:hover .del-grad {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(224, 231, 255, 0.6839110644257703) 20%,
    rgba(224, 231, 255, 0.8939950980392157) 35%,
    rgba(224, 231, 255, 1) 47%
  );
}

.hover-trigger:hover .del-header-icon {
  display: inline;
}

.scale-in-center {
  -webkit-animation: scale-in-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: scale-in-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

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