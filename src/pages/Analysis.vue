<template>
  <div id="analysis">
    <!-- breadcrumb -->
    <!-- <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
      <ol class="inline-flex p-0 list-none">
        <li class="flex items-center text-purple">
          <a href="/" class="text-gray-700">Home</a>
          <svg
            class="w-3 h-3 mx-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            />
          </svg>
        </li>
        <li class="flex items-center">
          <a href="/dashboard" class="text-gray-600">SERP Analysis</a>
        </li>
      </ol>
    </nav> -->
    <!-- breadcrumb end -->
    <div
      class="flex flex-row items-center p-5 mb-8 bg-blue-200 border-b-2 border-blue-300 rounded alert"
    >
      <div
        class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 border-2 border-blue-500 rounded-full alert-icon"
      >
        <span class="text-blue-500">
          <InformationCircleIcon class="w-6 h-6" />
        </span>
      </div>
      <div class="ml-4 alert-content">
        <div class="text-lg font-semibold text-blue-800 alert-title">Info</div>
        <div class="text-sm text-blue-600 alert-description">
          Hey! Thanks for looking at Rubric! It is still in the very early
          stages of development & I would really appreciate your feedback on the
          project, and naturally, stuff may break or may not even work at all
          yet! Thanks.
        </div>
      </div>
    </div>

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
                <strong> {{ Math.round(this.amount * 0.75 + 5) }}</strong>
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
        <!--this.retrieve(data.id); .-->
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

        <!-- Cards -->

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

            <div class="w-full">
              <div
                :key="question.id"
                v-for="(question, index) in apiResponse.relatedQuestions"
                class="flex items-center justify-between w-full px-4 py-2 bg-gray-100 border rounded-lg"
                :class="{
                  'mt-2': index == apiResponse.relatedQuestions.length - 1,
                  'my-2': index != apiResponse.relatedQuestions.length - 1,
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
                              class="mb-1 mr-8 text-lg font-medium leading-5 text-gray-900"
                            >
                              {{ article.title }}
                            </div>

                            <div class="text-sm leading-5 text-gray-500">
                              <a
                                :href="article.url"
                                target="_blank"
                                class="break-all"
                                >{{ article.url }}</a
                              >
                            </div>
                            <div class="flex flex-wrap mt-2">
                              <div
                                class="flex flex-no-wrap items-center mr-4 text-gray-600"
                              >
                                <AnnotationIcon
                                  class="inline w-5 h-5 mr-1 align-middle"
                                />

                                <span
                                  title="Word Count"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.wordCount }} Words</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-gray-600"
                              >
                                <NewspaperIcon
                                  class="inline w-5 h-5 mr-1 align-middle"
                                />

                                <span
                                  title="Header Count"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.headers.length }} Headers</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-gray-600"
                              >
                                <PhotographIcon
                                  class="inline w-5 h-5 mr-1 align-middle"
                                />

                                <span
                                  title="Image Count"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.imageCount }} Images</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-gray-600"
                              >
                                <TemplateIcon
                                  class="inline w-5 h-5 mr-1 align-middle"
                                />

                                <span
                                  title="Paragraph Count"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.paragraphCount }} Paragraphs</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-gray-600"
                              >
                                <ShieldCheckIcon
                                  class="inline w-5 h-5 mr-1 align-middle"
                                />

                                <span
                                  title="Domain Authority"
                                  class="whitespace-no-wrap align-middle"
                                  >{{ article.domainAuthority }} Domain
                                  Authority</span
                                >
                              </div>

                              <div
                                class="flex flex-no-wrap items-center mr-4 text-gray-600"
                              >
                                <QuestionMarkCircleIcon
                                  class="inline w-5 h-5 mr-1 align-middle"
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
                                class="flex flex-no-wrap items-center mr-4 text-gray-600"
                              >
                                <CalendarIcon
                                  class="inline w-5 h-5 mr-1 align-middle"
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
                          <div class="flex-wrap w-full md:flex">
                            <div
                              class="flex-grow px-4 py-3 mt-2 bg-gray-100 border rounded lg:mx-1"
                              v-if="article.questions.length"
                            >
                              <h3 class="font-bold text-gray-700 text-md">
                                Questions Answered
                              </h3>
                              <ol>
                                <li
                                  :key="question.id"
                                  v-for="question in article.questions"
                                  class="text-gray-700"
                                >
                                  - {{ question }}
                                </li>
                              </ol>
                            </div>

                            <div
                              class="flex-grow px-4 py-3 mt-2 bg-gray-100 border rounded lg:mx-1"
                            >
                              <h3 class="font-bold text-gray-700 text-md">
                                Headers
                              </h3>
                              <ol>
                                <li
                                  :key="header.id"
                                  v-for="header in article.headers"
                                  class="text-gray-700"
                                >
                                  - {{ header }}
                                </li>
                              </ol>
                            </div>

                            <div
                              class="flex-grow px-4 py-3 mt-2 bg-gray-100 border rounded lg:mx-1"
                              v-if="article.headersContainingKeyword.length"
                            >
                              <h3 class="font-bold text-gray-700 text-md">
                                Headers containing full keyword
                              </h3>
                              <ol>
                                <li
                                  :key="fullHeader.id"
                                  v-for="fullHeader in article.headersContainingKeyword"
                                  class="text-gray-700"
                                >
                                  - {{ fullHeader }}
                                </li>
                              </ol>
                            </div>

                            <div
                              class="flex-grow px-4 py-3 mt-2 bg-gray-100 border rounded lg:mx-1"
                              v-if="
                                article.headersContainingPartialKeyword.length
                              "
                            >
                              <h3 class="font-bold text-gray-700 text-md">
                                Headers containing partial keyword
                              </h3>
                              <ol>
                                <li
                                  :key="partialHeader.id"
                                  class="text-gray-700"
                                  v-for="partialHeader in article.headersContainingPartialKeyword"
                                >
                                  - {{ partialHeader }}
                                </li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </td>
                      <span
                        v-if="
                          article.questions.length ||
                          article.headers.length ||
                          article.headersContainingKeyword.length ||
                          article.headersContainingPartialKeyword.length
                        "
                        class="absolute right-0 p-2 mt-2 mr-2 text-xs font-semibold text-gray-500 transition duration-300 transform border-gray-300 rounded-md cursor-pointer hover:-translate-y-1"
                        @click="onClickExpand(articleIndex)"
                        title="Expand Details"
                      >
                        <ChevronDownIcon class="w-8 h-8" />
                      </span>
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
    <div
      class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded alert swing-in-top-fwd"
      v-if="error && loading != true"
    >
      <div
        class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 border-2 border-red-500 rounded-full alert-icon"
      >
        <span class="text-red-500">
          <XIcon class="w-6 h-6" />
        </span>
      </div>
      <div class="ml-4 alert-content">
        <div class="text-lg font-semibold text-red-800 alert-title">Whoops</div>
        <div class="text-sm text-red-600 alert-description">
          {{ errorMessage }}
          <EmojiSadIcon class="inline w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  XIcon,
  EmojiSadIcon,
  CubeTransparentIcon,
  ChevronDownIcon,
  AnnotationIcon,
  NewspaperIcon,
  PhotographIcon,
  TemplateIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  ArrowCircleRightIcon,
  InformationCircleIcon,
} from "@vue-hero-icons/outline";
var VueScrollTo = require("vue-scrollto");

let api_url = "";
if (process.env.NODE_ENV === "production") {
  api_url = "https://rubricseo-api.herokuapp.com/";
} else {
  api_url = "http://localhost:3001/";
}

export default {
  computed: {
    ...mapState(["blueprintData"]),
  },
  components: {
    LoadingSpinner,
    XIcon,
    EmojiSadIcon,
    CubeTransparentIcon,
    ChevronDownIcon,
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
    TemplateIcon,
    ShieldCheckIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
    ArrowCircleRightIcon,
    InformationCircleIcon,
  },
  name: "AnalysisHome",
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
          `${api_url}serp-results?keyword=${this.query}&amount=${this.amount}&device=${this.device}&location=${this.location}`
        );
        let data = await response.json();
        if (data.error) {
          this.errorMessage = data.error.message;
          this.loaded = false;
          this.loading = false;
          this.error = true;
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
        let response = await fetch(`${api_url}check-serp?id=${id}`);
        let data = await response.json();

        if (data.error) {
          if ((data.error.message = "Data Not Ready [checkSerp.js - 36]")) {
            setTimeout(() => {
              this.retrieve(id, (retry = true));
            }, 2500);
          } else {
            this.errorMessage = data.error.message;
            this.loaded = false;
            this.loading = false;
            this.error = true;
          }
        } else {
          this.apiResponse = data[0];
          this.$store.dispatch("addBluePrintData", data[0]);
          this.loaded = true;
          this.loading = false;
          this.error = false;
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
  },
  data() {
    return {
      animatedSearchBtn: false,
      query: "best fishing rod for beginners",
      amount: 15,
      timeTaken: 0,
      idFromDb: "",
      device: "desktop",
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
    };
  },
  mounted() {},
};
</script>

<style lang="css" scoped>
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