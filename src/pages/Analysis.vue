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

    <div class="items-center mb-6">
      <h1 class="mb-3 text-3xl font-semibold text-gray-800 lg:mb-0">
        SERP Analysis
      </h1>
      <p>Find out who is ranking and why for any given search result.</p>
      <!-- <button
        class="px-6 py-2 font-semibold text-white duration-150 rounded-lg shadow bg-purple hover:bg-purple-light focus:outline-none"
      >
        View Logs
      </button> -->
      <hr class="mt-2" />
    </div>

    <div class="p-5 bg-gray-200 rounded">
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
            class="flex items-center self-center flex-grow w-full h-16 px-4 mb-2 font-semibold text-white duration-150 rounded-lg sm:w-auto bg-purple hover:bg-purple-light focus:outline-none whitespace-nowrap"
          >
            <div class="flex ml-auto mr-auto">
              <span v-if="!loading" class="whitespace-no-wrap"
                >Start Analysis</span
              >
              <span v-if="loading" class="whitespace-no-wrap"
                >Crunching Data</span
              >
              <svg
                v-if="!loading"
                class="w-6 h-6 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <img
                v-if="loading"
                class="w-6 h-6 ml-2 mr-5"
                src="/img/three-dots.svg"
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
                name="cars"
                id="cars"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="w-6 h-6 fill-current"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  ></path>
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="w-6 h-6 fill-current"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  ></path>
                </svg>
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
                <span v-if="this.amount <= 20"
                  ><strong>20 seconds</strong></span
                >
                <span v-if="this.amount > 20 && this.amount <= 30"
                  ><strong>30 seconds</strong></span
                >
                <span v-if="this.amount > 30 && this.amount <= 50"
                  ><strong>50 seconds</strong></span
                >
                <span v-if="this.amount > 50"><strong>a minute</strong></span>
                to fetch.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="flex justify-center my-20 text-purple-900" v-if="loading">
      <svg
        width="120"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current"
      >
        <circle cx="15" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity=".3">
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from=".5"
            to=".5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>

    <div
      class="mt-5 slide-in-bottom"
      v-if="loaded && !loading && !apiResponse.errorFromApi"
    >
      <h2 class="pt-2 mb-2 text-2xl font-semibold text-gray-800 lg:mb-0">
        Results
      </h2>
      <p class="mb-2 text-gray-800 font text-1xl lg:mb-0">
        Your search for <strong>{{ apiResponse.searchTerm }}</strong> had
        <strong>{{ apiResponse.totalResults }}</strong> results, across
        <strong>{{ apiResponse.uniqueDomainCount }}</strong> unique domains and
        took <strong>{{ apiResponse.timeTaken }}</strong> seconds! Here are the
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
          <p class="mb-4 text-xl font-semibold text-gray-700">Average Values</p>
          <div
            :class="{
              'md:flex-col md:flex-no-wrap': apiResponse.relatedQuestions,
              '': !apiResponse.relatedQuestions,
            }"
            class="flex flex-wrap -mx-3 md:mx-0 md:justify-between md:h-full"
          >
            <div
              :class="{
                'md:px-0 md:w-full': apiResponse.relatedQuestions,
                '': !apiResponse.relatedQuestions,
              }"
              class="w-1/2 px-3 mb-2"
            >
              <div
                class="flex items-center p-0 mb-6 bg-white border rounded-lg md:mb-0"
              >
                <div
                  class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-pink"
                >
                  <svg
                    class="hidden w-8 h-8 mx-auto lg:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </div>

                <div class="ml-6 leading-6 text-gray-700">
                  <p class="text-2xl font-semibold">
                    {{ apiResponse.averageWordCount }}
                  </p>
                  <p class="text-sm text-gray-600">Average Words</p>
                </div>
              </div>
            </div>
            <div
              :class="{
                'md:px-0 md:w-full': apiResponse.relatedQuestions,
                '': !apiResponse.relatedQuestions,
              }"
              class="w-1/2 px-3 mb-2"
            >
              <div
                class="flex items-center p-0 mb-6 bg-white border rounded-lg md:mb-0"
              >
                <div
                  class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-purple"
                >
                  <svg
                    class="hidden w-8 h-8 mx-auto lg:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    ></path>
                  </svg>
                </div>

                <div class="ml-6 leading-6 text-gray-700">
                  <p class="text-2xl font-semibold">
                    {{ apiResponse.averageHeaderCount }}
                  </p>
                  <p class="text-sm text-gray-600">Average Headers</p>
                </div>
              </div>
            </div>
            <div
              :class="{
                'md:px-0 md:w-full': apiResponse.relatedQuestions,
                '': !apiResponse.relatedQuestions,
              }"
              class="w-1/2 px-3 mb-2"
            >
              <div
                class="flex items-center p-0 mb-6 bg-white border rounded-lg md:mb-0"
              >
                <div
                  class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-orange"
                >
                  <svg
                    class="hidden w-8 h-8 mx-auto lg:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>

                <div class="ml-6 leading-6 text-gray-700">
                  <p class="text-2xl font-semibold">
                    {{ apiResponse.averageImagesCount }}
                  </p>
                  <p class="text-sm text-gray-600">Average Images</p>
                </div>
              </div>
            </div>
            <div
              :class="{
                'md:px-0 md:w-full': apiResponse.relatedQuestions,
                '': !apiResponse.relatedQuestions,
              }"
              class="w-1/2 px-3 mb-2"
            >
              <div
                class="flex items-center p-0 mb-6 bg-white border rounded-lg md:mb-0"
              >
                <div
                  class="px-3 py-10 text-white rounded-l-lg lg:px-5 lg:py-5 bg-green"
                >
                  <svg
                    class="hidden w-8 h-8 mx-auto lg:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    ></path>
                  </svg>
                </div>

                <div class="ml-6 leading-6 text-gray-700">
                  <p class="text-2xl font-semibold">
                    {{ apiResponse.averageParagraphCount }}
                  </p>
                  <p class="text-sm text-gray-600">Average Paragraphs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="apiResponse.relatedQuestions"
          class="order-last w-full xl:w-2/3 md:mt-0"
        >
          <p class="mb-4 text-xl font-semibold text-gray-700">
            People Also Ask
          </p>

          <div class="w-full p-4 bg-white border rounded-lg">
            <div
              :key="question.id"
              v-for="question in apiResponse.relatedQuestions"
              class="flex items-center justify-between w-full px-4 py-2 my-2 bg-gray-100 border rounded-lg"
            >
              <div>
                <p class="text-base font-semibold text-gray-700">
                  {{ question.question }}
                </p>
                <p class="text-sm text-gray-700">{{ question.title }}</p>
                <a
                  target="_blank"
                  :href="question.link"
                  class="text-sm text-gray-700"
                  >{{ question.link }}</a
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
                              <svg
                                class="inline w-5 h-5 mr-1 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                ></path>
                              </svg>

                              <span
                                title="Word Count"
                                class="whitespace-no-wrap align-middle"
                                >{{ article.wordCount }} Words</span
                              >
                            </div>

                            <div
                              class="flex flex-no-wrap items-center mr-4 text-gray-600"
                            >
                              <svg
                                class="inline w-5 h-5 mr-1 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                ></path>
                              </svg>

                              <span
                                title="Header Count"
                                class="whitespace-no-wrap align-middle"
                                >{{ article.headerCount }} Headers</span
                              >
                            </div>

                            <div
                              class="flex flex-no-wrap items-center mr-4 text-gray-600"
                            >
                              <svg
                                class="inline w-5 h-5 mr-1 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>

                              <span
                                title="Image Count"
                                class="whitespace-no-wrap align-middle"
                                >{{ article.imageCount }} Images</span
                              >
                            </div>

                            <div
                              class="flex flex-no-wrap items-center mr-4 text-gray-600"
                            >
                              <svg
                                class="inline w-5 h-5 mr-1 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                ></path>
                              </svg>

                              <span
                                title="Paragraph Count"
                                class="whitespace-no-wrap align-middle"
                                >{{ article.paragraphCount }} Paragraphs</span
                              >
                            </div>

                            <div
                              class="flex flex-no-wrap items-center mr-4 text-gray-600"
                            >
                              <svg
                                class="inline w-5 h-5 mr-1 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                ></path>
                              </svg>

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
                              <svg
                                class="inline w-5 h-5 mr-1 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              <span
                                title="Domain Authority"
                                class="whitespace-no-wrap align-middle"
                                >{{ article.questions.length }} Questions</span
                              >
                            </div>

                            <div
                              class="flex flex-no-wrap items-center mr-4 text-gray-600"
                            >
                              <svg
                                class="inline w-5 h-5 mr-1 align-middle"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>

                              <span
                                title="SERP Date"
                                class="whitespace-no-wrap align-middle"
                                >{{ article.date ? article.date : "N/A" }}</span
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
                        class="p-2 mt-3 bg-gray-200 rounded additional-info swing-in-top-fwd"
                        :class="{
                          hidden: !expandedArticles.includes(articleIndex),
                        }"
                      >
                        <div class="flex-wrap w-full md:flex">
                          <div
                            class="flex-grow p-8 mt-2 bg-gray-100 border rounded"
                            v-if="article.questions.length"
                          >
                            <h3 class="mt-2 font-bold text-md">
                              Questions Answered
                            </h3>
                            <ol>
                              <li
                                :key="question.id"
                                v-for="question in article.questions"
                              >
                                - {{ question }}
                              </li>
                            </ol>
                          </div>

                          <div
                            class="flex-grow p-8 mt-2 bg-gray-100 border rounded"
                          >
                            <h3 class="mt-2 font-bold text-md">Headers</h3>
                            <ol>
                              <li
                                :key="header.id"
                                v-for="header in article.headers"
                              >
                                - {{ header }}
                              </li>
                            </ol>
                          </div>
                          <!-- </div>
                        <div class="justify-between w-full md:flex"> -->
                          <div
                            class="flex-grow p-8 mt-2 bg-gray-100 border rounded"
                            v-if="article.headersContainingKeyword.length"
                          >
                            <h3 class="mt-2 font-bold text-md">
                              Headers containing full keyword
                            </h3>
                            <ol>
                              <li
                                :key="fullHeader.id"
                                v-for="fullHeader in article.headersContainingKeyword"
                              >
                                - {{ fullHeader }}
                              </li>
                            </ol>
                          </div>

                          <div
                            class="flex-grow p-8 mt-2 bg-gray-100 border rounded"
                            v-if="
                              article.headersContainingPartialKeyword.length
                            "
                          >
                            <h3 class="mt-2 font-bold text-md">
                              Headers containing partial keyword
                            </h3>
                            <ol>
                              <li
                                :key="partialHeader.id"
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
                      <svg
                        class="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
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
          Blueprint Tool (Coming Soon)
        </h2>
        <p>
          Load these results into the blueprint tool to help you write, or to
          give to your writers for a more concise plan.
        </p>
        <div class="my-5">
          <button
            type="submit"
            disabled
            class="flex items-center self-center h-16 px-4 font-semibold text-gray-700 duration-150 bg-gray-500 rounded-lg shadow cursor-not-allowed focus:outline-none"
          >
            <span>Load Into Blueprint Tool</span>
            <svg
              class="w-6 h-6 ml-2 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
            <img
              v-if="loading"
              class="w-5 h-5 mx-auto ml-2"
              src="/img/three-dots.svg"
            />
          </button>
        </div>
      </div>

      <!-- charts -->
      <!-- <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 xl:w-1/3">
          <p class="mb-4 text-xl font-semibold text-gray-700">Recent Sales</p>

          <div class="w-full p-4 mb-8 bg-white border rounded-lg xl:mb-0">
            <canvas id="buyers-chart" width="600" height="400"></canvas>
          </div>
        </div>

        <div class="w-full px-3 xl:w-1/3">
          <p class="mb-4 text-xl font-semibold text-gray-700">Recent Reviews</p>

          <div class="w-full p-4 mb-8 bg-white border rounded-lg xl:mb-0">
            <canvas id="reviews-chart" width="600" height="400"></canvas>
          </div>
        </div>
      </div> -->
    </div>
    <div
      class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded alert swing-in-top-fwd"
      v-if="error && loading != true"
    >
      <div
        class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 border-2 border-red-500 rounded-full alert-icon"
      >
        <span class="text-red-500">
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div class="ml-4 alert-content">
        <div class="text-lg font-semibold text-red-800 alert-title">Whoops</div>
        <div class="text-sm text-red-600 alert-description">
          {{ errorMessage }}
          <svg
            class="inline w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Chart from "chart.js";

export default {
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
      this.loading = true;
      try {
        console.log("Fetching Initiated");
        return fetch(
          `https://rubricseo-api.herokuapp.com/serp-results?keyword=${this.query}&amount=${this.amount}&device=${this.device}&location=${this.location}`,
          {}
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              this.errorMessage = data.error.message;
              this.loaded = false;
              this.loading = false;
              this.error = true;
            } else {
              this.apiResponse = data;
              this.loaded = true;
              this.loading = false;
              this.error = false;
            }
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;
            this.errorMessage = error.message + ". Are you connected?";
          });
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
      device: "desktop",
      location: "United States",
      apiResponse: "",
      error: false,
      errorMessage: "Something Went Wrong",
      loaded: false,
      loading: false,
      expandedArticles: [],
      // buyersData: {
      //   type: "line",
      //   data: {
      //     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //     datasets: [
      //       {
      //         backgroundColor: "rgba(70,20,237,0.4)",
      //         strokeColor: "#63b3ed",
      //         pointColor: "#fff",
      //         pointStrokeColor: "#63b3ed",
      //         data: [203, 156, 99, 251, 305, 247, 256],
      //       },
      //       {
      //         backgroundColor: "rgba(60,60,248,0.4)",
      //         strokeColor: "#f7fafc",
      //         pointColor: "#fff",
      //         pointStrokeColor: "#f7fafc",
      //         data: [86, 97, 144, 114, 94, 108, 156],
      //       },
      //     ],
      //   },
      //   options: {
      //     legend: {
      //       display: false,
      //     },
      //     scales: {
      //       yAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //           ticks: {
      //             display: false,
      //           },
      //         },
      //       ],
      //       xAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // },
      // reviewsData: {
      //   type: "bar",
      //   data: {
      //     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //     datasets: [
      //       {
      //         backgroundColor: "rgba(40,100,255,0.8)",
      //         strokeColor: "#63b3ed",
      //         pointColor: "#fff",
      //         pointStrokeColor: "#63b3ed",
      //         data: [203, 156, 99, 251, 305, 247, 256],
      //       },
      //     ],
      //   },
      //   options: {
      //     legend: {
      //       display: false,
      //     },
      //     scales: {
      //       yAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //           ticks: {
      //             display: false,
      //           },
      //         },
      //       ],
      //       xAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // },
    };
  },
  mounted() {
    //new Chart(document.getElementById("buyers-chart"), this.buyersData);
    //new Chart(document.getElementById("reviews-chart"), this.reviewsData);
  },
};
</script>

<style lang="css" scoped>
.slide-in-bottom {
  -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-13 18:18:31
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-bottom
 * ----------------------------------------
 */
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

/* ----------------------------------------------
 * Generated by Animista on 2021-2-14 0:0:16
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation bounce-top
 * ----------------------------------------
 */
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

/* ----------------------------------------------
 * Generated by Animista on 2021-2-14 12:25:8
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-top
 * ----------------------------------------
 */
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

/* ----------------------------------------------
 * Generated by Animista on 2021-2-14 17:17:5
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation swing-in-top-fwd
 * ----------------------------------------
 */
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

/* ----------------------------------------------
 * Generated by Animista on 2021-2-15 19:10:22
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation swing-in-top-fwd
 * ----------------------------------------
 */
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