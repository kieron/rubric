<template>
  <div id="analysis">
    <!-- breadcrumb -->
    <!-- <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-purple">
          <a href="/" class="text-gray-700">Home</a>
          <svg
            class="fill-current w-3 h-3 mx-3"
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
      <h1 class="text-3xl font-semibold mb-3 lg:mb-0 text-gray-800">
        SERP Analysis
      </h1>
      <p>Find out who is ranking and why for any given search result.</p>
      <!-- <button
        class="bg-purple hover:bg-purple-light focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow duration-150"
      >
        View Logs
      </button> -->
      <hr class="mt-2" />
    </div>

    <div class="bg-gray-200 p-5 rounded">
      <h2 class="text-2xl pt-2 mb-2 lg:mb-0 text-gray-800">
        Search Parameters
      </h2>
      <p class="text-gray-600">
        Simply input your article phrase below. This can take up to a minute for
        larger result sets.
      </p>
      <form v-on:submit.prevent="search" class="my-5">
        <div class="sm:flex mb-5">
          <input
            type="text"
            v-model="query"
            placeholder="Keywords"
            required
            class="bg-white mb-2 h-16 w-full px-6 rounded-lg border flex focus:outline-none flex-grow mr-2"
          />
          <button
            type="submit"
            class="flex items-center w-full sm:w-auto h-16 bg-purple hover:bg-purple-light focus:outline-none rounded-lg px-4 text-white font-semibold duration-150 self-center mb-2 flex-grow whitespace-nowrap"
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
        <hr class="mb-2" />
        <div class="">
          <p class="mb-2 text-gray-600">Optional Parameters</p>
          <div class="sm:flex sm:justify-between">
            <select
              class="bg-white h-10 w-full sm:w-1/3 rounded-lg px-3 border text-sm focus:outline-none"
              name="cars"
              id="cars"
              required
              v-model="location"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
            </select>
            <select
              class="bg-white h-10 w-full sm:w-1/3 rounded-lg px-3 border text-sm focus:outline-none my-2 sm:my-0 mx-0 sm:mx-2"
              name="device"
              id="device"
              required
              v-model="device"
            >
              <option selected value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
            </select>

            <input
              class="bg-white h-10 w-full sm:w-1/3 rounded-lg px-3 border text-sm focus:outline-none"
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Amount"
              min="10"
              required
              max="100"
              v-model="amount"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="mt-5 slide-in-bottom" v-if="loaded && !loading">
      <h2 class="text-2xl pt-2 mb-2 lg:mb-0 text-gray-800">Results</h2>
      <p class="text-1xl font-semibold mb-2 lg:mb-0 text-gray-800">
        Your search for {{ articles.searchTerm }} had
        {{ articles.totalResults }} results, and took
        {{ articles.timeTaken }} seconds! Here are the results.
      </p>

      <!-- Cards -->
      <div class="flex flex-wrap -mx-3 mb-6 mt-5">
        <div class="w-1/2 xl:w-1/4 px-3">
          <div
            class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0"
          >
            <div
              class="px-3 py-10 lg:px-5 lg:py-5 bg-pink text-white rounded-l-lg"
            >
              <svg
                class="w-8 h-8 fill-current mx-auto hidden lg:block"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                ></path>
              </svg>
            </div>

            <div class="text-gray-700 ml-6 leading-6">
              <p class="font-semibold text-2xl">
                {{ articles.averageWordCount }}
              </p>
              <p class="text-sm text-gray-600">Average Words</p>
            </div>
          </div>
        </div>

        <div class="w-1/2 xl:w-1/4 px-3">
          <div
            class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0"
          >
            <div
              class="px-3 py-10 lg:px-5 lg:py-5 bg-purple text-white rounded-l-lg"
            >
              <svg
                class="w-8 h-8 fill-current mx-auto hidden lg:block"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                ></path>
              </svg>
            </div>

            <div class="text-gray-700 ml-6 leading-6">
              <p class="font-semibold text-2xl">
                {{ articles.averageHeaderCount }}
              </p>
              <p class="text-sm text-gray-600">Average Headers</p>
            </div>
          </div>
        </div>

        <div class="w-1/2 xl:w-1/4 px-3">
          <div
            class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0"
          >
            <div
              class="px-3 py-10 lg:px-5 lg:py-5 bg-orange text-white rounded-l-lg"
            >
              <svg
                class="w-8 h-8 fill-current mx-auto hidden lg:block"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                ></path>
              </svg>
            </div>

            <div class="text-gray-700 ml-6 leading-6">
              <p class="font-semibold text-2xl">
                {{ articles.averageImagesCount }}
              </p>
              <p class="text-sm text-gray-600">Average Images</p>
            </div>
          </div>
        </div>

        <div class="w-1/2 xl:w-1/4 px-3">
          <div
            class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0"
          >
            <div
              class="px-3 py-10 lg:px-5 lg:py-5 bg-green text-white rounded-l-lg"
            >
              <svg
                class="w-8 h-8 fill-current mx-auto hidden lg:block"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                ></path>
              </svg>
            </div>

            <div class="text-gray-700 ml-6 leading-6">
              <p class="font-semibold text-2xl">
                {{ articles.averageParagraphCount }}
              </p>
              <p class="text-sm text-gray-600">Average Paragraphs</p>
            </div>
          </div>
        </div>
      </div>

      <!-- table -->
      <div
        class="flex flex-col mb-12 bg-gray-25 rounded-md border border-gray-300"
      >
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div class="overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Results
                    </th>

                    <th
                      class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Domain Authority
                    </th>
                    <!-- <th
                      class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Domain Authority
                    </th> -->
                    <!-- <th class="px-6 py-3 bg-gray-50"></th> -->
                  </tr>
                </thead>
                <tbody
                  class="bg-white divide-y divide-gray-200 border-t border-gray-300"
                >
                  <tr
                    :key="article.id"
                    v-for="article in articles.results"
                    class="border-b border-gray-200"
                  >
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="flex items-center">
                        <!-- <div class="h-3 w-3 mr-2 rounded-full bg-green"></div> -->
                        <div class="">
                          <div
                            class="text-lg leading-5 font-medium text-gray-900 mb-1"
                          >
                            {{ article.title }}
                          </div>
                          <div class="text-sm leading-5 text-gray-500">
                            <a :href="article.url" target="_blank">{{
                              article.url
                            }}</a>
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
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap text-center">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-700"
                      >
                        {{ article.domainAuthority }}
                      </span>
                    </td>
                    <!-- <td
                      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                    >
                      <div class="flex overflow-hidden">
                        <img
                          class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
                          src="https://images.unsplash.com/flagged/photo-1565257669119-6af359b65ea2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                          alt=""
                        />
                        <img
                          class="-ml-1 inline-block h-8 w-8 rounded-full text-white shadow-solid"
                          src="https://images.unsplash.com/photo-1542909168-6296a31d7689?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                          alt=""
                        />
                        <img
                          class="-ml-1 inline-block h-8 w-8 rounded-full text-white shadow-solid"
                          src="https://images.unsplash.com/flagged/photo-1579500647742-5f34826ec327?ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80"
                          alt=""
                        />
                        <img
                          class="-ml-1 inline-block h-8 w-8 rounded-full text-white shadow-solid"
                          src="https://images.unsplash.com/photo-1571175351749-e8d06f275d85?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                          alt=""
                        />
                        <span
                          class="my-auto ml-2 text-xs font-semibold text-gray-500"
                          >+8</span
                        >
                      </div>
                    </td> -->
                    <!-- <td
                      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                    >
                      <a
                        href="#"
                        class="text-purple .hover:bg-purple-light duration-150"
                        >Editar</a
                      >
                    </td> -->
                  </tr>

                  <!-- More rows... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-200 p-5 rounded">
        <h2 class="text-2xl pt-2 mb-2 lg:mb-0 text-gray-800">
          Blueprint Tool (Coming Soon)
        </h2>
        <p>Load these results into the blueprint tool to help your writing.</p>
        <div class="my-5">
          <button
            type="submit"
            disabled
            class="flex items-center h-16 bg-gray-500 focus:outline-none rounded-lg px-4 text-gray-700 font-semibold shadow duration-150 self-center cursor-not-allowed"
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
              class="ml-2 h-5 w-5 mx-auto"
              src="/img/three-dots.svg"
            />
          </button>
        </div>
      </div>

      <!-- charts -->
      <!-- <div class="flex flex-wrap -mx-3">
      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4 text-gray-700">Recent Sales</p>

        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <canvas id="buyers-chart" width="600" height="400"></canvas>
        </div>
      </div>

      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4 text-gray-700">Recent Reviews</p>

        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <canvas id="reviews-chart" width="600" height="400"></canvas>
        </div>
      </div>

      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4 text-gray-700">
          Recent Transactions
        </p>
        <div class="w-full bg-white border rounded-lg p-4">
          <div
            class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4"
          >
            <div>
              <p class="font-semibold text-base text-gray-700">Jhon Doe</p>
              <p class="text-sm text-gray-700">Product XYZ-92</p>
            </div>
            <span class="text-green-600 font-semibold text-lg">$25.00</span>
          </div>

          <div
            class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4"
          >
            <div>
              <p class="font-semibold text-base text-gray-700">Malcom</p>
              <p class="text-sm text-gray-700">Product XYZ-92</p>
            </div>
            <span class="text-pink font-semibold text-lg">$74.99</span>
          </div>

          <div
            class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4"
          >
            <div>
              <p class="font-semibold text-base text-gray-700">Jhon Doe</p>
              <p class="text-sm text-gray-700">Product XYZ-92</p>
            </div>
            <span class="text-green-600 font-semibold text-lg">$182.00</span>
          </div>
        </div>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
//import Chart from "chart.js";

export default {
  name: "AnalysisHome",
  methods: {
    search: async function () {
      this.loading = true;
      console.log("Search Initiated");
      try {
        console.log("Fetching Initiated");
        return fetch(
          `http://localhost:3001?keyword=${this.query}&amount=${this.amount}&device=${this.device}&location=${this.location}`,
          {}
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.articles = data;
            this.loaded = true;
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });

        //   await fetch(`http://localhost:3001?keyword=${this.query}`, {})
        //     .then((response) => {
        //       console.log(response);
        //       console.log("Got Response");
        //       response.json();
        //     })
        //     .then((data) => {
        //       console.log("Got Data");
        //       console.log(data);
        //       this.articles = data.body;
        //     });
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      query: "",
      amount: 20,
      device: "desktop",
      location: "United States",
      articles: "",
      loaded: false,
      loading: false,
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
</style>