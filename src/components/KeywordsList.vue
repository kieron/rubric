<template>
  <div
    class="
      flex-grow
      px-4
      py-3
      mt-2
      bg-gray-100
      border
      rounded
      dark:bg-gray-700 dark:border-gray-600
    "
    v-if="data.length"
  >
    <h3 class="font-bold text-gray-700 dark:text-gray-300 text-md">Keywords</h3>

    <div class="flex flex-wrap my-3 -m-1">
      <div
        v-for="(header) in data"
        :key="header.id"
        class=""
        :class="{ 'text-gray-400': header.weight === false }"
      >
        <div
          class="
            relative
            flex
            py-0.5
            px-4
            m-1
            hover-trigger
            text-sm
            font-bold
            leading-loose
            bg-indigo-100
            border border-indigo-200
            rounded
            transition
            duration-1000
            ease-in-out
          "
        >
          <span class="">{{ header }}</span>
          <div
            class="
              absolute
              pl-5
              transition
              duration-1000
              ease-in-out
              del-grad
              right-1
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {

  },
  name: "KeywordsList",
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
</style>