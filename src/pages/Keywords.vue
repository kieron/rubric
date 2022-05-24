<template>
  <div id="analysis">
    <vue-topprogress ref="topProgress" color="#4f46e5"></vue-topprogress>

    <div id="animHolder" class="slide-in-right">
      <v-tour name="myTour" :steps="steps" :callbacks="tourComplete"></v-tour>
      <Breadcrumb />

      <div class="items-center mb-6">
        <h1
          class="
            mb-3
            text-3xl
            font-semibold
            text-gray-800
            dark:text-gray-300
            lg:mb-0
          "
        >
          Keyword Finder
        </h1>
        <p class="text-gray-800 dark:text-gray-300">
          Quickly find keywords for a given keyword
        </p>
        <hr class="mt-2" />
      </div>

      <div
        class="p-5 rounded shadow-md bg-gray-25 dark:bg-gray-700"
        v-if="!retrieving"
      >
        <h2 class="pt-2 mb-2 text-2xl text-gray-800 dark:text-gray-300 lg:mb-0">
          Search Parameters
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Simply input your keyword below. This can take up to a minute.
        </p>

        <form v-on:submit.prevent="generate()" class="pb-2 my-5">
          <div class="mb-5 sm:flex">
            <input
              data-tour-step="1"
              type="text"
              v-model="search.query"
              placeholder="best fishing rod for beginners"
              id="query"
              required
              class="
                flex flex-grow
                w-full
                h-16
                px-6
                mb-2
                mr-2
                placeholder-gray-500 placeholder-opacity-50
                bg-white
                border
                rounded-lg
                shadow-sm
                dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800
                focus:outline-none
              "
            />
            <button
              data-tour-step="6"
              type="submit"
              :disabled="this.loader.loading === true"
              v-on:click="animateSearchBtn($event)"
              :class="{ 'bounce-top': search.animatedSearchBtn }"
              @animationend="search.animatedSearchBtn = false"
              class="
                flex
                items-center
                self-center
                flex-grow
                w-full
                h-16
                px-4
                mb-2
                font-semibold
                text-white
                duration-150
                bg-indigo-600
                rounded-lg
                shadow-md
                sm:w-auto
                hover:bg-indigo-500
                focus:outline-none
                whitespace-nowrap
              "
            >
              <div class="flex ml-auto mr-auto">
                <span v-if="!loader.loading" class="whitespace-no-wrap"
                  >Find Keywords</span
                >
                <span v-if="loader.loading" class="whitespace-no-wrap"
                  >Crunching Data</span
                >

                <ArrowCircleRightIcon
                  class="w-6 h-6 ml-2"
                  v-if="!loader.loading"
                />
                <LoadingSpinner
                  class="flex items-center w-6 h-6 ml-3 fill-current"
                  v-if="loader.loading"
                />
              </div>
            </button>
          </div>
          <hr class="mb-3" />
        </form>
      </div>

      <div
        class="flex justify-center my-20 text-indigo-600"
        v-if="loader.loading"
      >
        <LoadingSpinner
          class="
            flex
            justify-center
            w-40
            ml-auto
            mr-auto
            text-center
            fill-current
          "
        />
      </div>
      <div id="results">
        <div
          class="mt-5 slide-in-bottom"
          v-if="loader.loaded && !loader.loading && !keywordData.error"
        >
          <div class="flex w-full md:my-5">
            <KeywordsList
              v-if="keywordData"
              :data="keywordData"
              title="Popular Headers"
            />
          </div>
        </div>
      </div>
      <ErrorMessage
        class="
          flex flex-row
          items-center
          p-5
          mt-5
          bg-red-200
          border-b-2 border-red-300
          rounded
          alert
          swing-in-top-fwd
        "
        v-if="errorHandler.error && loader.loading != true"
        v-bind:message="errorHandler.errorMessage"
      />
    </div>
  </div>
</template>

<script>
import VueTour from "vue-tour";
import Vue from "vue";
import "vue-tour/dist/vue-tour.css";
import { mapState } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import Breadcrumb from "@/components/Breadcrumb";
import KeywordsList from "@/components/KeywordsList";
var VueScrollTo = require("vue-scrollto");
import { vueTopprogress } from "vue-top-progress";
import config from "../../config";

Vue.use(VueTour);

import {
  ArrowCircleRightIcon,
} from "@vue-hero-icons/outline";

export default {
  computed: {
    ...mapState(["blueprintData"]),
  },
  mounted() {
    if (localStorage.getItem("tourComplete") !== "true") {
      setTimeout(() => {
        this.$tours["myTour"].start();
      }, 1000);
    }
  },
  components: {
    LoadingSpinner,
    Breadcrumb,
    vueTopprogress,
    KeywordsList,
    ErrorMessage,
    ArrowCircleRightIcon,
  },
  name: "Keywords",
  data() {
    return {
      search: {
        query: "",
        amount: 50,

        peopleAlsoAsk: true,
        fetchQuestions: true,
        domainAuthority: true,
        timeStart: 0,
        timeTaken: 0,
        animatedSearchBtn: false,
        api_url: config.API_URL,
      },

      retrieving: false,

      errorHandler: {
        error: false,
        errorMessage: "Something Went Wrong",
      },

      loader: {
        loaded: false,
        loading: false,
      },

      keywordData: [],

      steps: [
        {
          target: '[data-tour-step="1"]',
          header: {
            title: "Keywords",
          },
          content: `These are the keywords that we will run the analysis on.`,
        },
        {
          target: '[data-tour-step="2"]',
          header: {
            title: "Search Engine",
          },
          content: `Choose the search engine that you wish results to come from, such as Google or Bing.`,
        },
        {
          target: '[data-tour-step="3"]',
          header: {
            title: "Country",
          },
          content: `Choose the country you wish the search to be ran in.`,
        },
        {
          target: '[data-tour-step="4"]',
          header: {
            title: "Device",
          },
          content: `Choose a specific device to run the search engine analysis on.`,
        },
        {
          target: '[data-tour-step="5"]',
          header: {
            title: "Amount",
          },
          content: `Choose the amount of articles you wish to analyse, more articles will take longer!`,
        },
        {
          target: '[data-tour-step="6"]',
          header: {
            title: "Start Analysis",
          },
          content: `Clicking on 'Start Analysis' will tell the machines behind the scene to get to work, and you'll have your data back here in no time!`,
        },
      ],
      tourComplete: {
        onStop: function () {
          localStorage.setItem("tourComplete", "true");
        },
      },
    };
  },
  methods: {
    generate: async function () {
      this.search.timeStart = performance.now();
      this.$refs.topProgress.start();
      this.loader.loading = true;
      try {
        let response = await fetch(
          `${this.search.api_url}/keywords?keyword=${this.search.query}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        let data = await response.json();
        if (data.error) {
          this.errorHandler.errorMessage = data.error.message;
          this.errorHandler.error = true;
          this.loader.loaded = false;
          this.loader.loading = false;
          this.$refs.topProgress.done();
        } else {
          this.keywordData = data;
          this.loadedAndShow();
        }
      } catch (err) {
        console.log(err);
      }
    },

    animateSearchBtn() {
      this.search.animatedSearchBtn = true;
    },

    loadedAndShow() {
      if (!this.retrieving) {
        this.$nextTick(() =>
          VueScrollTo.scrollTo("#results", { offset: -270 })
        );
      }

      this.loader.loaded = true;
      this.loader.loading = false;
      this.$refs.topProgress.done();
    },
  },
};
</script>

<style lang="css" scoped>
input:checked + svg {
  display: block;
}

.slide-in-bottom {
  -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

.bounce-top {
  -webkit-animation: bounce-top 0.9s both;
  animation: bounce-top 0.9s both;
}

@-webkit-keyframes bounce-top {
  0% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}
@keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-0px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-6x);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}

.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>