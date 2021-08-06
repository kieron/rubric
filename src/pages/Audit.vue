<template>
  <div id="audit">
    <vue-topprogress ref="topProgress" color="#4f46e5"></vue-topprogress>

    <div id="animHolder" class="slide-in-right">
      <Breadcrumb />
      <BetaMessage />

      <div class="items-center mb-6">
        <h1
          class="mb-3 text-3xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
        >
          Page Audit
        </h1>
        <p class="text-gray-800 dark:text-gray-300">
          Audit a single page for its content statistics.
        </p>
        <hr class="mt-2" />
      </div>

      <div class="p-5 rounded bg-gray-25 dark:bg-gray-700">
        <h2 class="pt-2 mb-2 text-2xl text-gray-800 dark:text-gray-300 lg:mb-0">
          Page URL
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Provide the URL for the page you wish to audit, ensuring to include
          http:// or https:// in the URL
        </p>

        <form v-on:submit.prevent="audit()" class="my-5">
          <div class="mb-5 sm:flex">
            <input
              data-tour-step="1"
              type="url"
              pattern="https?://.*"
              v-model="search.query"
              placeholder="https://www.google.com"
              id="query"
              required
              class="flex flex-grow w-full h-16 px-6 mb-2 mr-2 placeholder-gray-500 placeholder-opacity-50 bg-white border rounded-lg  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 focus:outline-none"
            />
            <button
              data-tour-step="6"
              type="submit"
              :disabled="this.loader.loading === true"
              v-on:click="animateSearchBtn($event)"
              :class="{ 'bounce-top': search.animatedSearchBtn }"
              @animationend="search.animatedSearchBtn = false"
              class="flex items-center self-center flex-grow w-full h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
            >
              <div class="flex ml-auto mr-auto">
                <span v-if="!loader.loading" class="whitespace-no-wrap"
                  >Start Audit</span
                >
                <span v-if="loader.loading" class="whitespace-no-wrap"
                  >Fetching Page</span
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
        </form>
      </div>

      <div
        class="flex justify-center my-20 text-indigo-600"
        v-if="loader.loading"
      >
        <LoadingSpinner
          class="flex justify-center w-40 ml-auto mr-auto text-center fill-current "
        />
      </div>
      <div id="results">
        <div
          class="mt-5 slide-in-bottom"
          v-if="loader.loaded && !loader.loading && !serpData.error"
        >
          <h2
            class="pt-2 mb-2 text-2xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
          >
            Results
          </h2>
          <p
            class="mb-2 text-gray-800 dark:text-gray-400 font text-1xl lg:mb-0"
          >
            Your audit for <strong>{{ serpData.url }}</strong> is finished.
            <span v-if="search.timeStart">
              This audit took
              <strong>{{ search.timeTaken }}</strong> seconds!</span
            >
            Here are the results.
          </p>

          <div class="my-4 md:my-8 md:flex">
            <div
              class="flex flex-col w-full"
              v-if="
                serpData.wordCount ||
                serpData.paragraphCount ||
                serpData.imageCount ||
                serpData.headerCount
              "
            >
              <p
                class="mb-4 text-xl font-semibold text-gray-700  dark:text-gray-400"
              >
                Important Values
              </p>
              <div class="flex flex-wrap h-full -mx-3 md:mx-0">
                <div class="w-1/2 px-3 pb-1 xl:pb-0 md:px-0 md:pr-1 xl:w-1/4">
                  <div
                    class="flex items-center p-0 bg-white border rounded-lg  dark:bg-gray-700 dark:border-gray-600"
                  >
                    <div
                      class="px-1 py-10 text-white rounded-l-lg  md:px-3 dark:text-gray-400 lg:px-5 lg:py-5 bg-pink"
                    >
                      <AnnotationIcon
                        class="hidden w-8 h-8 mx-auto  lg:block dark:text-gray-300"
                      />
                    </div>

                    <div
                      class="ml-3 leading-6 text-gray-700  md:ml-6 dark:text-gray-300"
                    >
                      <p class="text-2xl font-semibold">
                        {{ serpData.wordCount }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Word Count
                      </p>
                    </div>
                  </div>
                </div>
                <!-- //h -->
                <div class="w-1/2 px-3 md:px-0 md:pr-1 xl:w-1/4">
                  <div
                    class="flex items-center p-0 bg-white border rounded-lg  dark:bg-gray-700 dark:border-gray-600"
                  >
                    <div
                      class="px-1 py-10 text-white rounded-l-lg  md:px-3 dark:text-gray-400 lg:px-5 lg:py-5 bg-purple"
                    >
                      <NewspaperIcon
                        class="hidden w-8 h-8 mx-auto  lg:block dark:text-gray-300"
                      />
                    </div>

                    <div
                      class="ml-3 leading-6 text-gray-700  md:ml-6 dark:text-gray-300"
                    >
                      <p class="text-2xl font-semibold">
                        {{ serpData.headers.length }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Header Count
                      </p>
                    </div>
                  </div>
                </div>
                <!-- //h -->
                <div class="w-1/2 px-3 md:px-0 md:pr-1 xl:w-1/4">
                  <div
                    class="flex items-center p-0 bg-white border rounded-lg  dark:bg-gray-700 dark:border-gray-600"
                  >
                    <div
                      class="px-1 py-10 text-white rounded-l-lg  md:px-3 dark:text-gray-400 lg:px-5 lg:py-5 bg-orange"
                    >
                      <PhotographIcon
                        class="hidden w-8 h-8 mx-auto  lg:block dark:text-gray-300"
                      />
                    </div>

                    <div
                      class="ml-3 leading-6 text-gray-700  md:ml-6 dark:text-gray-300"
                    >
                      <p class="text-2xl font-semibold">
                        {{ serpData.imageCount }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Image Count
                      </p>
                    </div>
                  </div>
                </div>
                <!-- //h -->
                <div class="w-1/2 px-3 md:px-0 md:pr-1 xl:w-1/4">
                  <div
                    class="flex items-center p-0 bg-white border rounded-lg  dark:bg-gray-700 dark:border-gray-600"
                  >
                    <div
                      class="px-1 py-10 text-white rounded-l-lg  md:px-3 dark:text-gray-400 lg:px-5 lg:py-5 bg-green"
                    >
                      <TemplateIcon
                        class="hidden w-8 h-8 mx-auto  lg:block dark:text-gray-300"
                      />
                    </div>

                    <div
                      class="ml-3 leading-6 text-gray-700  md:ml-6 dark:text-gray-300"
                    >
                      <p class="text-2xl font-semibold">
                        {{ serpData.paragraphCount }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Paragraph Count
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col mt-5 mb-12 border border-gray-300 rounded-md  dark:border-gray-600 bg-gray-25 dark:bg-gray-700"
            v-if="serpData"
          >
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle  sm:px-6 lg:px-8"
              >
                <div class="overflow-hidden sm:rounded-lg">
                  <table
                    class="min-w-full divide-y divide-gray-200  dark:divide-gray-600"
                  >
                    <thead>
                      <tr>
                        <th
                          class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase  dark:text-gray-300 dark:bg-gray-700 bg-gray-50"
                        >
                          Breakdown
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white border-t border-gray-300 divide-y divide-gray-200  dark:border-gray-600 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <tr class="border-b border-gray-200 dark:border-gray-600">
                        <td class="px-3 py-3 md:px-6 md:py-4">
                          <div class="flex items-center">
                            <div class="">
                              <div
                                class="mb-1 mr-16 font-medium leading-5 text-gray-900  dark:text-gray-300 md:text-lg"
                              >
                                {{ serpData.title }}
                              </div>

                              <div
                                class="text-xs leading-5 text-gray-500  dark:text-gray-400 md:text-sm"
                              >
                                <a
                                  :href="serpData.url"
                                  target="_blank"
                                  class="break-all"
                                  >{{ serpData.url }}</a
                                >
                              </div>
                              <div class="flex flex-wrap mt-2">
                                <ResultCount
                                  icon="AnnotationIcon"
                                  v-bind:label="serpData.wordCount + ' Words'"
                                  hoverColour="hover:text-pink-700 dark:hover:text-pink-700"
                                  title="Word Count"
                                />

                                <ResultCount
                                  icon="NewspaperIcon"
                                  v-bind:label="
                                    serpData.headers.length + ' Headers'
                                  "
                                  hoverColour="hover:text-purple dark:hover:text-purple"
                                  title="Header Count"
                                />

                                <ResultCount
                                  icon="PhotographIcon"
                                  v-bind:label="serpData.imageCount + ' Images'"
                                  hoverColour="hover:text-orange dark:hover:text-orange"
                                  title="Image Count"
                                />

                                <ResultCount
                                  icon="TemplateIcon"
                                  v-bind:label="
                                    serpData.paragraphCount + ' Paragraphs'
                                  "
                                  hoverColour="hover:text-green-500 dark:hover:text-green-500"
                                  title="Paragraph Count"
                                />

                                <!-- <ResultCount
                                  icon="ShieldCheckIcon"
                                  v-bind:label="
                                    serpData.domainAuthority +
                                    ' Domain Authority'
                                  "
                                  hoverColour="hover:text-pink-700 dark:hover:text-pink-700"
                                  title="Domain Authority"
                                /> -->

                                <ResultCount
                                  icon="QuestionMarkCircleIcon"
                                  v-bind:label="
                                    serpData.questions.length + ' Questions'
                                  "
                                  hoverColour="hover:text-purple dark:hover:text-purple"
                                  title="Questions Answered"
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            v-if="
                              serpData.headers.length ||
                              serpData.questions.length
                            "
                            class="mt-5 rounded  additional-info swing-in-top-fwd"
                          >
                            <div class="flex flex-wrap">
                              <HeaderQuestions
                                v-if="serpData.questions.length"
                                v-bind:articleData="serpData.questions"
                                title="Questions"
                              />

                              <HeaderQuestions
                                v-if="serpData.headers.length"
                                v-bind:articleData="serpData.headers"
                                title="Headers"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ErrorMessage
        class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded  alert swing-in-top-fwd"
        v-if="errorHandler.error && loader.loading != true"
        v-bind:message="errorHandler.errorMessage"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner";
import BetaMessage from "@/components/BetaMessage";
import ErrorMessage from "@/components/ErrorMessage";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderQuestions from "@/components/HeaderQuestions";
import ResultCount from "@/components/ResultCount";
var VueScrollTo = require("vue-scrollto");
import { vueTopprogress } from "vue-top-progress";
import config from "../../config";

import {
  AnnotationIcon,
  NewspaperIcon,
  PhotographIcon,
  TemplateIcon,
  //ShieldCheckIcon,
  ArrowCircleRightIcon,
} from "@vue-hero-icons/outline";

export default {
  computed: {
    ...mapState(["blueprintData"]),
  },
  mounted() {},
  components: {
    HeaderQuestions,
    LoadingSpinner,
    Breadcrumb,
    vueTopprogress,
    ResultCount,
    BetaMessage,
    ErrorMessage,
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
    TemplateIcon,
    //ShieldCheckIcon,
    //QuestionMarkCircleIcon,
    ArrowCircleRightIcon,
  },
  name: "Audit",
  data() {
    return {
      search: {
        query: "",
        timeStart: 0,
        timeTaken: 0,
        animatedSearchBtn: false,
        api_url: config.API_URL,
      },

      errorHandler: {
        error: false,
        errorMessage: "Something Went Wrong",
      },

      loader: {
        loaded: false,
        loading: false,
      },

      serpData: {},
    };
  },
  methods: {
    audit: async function () {
      this.search.timeStart = performance.now();
      this.$refs.topProgress.start();
      this.loader.loading = true;
      try {
        let response = await fetch(
          `${this.search.api_url}/audit?url=${this.search.query}`,
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
          console.log(data);
          this.serpData = { ...this.serpData, ...data };
          this.search.timeTaken = Math.round(
            (performance.now() - this.search.timeStart) / 1000
          );

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
      this.$nextTick(() => VueScrollTo.scrollTo("#results", { offset: -270 }));
      this.loader.loaded = true;
      this.loader.loading = false;
      this.search.idFromDb = "";
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