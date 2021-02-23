<template>
  <div id="analysis">
    <Breadcrumb />
    <BetaMessage
      class="flex flex-row items-center p-5 mb-8 bg-blue-200 border-b-2 border-blue-300 rounded alert"
    />

    <div class="items-center mb-6">
      <h1 class="mb-3 text-3xl font-semibold text-gray-800 lg:mb-0">
        SERP Analysis
      </h1>
      <p>Find out who is ranking and why for any given search result.</p>
      <hr class="mt-2" />
    </div>

    <div class="p-5 rounded bg-gray-25">
      <h2 class="pt-2 mb-2 text-2xl text-gray-800 lg:mb-0">
        Search Parameters
      </h2>
      <p class="text-gray-600">
        Simply input your article phrase below. This can take up to a minute for
        larger result sets.
      </p>
      <form v-on:submit.prevent="search" class="pb-2 my-5">
        <div class="mb-5 sm:flex">
          <input
            type="text"
            v-model="query"
            placeholder="Keywords"
            required
            class="flex flex-grow w-full h-16 px-6 mb-2 mr-2 bg-white border rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            :disabled="this.loading == 1"
            v-on:click="animateSearchBtn($event)"
            :class="{ 'bounce-top': animatedSearchBtn }"
            @animationend="animatedSearchBtn = false"
            class="flex items-center self-center flex-grow w-full h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
          >
            <div class="flex ml-auto mr-auto">
              <span v-if="!loading" class="whitespace-no-wrap"
                >Start Analysis</span
              >
              <span v-if="loading && idFromDb === ''" class="whitespace-no-wrap"
                >Fetching SERPs</span
              >
              <span v-if="loading && idFromDb !== ''" class="whitespace-no-wrap"
                >Crunching Data</span
              >
              <ArrowCircleRightIcon class="w-6 h-6 ml-2" v-if="!loading" />
              <LoadingSpinner
                class="flex items-center w-6 h-6 ml-3 fill-current"
                v-if="loading"
              />
            </div>
          </button>
        </div>
        <hr class="mb-3" />
        <div class="">
          <p class="text-gray-600">Optional Parameters</p>
          <p class="mb-3 text-sm text-gray-600">
            You don't need to set these, unless you really want too.
          </p>
          <div class="mb-3 sm:flex sm:justify-between">
            <div class="relative sm:w-1/3">
              <select
                class="w-full h-16 px-3 text-sm bg-white border rounded-lg appearance-none focus:outline-none"
                name="location"
                id="location"
                required
                v-model="location"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 pointer-events-none"
              >
                <ChevronDownIcon class="w-6 h-6" />
              </div>
            </div>
            <div class="relative sm:w-1/3 sm:mx-2">
              <select
                class="w-full h-16 px-3 mx-0 my-2 text-sm bg-white border rounded-lg appearance-none focus:outline-none sm:my-0"
                name="device"
                id="device"
                required
                v-model="device"
              >
                <option selected value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 pointer-events-none"
              >
                <ChevronDownIcon class="w-6 h-6" />
              </div>
            </div>
            <div class="relative sm:w-1/3">
              <input
                class="w-full h-16 px-3 text-sm bg-white border rounded-lg focus:outline-none"
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Amount"
                min="1"
                required
                max="100"
                v-model="amount"
              />
              <p class="absolute right-0 mt-1 text-xs text-right text-gray-500">
                This amount of articles could take around
                <strong> {{ Math.round(this.amount * 1.1) }}</strong>
                seconds to fetch.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="flex justify-center my-20 text-indigo-600" v-if="loading">
      <LoadingSpinner
        class="flex justify-center w-40 ml-auto mr-auto text-center fill-current"
      />
    </div>
    <div id="results">
      <div
        class="mt-5 slide-in-bottom"
        v-if="loaded && !loading && !apiResponse.error"
      >
        <h2 class="pt-2 mb-2 text-2xl font-semibold text-gray-800 lg:mb-0">
          Results
        </h2>
        <p class="mb-2 text-gray-800 font text-1xl lg:mb-0">
          Your search for <strong>{{ apiResponse.searchTerm }}</strong> had
          <strong>{{ apiResponse.totalResults.toLocaleString() }}</strong>
          results, across
          <strong>{{ apiResponse.uniqueDomainCount }}</strong> unique domains
          and took <strong>{{ timeTaken }}</strong> seconds! Here are the
          results.
        </p>

        <div class="my-8 md:flex">
          <div
            :class="{
              'md:w-1/2 md:mr-3 xl:w-1/3': apiResponse.relatedQuestions,
              'w-full': !apiResponse.relatedQuestions,
            }"
            class="flex flex-col"
          >
            <p class="mb-4 text-xl font-semibold text-gray-700">
              Average Values
            </p>
            <div
              :class="{
                'md:flex-col md:flex-no-wrap': apiResponse.relatedQuestions,
                '': !apiResponse.relatedQuestions,
              }"
              class="flex flex-wrap -mx-3 md:mx-0 md:justify-between md:h-full"
            >
              <div
                :class="{
                  'md:px-0 md:w-full px-3': apiResponse.relatedQuestions,
                  'px-3 md:px-0 md:pr-1 xl:w-1/4': !apiResponse.relatedQuestions,
                }"
                class="w-1/2 md:mb-2"
              >
                <div
                  class="flex items-center p-0 mb-2 bg-white border rounded-lg md:mb-0"
                >
                  <div
                    class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-pink"
                  >
                    <AnnotationIcon class="hidden w-8 h-8 mx-auto lg:block" />
                  </div>

                  <div class="ml-6 leading-6 text-gray-700">
                    <p class="text-2xl font-semibold">
                      {{ apiResponse.averageValues.averageWordCount }}
                    </p>
                    <p class="text-sm text-gray-600">Average Words</p>
                  </div>
                </div>
              </div>
              <div
                :class="{
                  'md:px-0 md:w-full px-3': apiResponse.relatedQuestions,
                  'px-3 md:px-0 xl:px-1 xl:w-1/4 pl-1 ': !apiResponse.relatedQuestions,
                }"
                class="w-1/2 md:mb-2"
              >
                <div
                  class="flex items-center p-0 mb-2 bg-white border rounded-lg md:mb-0"
                >
                  <div
                    class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-purple"
                  >
                    <NewspaperIcon class="hidden w-8 h-8 mx-auto lg:block" />
                  </div>

                  <div class="ml-6 leading-6 text-gray-700">
                    <p class="text-2xl font-semibold">
                      {{ apiResponse.averageValues.averageHeaderCount }}
                    </p>
                    <p class="text-sm text-gray-600">Average Headers</p>
                  </div>
                </div>
              </div>
              <div
                :class="{
                  'md:px-0 md:w-full px-3 ': apiResponse.relatedQuestions,
                  'px-3 md:pl-0 md:pr-1 xl:px-1 xl:w-1/4 ': !apiResponse.relatedQuestions,
                }"
                class="w-1/2 md:mb-2"
              >
                <div
                  class="flex items-center p-0 mb-2 bg-white border rounded-lg md:mb-0"
                >
                  <div
                    class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-orange"
                  >
                    <PhotographIcon class="hidden w-8 h-8 mx-auto lg:block" />
                  </div>

                  <div class="ml-6 leading-6 text-gray-700">
                    <p class="text-2xl font-semibold">
                      {{ apiResponse.averageValues.averageImagesCount }}
                    </p>
                    <p class="text-sm text-gray-600">Average Images</p>
                  </div>
                </div>
              </div>
              <div
                :class="{
                  'md:px-0 md:w-full mb-0 px-3': apiResponse.relatedQuestions,
                  'md:mb-2 px-3 md:pr-0 pl-1 xl:w-1/4': !apiResponse.relatedQuestions,
                }"
                class="w-1/2"
              >
                <div
                  class="flex items-center p-0 mb-2 bg-white border rounded-lg md:mb-0"
                >
                  <div
                    class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-green"
                  >
                    <TemplateIcon class="hidden w-8 h-8 mx-auto lg:block" />
                  </div>

                  <div class="ml-6 leading-6 text-gray-700">
                    <p class="text-2xl font-semibold">
                      {{ apiResponse.averageValues.averageParagraphCount }}
                    </p>
                    <p class="text-sm text-gray-600">Average Paragraphs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="apiResponse.relatedQuestions"
            class="order-last w-full mt-5 xl:w-2/3 md:mt-0"
          >
            <p class="mb-4 text-xl font-semibold text-gray-700">
              People Also Ask
            </p>

            <div class="flex flex-col justify-evenly">
              <div
                :key="question.id"
                v-for="(question, index) in apiResponse.relatedQuestions"
                class="items-center px-4 py-2 bg-gray-100 border rounded-lg"
                :class="{
                  'mb-2': index != apiResponse.relatedQuestions.length - 1,
                }"
              >
                <div>
                  <p class="text-base font-semibold text-gray-700">
                    {{ question.question }}
                  </p>
                  <p class="text-sm text-gray-700">
                    {{ question.source.title }}
                  </p>
                  <a
                    target="_blank"
                    :href="question.source.link"
                    class="text-sm text-gray-700"
                    >{{ question.source.link }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- table -->
        <div
          class="flex flex-col mb-12 border border-gray-300 rounded-md bg-gray-25"
        >
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase bg-gray-50"
                      >
                        Results
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white border-t border-gray-300 divide-y divide-gray-200"
                  >
                    <tr
                      :key="article.id"
                      v-for="(article, articleIndex) in apiResponse.results"
                      class="border-b border-gray-200"
                    >
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="">
                            <div
                              class="mb-1 mr-16 font-medium leading-5 text-gray-900 md:text-lg"
                            >
                              {{ article.title }}
                            </div>

                            <div
                              class="text-xs leading-5 text-gray-500 md:text-sm"
                            >
                              <a
                                :href="article.url"
                                target="_blank"
                                class="break-all"
                                >{{ article.url }}</a
                              >
                            </div>
                            <div class="flex flex-wrap mt-2">
                              <div
                                class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 hover:text-pink-700 hover:font-bold md:text-sm"
                              >
                                <AnnotationIcon
                                  class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
                                />

                                <span
                                  title="Word Count"
                                  class="text-xs whitespace-no-wrap align-middle md:text-sm"
                                  >{{ article.wordCount }} Words</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 hover:text-purple hover:font-bold md:text-sm"
                              >
                                <NewspaperIcon
                                  class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
                                />

                                <span
                                  title="Header Count"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.headers.length }} Headers</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 hover:text-orange hover:font-bold md:text-sm"
                              >
                                <PhotographIcon
                                  class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
                                />

                                <span
                                  title="Image Count"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.imageCount }} Images</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 hover:font-bold hover:text-green-500 md:text-sm"
                              >
                                <TemplateIcon
                                  class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
                                />

                                <span
                                  title="Paragraph Count"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.paragraphCount }} Paragraphs</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 md:text-sm hover:text-pink-700 hover:font-bold"
                              >
                                <ShieldCheckIcon
                                  class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
                                />

                                <span
                                  title="Domain Authority"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.domainAuthority }} Domain
                                  Authority</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 hover:font-bold md:text-sm hover:text-purple"
                              >
                                <QuestionMarkCircleIcon
                                  class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
                                />

                                <span
                                  title="Questions Answered"
                                  class="whitespace-no-wrap align-middle"
                                  >{{
                                    article.questions.length
                                  }}
                                  Questions</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-xs text-gray-600 hover:font-bold hover:text-orange md:text-sm"
                              >
                                <CalendarIcon
                                  class="inline w-4 h-4 mr-1 align-middle md:w-5 md:h-5"
                                />

                                <span
                                  title="SERP Date"
                                  class="whitespace-no-wrap align-middle"
                                  >{{
                                    article.date ? article.date : "N/A"
                                  }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          v-if="
                            article.questions.length ||
                            article.headers.length ||
                            article.headersContainingKeyword.length ||
                            article.headersContainingPartialKeyword.length
                          "
                          class="mt-5 rounded additional-info swing-in-top-fwd"
                          :class="{
                            hidden: !expandedArticles.includes(articleIndex),
                          }"
                        >
                          <div class="flex flex-wrap">
                            <HeaderQuestions
                              v-if="article.questions.length"
                              v-bind:articleData="article.questions"
                              title="Questions"
                            />

                            <HeaderQuestions
                              v-if="article.headers.length"
                              v-bind:articleData="article.headers"
                              title="Headers"
                            />

                            <HeaderQuestions
                              v-if="article.headersContainingKeyword.length"
                              v-bind:articleData="
                                article.headersContainingKeyword
                              "
                              title="Keyword Headers"
                            />

                            <HeaderQuestions
                              v-if="
                                article.headersContainingPartialKeyword.length
                              "
                              v-bind:articleData="
                                article.headersContainingPartialKeyword
                              "
                              title="Partial Keyword Headers"
                            />
                          </div>
                        </div>
                      </td>
                      <div class="absolute right-0 flex mt-1 text-gray-500">
                        <button
                          @click="deleteItem(articleIndex)"
                          class="p-1 transition duration-300 transform hover:text-red-600 hover:-translate-y-1"
                        >
                          <XCircleIcon class="w-6 h-6" />
                        </button>
                        <button
                          v-if="
                            article.questions.length ||
                            article.headers.length ||
                            article.headersContainingKeyword.length ||
                            article.headersContainingPartialKeyword.length
                          "
                          class="p-1 mr-2 transition duration-300 transform hover:-translate-y-1"
                          @click="onClickExpand(articleIndex)"
                          title="Expand Details"
                        >
                          <ChevronDownIcon
                            class="w-8 h-8 hover:text-indigo-600"
                          />
                        </button>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="p-5 bg-gray-200 rounded">
          <h2 class="pt-2 mb-2 text-2xl text-gray-800 lg:mb-0">
            Blueprint Tool
          </h2>
          <p>
            Load these results into the blueprint tool to help you write, or to
            give to your writers for a more concise plan.
          </p>
          <div class="my-5">
            <router-link
              to="/blueprint"
              tag="button"
              class="flex items-center self-center flex-initial h-16 px-4 font-semibold text-gray-100 duration-150 bg-gray-500 rounded-lg shadow focus:outline-none"
            >
              <span>Load Into Blueprint Tool</span>
              <CubeTransparentIcon class="w-6 h-6 ml-2 text-gray-100" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <ErrorMessage
      class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded alert swing-in-top-fwd"
      v-if="error && loading != true"
      v-bind:message="errorMessage"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import LoadingSpinner from "@/components/LoadingSpinner";
import BetaMessage from "@/components/BetaMessage";
import ErrorMessage from "@/components/ErrorMessage";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderQuestions from "@/components/HeaderQuestions";
var VueScrollTo = require("vue-scrollto");
import {
  CubeTransparentIcon,
  ChevronDownIcon,
  AnnotationIcon,
  NewspaperIcon,
  PhotographIcon,
  XCircleIcon,
  TemplateIcon,
  ShieldCheckIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  ArrowCircleRightIcon,
} from "@vue-hero-icons/outline";

export default {
  computed: {
    ...mapState(["blueprintData"]),
  },
  components: {
    HeaderQuestions,
    LoadingSpinner,
    Breadcrumb,
    BetaMessage,
    ErrorMessage,
    XCircleIcon,
    CubeTransparentIcon,
    CheckIcon,
    ChevronDownIcon,
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
    TemplateIcon,
    ShieldCheckIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
    ArrowCircleRightIcon,
  },
  name: "AnalysisHome",
  data() {
    return {
      animatedSearchBtn: false,
      query: "best fishing rod for beginners",
      amount: 15,
      timeTaken: 0,
      idFromDb: "",
      device: "desktop",
      peopleAlsoAsk: true,
      fetchQuestions: true,
      domainAuthority: true,
      location: "United States",
      roundedTimeGuess: 0,
      timeStart: 0,
      apiResponse:
        Object.keys(store.getters.getBlueprint).length && this.error !== true
          ? store.getters.getBlueprint
          : [],
      error: false,
      errorMessage: "Something Went Wrong",
      loaded: Object.keys(store.getters.getBlueprint).length ? true : false,
      loading: false,
      expandedArticles: [],
      api_url:
        process.env.NODE_ENV === "production"
          ? "https://rubricseo-api.herokuapp.com/"
          : "http://localhost:3001/",
    };
  },
  methods: {
    onClickExpand(index) {
      if (this.expandedArticles.includes(index))
        this.expandedArticles = this.expandedArticles.filter(
          (i) => i !== index
        );
      else this.expandedArticles.push(index);
    },
    search: async function () {
      this.timeStart = performance.now();
      this.loading = true;
      try {
        let response = await fetch(
          `${this.api_url}generate?keyword=${this.query}&amount=${this.amount}&device=${this.device}&location=${this.location}&peopleAlsoAsk=${this.peopleAlsoAsk}&fetchQuestions=${this.fetchQuestions}&domainAuthority=${this.domainAuthority}`
        );
        let data = await response.json();
        if (data.error) {
          this.errorMessage = data.error.message;
          this.setLoading(false, false, true);
        } else {
          this.idFromDb = data.id;
          setTimeout(() => {
            this.retrieve(data.id);
          }, this.amount * 0.75 * 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    retrieve: async function (id, retry) {
      if (retry) {
        console.log("Data not ready - Retrying");
      }
      try {
        let response = await fetch(`${this.api_url}retrieve?id=${id}`);
        let data = await response.json();

        if (data.error) {
          if (data.error.message === "Data Not Ready [checkSerp.js - 36]") {
            setTimeout(() => {
              this.retrieve(id, (retry = true));
            }, 2500);
          } else {
            this.errorMessage = data.error.message;
            this.setLoading(false, false, true);
          }
        } else {
          this.apiResponse = data[0];
          this.$store.dispatch("addBluePrintData", data[0]);
          this.setLoading(true, false, false);
          this.idFromDb = "";
          this.$nextTick(() =>
            VueScrollTo.scrollTo("#results", { offset: -90 })
          );
          this.timeTaken = Math.round(
            (performance.now() - this.timeStart) / 1000
          );
        }
      } catch (err) {
        this.errorMessage = "Something went wrong!";
      }
    },
    animateSearchBtn() {
      this.animatedSearchBtn = true;
    },
    expandDetails() {},
    setLoading(loaded, loading, error) {
      this.loaded = loaded;
      this.loading = loading;
      this.error = error;
    },
    deleteItem(index) {
      // this.$delete(this.items, index);
      this.apiResponse.results.splice(index, 1);
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