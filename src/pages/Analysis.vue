<template>
  <div id="analysis">
    <vue-topprogress ref="topProgress" color="#4f46e5"></vue-topprogress>

    <div id="animHolder" class="slide-in-right">
      <v-tour name="myTour" :steps="steps" :callbacks="tourComplete"></v-tour>
      <Breadcrumb />
      <BetaMessage />

      <div class="items-center mb-6">
        <h1
          class="mb-3 text-3xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
        >
          SERP Analysis
        </h1>
        <p class="text-gray-800 dark:text-gray-300">
          Find out who is ranking and why for any given search result.
        </p>
        <hr class="mt-2" />
      </div>

      <div class="p-5 rounded bg-gray-25 dark:bg-gray-700" v-if="!retrieving">
        <h2 class="pt-2 mb-2 text-2xl text-gray-800 dark:text-gray-300 lg:mb-0">
          Search Parameters
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Simply input your article phrase below. This can take up to a minute
          for larger result sets.
        </p>
        <!-- <form
          v-on:submit.prevent="retrieve('d50b268a56a01132c999f10e9ad53dfb')"
          class="pb-2 my-5"
        > -->
        <form v-on:submit.prevent="generate()" class="pb-2 my-5">
          <div class="mb-5 sm:flex">
            <input
              data-tour-step="1"
              type="text"
              v-model="search.query"
              placeholder="best fishing rod for beginners"
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
                  >Start Analysis</span
                >
                <span
                  v-if="loader.loading && search.idFromDb === ''"
                  class="whitespace-no-wrap"
                  >Fetching SERPs</span
                >
                <span
                  v-if="loader.loading && search.idFromDb !== ''"
                  class="whitespace-no-wrap"
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
          <div>
            <p class="text-gray-600 dark:text-gray-400">Optional Parameters</p>
            <p class="mb-3 text-sm text-gray-600 dark:text-gray-400">
              You don't need to set these, unless you really want too.
            </p>
            <div class="mb-3 sm:flex sm:justify-between">
              <div class="relative sm:w-1/4 sm:mr-2">
                <select
                  data-tour-step="2"
                  class="w-full h-16 px-3 text-sm bg-white border rounded-lg appearance-none  dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 focus:outline-none"
                  name="engine"
                  id="engine"
                  required
                  v-model="search.engine"
                >
                  <option value="google">Google</option>
                  <option value="bing">Bing</option>
                  <option value="yahoo">Yahoo</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 pointer-events-none "
                >
                  <ChevronDownIcon class="w-6 h-6" />
                </div>
              </div>
              <div class="relative sm:w-1/4 sm:mr-2">
                <select
                  data-tour-step="3"
                  class="w-full h-16 px-3 mt-2 text-sm bg-white border rounded-lg appearance-none  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 sm:mt-0 focus:outline-none"
                  name="location"
                  id="location"
                  required
                  v-model="search.location"
                >
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">
                    Cocos (Keeling) Islands
                  </option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo the Democratic Republic of the">
                    Congo the Democratic Republic of the
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'ivoire">Cote D'ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands (Malvinas)">
                    Falkland Islands (Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and Mcdonald Islands">
                    Heard Island and Mcdonald Islands
                  </option>
                  <option value="Holy See (Vatican City State)">
                    Holy See (Vatican City State)
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran Islamic Republic of">
                    Iran Islamic Republic of
                  </option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea Democratic People's Republic of">
                    Korea Democratic People's Republic of
                  </option>
                  <option value="Korea Republic of">Korea Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao People's Democratic Republic">
                    Lao People's Democratic Republic
                  </option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">
                    Libyan Arab Jamahiriya
                  </option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia the Former Yugosalv Republic of">
                    Macedonia the Former Yugosalv Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia Federated States of">
                    Micronesia Federated States of
                  </option>
                  <option value="Moldova Republic of">
                    Moldova Republic of
                  </option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">
                    Netherlands Antilles
                  </option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian Territory Occupied">
                    Palestinian Territory Occupied
                  </option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Pierre and Miquelon">
                    Saint Pierre and Miquelon
                  </option>
                  <option value="Saint Vincent and the Grenadines">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia and Montenegro">
                    Serbia and Montenegro
                  </option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and the South Sandwich Islands">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">
                    Svalbard and Jan Mayen
                  </option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">
                    Syrian Arab Republic
                  </option>
                  <option value="Taiwan Province of China">
                    Taiwan Province of China
                  </option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania United Republic of">
                    Tanzania United Republic of
                  </option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    United States Minor Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Virgin Islands British">
                    Virgin Islands British
                  </option>
                  <option value="Virgin Islands U.S.">
                    Virgin Islands U.S.
                  </option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 pointer-events-none "
                >
                  <ChevronDownIcon class="w-6 h-6" />
                </div>
              </div>
              <div class="relative sm:w-1/4 sm:mr-2">
                <select
                  data-tour-step="4"
                  class="w-full h-16 px-3 mx-0 mt-2 text-sm bg-white border rounded-lg appearance-none  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 sm:mt-0 focus:outline-none sm:my-0"
                  name="device"
                  id="device"
                  required
                  v-model="search.device"
                >
                  <option selected value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 pointer-events-none "
                >
                  <ChevronDownIcon class="w-6 h-6" />
                </div>
              </div>
              <div class="relative sm:w-1/4">
                <input
                  data-tour-step="5"
                  class="w-full h-16 px-3 mt-2 text-sm bg-white border rounded-lg  dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 sm:mt-0 focus:outline-none"
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Amount"
                  min="5"
                  required
                  max="100"
                  v-model="search.amount"
                />
              </div>
            </div>
            <p class="text-xs text-right text-gray-500 dark:text-gray-400">
              This amount of articles could take around
              <strong> {{ Math.round(this.search.amount / 3) }}</strong>
              seconds to fetch.
            </p>
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
            <router-link
              to="/blueprint"
              tag="button"
              class="hidden px-1 mr-2 duration-150 rounded-lg shadow  dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 w-7 h-7 lg:inline focus:outline-none"
              title="Load Into Blueprint Tool"
            >
              <CubeTransparentIcon
                class="block w-5 h-5 text-indigo-900 dark:text-indigo-200"
              /> </router-link
            >Results
          </h2>

          <p
            class="mb-2 text-gray-800 dark:text-gray-400 font text-1xl lg:mb-0"
          >
            Your search for <strong>{{ serpData.searchTerm }}</strong> had
            <strong>{{ serpData.totalResults || "many" }}</strong>
            results, we brought back
            <strong>{{ serpData.results.length }}</strong> of them. There are
            <strong>{{ serpData.uniqueDomainCount }}</strong> unique
            domains<span v-if="!search.timeStart">.</span>
            <span v-if="search.timeStart">
              and this search took
              <strong>{{ search.timeTaken }}</strong> seconds!</span
            >
            Here are the results.
          </p>

          <div class="my-4 md:my-8 md:flex">
            <div
              :class="{
                'md:w-1/2 md:mr-3 xl:w-1/3': serpData.relatedQuestions.length,
                'w-full': !serpData.relatedQuestions.length,
              }"
              class="flex flex-col"
              v-if="
                serpData.averageValues.averageWordCount.value ||
                serpData.averageValues.averageParagraphCount.value ||
                serpData.averageValues.averageImageCount.value ||
                serpData.averageValues.averageHeaderCount.value
              "
            >
              <p
                class="mb-4 text-xl font-semibold text-gray-700  dark:text-gray-400"
              >
                Average Values
              </p>
              <div
                :class="{
                  'md:flex-col md:flex-no-wrap': serpData.relatedQuestions,
                  '': !serpData.relatedQuestions,
                }"
                class="flex flex-wrap h-full -mx-3  md:flex-col md:mx-0 md:justify-between"
              >
                <div
                  v-for="(average, key, index) in serpData.averageValues"
                  v-bind:key="average.label"
                  :class="{
                    'md:px-0 md:w-full px-3': serpData.relatedQuestions,
                    'px-3 md:px-0 md:pr-1 xl:w-1/4': !serpData.relatedQuestions,
                    'mb-0':
                      index == Object.keys(serpData.averageValues).length - 1,
                    'mb-2':
                      index != Object.keys(serpData.averageValues).length - 1,
                  }"
                  class="w-1/2"
                >
                  <div
                    class="flex items-center p-0 bg-white border rounded-lg  dark:bg-gray-700 dark:border-gray-600"
                  >
                    <div
                      class="px-1 py-10 text-white rounded-l-lg  md:px-3 dark:text-gray-400 lg:px-5 lg:py-5 bg-pink"
                      :class="[average.bg]"
                    >
                      <component
                        :is="average.icon"
                        class="hidden w-8 h-8 mx-auto  lg:block dark:text-gray-300"
                      />
                    </div>

                    <div
                      class="ml-3 leading-6 text-gray-700  md:ml-6 dark:text-gray-300"
                    >
                      <p class="text-2xl font-semibold">
                        {{ average.value }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Average {{ average.label }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="serpData.relatedQuestions.length"
              class="flex flex-col flex-grow order-last w-full mt-5  xl:w-2/3 md:mt-0"
            >
              <p
                class="mb-4 text-xl font-semibold text-gray-700  dark:text-gray-400"
              >
                People Also Ask
              </p>

              <div class="flex flex-col justify-between h-full">
                <div
                  :key="question.id"
                  v-for="(question, index) in serpData.relatedQuestions"
                  class="items-center flex-grow px-4 py-2 bg-gray-100 border rounded-lg  dark:border-gray-600 dark:bg-gray-700"
                  :class="{
                    'mb-2': index != serpData.relatedQuestions.length - 1,
                  }"
                >
                  <div>
                    <p
                      class="text-base font-semibold text-gray-700  dark:text-gray-300"
                    >
                      {{ question.question }}
                    </p>
                    <p class="text-sm text-gray-700 dark:text-gray-400">
                      {{ question.source.title }}
                    </p>
                    <a
                      target="_blank"
                      :href="question.source.link"
                      class="text-sm text-gray-700 break-all dark:text-gray-400"
                      >{{ question.source.link }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex w-full md:my-5">
            <PopularQuestions
              v-if="serpData.popularHeaders"
              v-bind:data="serpData.popularHeaders"
              title="Popular Headers"
            />
          </div>
          <!-- table -->
          <div
            class="flex flex-col mt-5 mb-12 border border-gray-300 rounded-md  dark:border-gray-600 bg-gray-25 dark:bg-gray-700"
            v-if="serpData.results.length"
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
                          <span>Results</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white border-t border-gray-300 divide-y divide-gray-200  dark:border-gray-600 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <tr
                        :key="article.id"
                        v-for="(article, articleIndex) in serpData.results"
                        class="border-b border-gray-200 dark:border-gray-600"
                      >
                        <td class="px-3 py-3 md:px-6 md:py-4">
                          <div class="flex items-center">
                            <div class="">
                              <div
                                class="mb-1 mr-16 font-medium leading-5 text-gray-900  dark:text-gray-300 md:text-lg"
                              >
                                {{ article.title }}
                              </div>

                              <div
                                class="text-xs leading-5 text-gray-500  dark:text-gray-400 md:text-sm"
                              >
                                <a
                                  :href="article.url"
                                  target="_blank"
                                  class="break-all"
                                  >{{ article.url }}</a
                                >
                              </div>
                              <div class="flex flex-wrap mt-2">
                                <ResultCount
                                  icon="AnnotationIcon"
                                  v-bind:label="article.wordCount + ' Words'"
                                  hoverColour="hover:text-pink-700 dark:hover:text-pink-700"
                                  title="Word Count"
                                />

                                <ResultCount
                                  icon="NewspaperIcon"
                                  v-bind:label="
                                    article.headers.length + ' Headers'
                                  "
                                  hoverColour="hover:text-purple dark:hover:text-purple"
                                  title="Header Count"
                                />

                                <ResultCount
                                  icon="PhotographIcon"
                                  v-bind:label="article.imageCount + ' Images'"
                                  hoverColour="hover:text-orange dark:hover:text-orange"
                                  title="Image Count"
                                />

                                <ResultCount
                                  icon="TemplateIcon"
                                  v-bind:label="
                                    article.paragraphCount + ' Paragraphs'
                                  "
                                  hoverColour="hover:text-green-500 dark:hover:text-green-500"
                                  title="Paragraph Count"
                                />

                                <!-- <ResultCount
                                  icon="ShieldCheckIcon"
                                  v-bind:label="
                                    article.domainAuthority +
                                    ' Domain Authority'
                                  "
                                  hoverColour="hover:text-pink-700 dark:hover:text-pink-700"
                                  title="Domain Authority"
                                /> -->

                                <ResultCount
                                  icon="QuestionMarkCircleIcon"
                                  v-bind:label="
                                    article.questions.length + ' Questions'
                                  "
                                  hoverColour="hover:text-purple dark:hover:text-purple"
                                  title="Questions Answered"
                                />

                                <ResultCount
                                  icon="CalendarIcon"
                                  v-bind:label="
                                    article.date ? article.date : 'N/A'
                                  "
                                  hoverColour="hover:text-orange dark:hover:text-orange"
                                  title="SERP Date"
                                />
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
                            class="mt-5 rounded  additional-info swing-in-top-fwd"
                            :class="{
                              hidden:
                                !serpData.expandedArticles.includes(
                                  articleIndex
                                ),
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
                            title="Delete Item"
                            @click="deleteItem(articleIndex)"
                            class="p-1 transition duration-300 transform  hover:text-red-600 hover:-translate-y-1"
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
                            class="p-1 mr-2 transition duration-300 transform  hover:-translate-y-1"
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

          <div class="p-5 bg-gray-200 rounded dark:bg-gray-600">
            <h2
              class="pt-2 mb-2 text-2xl text-gray-800  dark:text-gray-300 lg:mb-0"
            >
              Blueprint Tool
            </h2>
            <p class="dark:text-gray-400">
              Load this data into the blueprint tool to help you write, or to
              give to your writers for a more concise plan.
            </p>
            <div class="my-5">
              <router-link
                to="/blueprint"
                tag="button"
                class="flex items-center self-center flex-initial h-16 px-4 font-semibold text-gray-100 duration-150 bg-gray-500 rounded-lg shadow  focus:outline-none"
              >
                <span>Load Into Blueprint Tool</span>
                <CubeTransparentIcon class="w-6 h-6 ml-2 text-gray-100" />
              </router-link>
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
import VueTour from "vue-tour";
import Vue from "vue";
import "vue-tour/dist/vue-tour.css";
import { mapState } from "vuex";
import store from "../store";
import LoadingSpinner from "@/components/LoadingSpinner";
import BetaMessage from "@/components/BetaMessage";
import ErrorMessage from "@/components/ErrorMessage";
import Breadcrumb from "@/components/Breadcrumb";
import PopularQuestions from "@/components/PopularQuestions";
import HeaderQuestions from "@/components/HeaderQuestions";
import ResultCount from "@/components/ResultCount";
var VueScrollTo = require("vue-scrollto");
import { vueTopprogress } from "vue-top-progress";
import config from "../../config";

Vue.use(VueTour);

import {
  CubeTransparentIcon,
  CheckIcon,
  ChevronDownIcon,
  AnnotationIcon,
  NewspaperIcon,
  PhotographIcon,
  XCircleIcon,
  TemplateIcon,
  //ShieldCheckIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  ArrowCircleRightIcon,
} from "@vue-hero-icons/outline";

export default {
  computed: {
    ...mapState(["blueprintData"]),
  },
  mounted() {
    if (this.serpData.results) this.massage();
    if (this.$route.query.retrieve) {
      this.retrieving = true;
      this.$refs.topProgress.start();
      this.loader.loading = true;
      this.retrieve(this.$route.query.retrieve);
    }
    if (localStorage.getItem("tourComplete") !== "true") {
      setTimeout(() => {
        this.$tours["myTour"].start();
      }, 1000);
    }
  },
  components: {
    CheckIcon,
    HeaderQuestions,
    LoadingSpinner,
    Breadcrumb,
    vueTopprogress,
    PopularQuestions,
    ResultCount,
    BetaMessage,
    ErrorMessage,
    XCircleIcon,
    CubeTransparentIcon,
    ChevronDownIcon,
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
    TemplateIcon,
    // ShieldCheckIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
    ArrowCircleRightIcon,
    VueTour,
  },
  name: "Analysis",
  data() {
    return {
      search: {
        query: "",
        amount: 50,
        device: "desktop",
        location: "United States",
        engine: "google",
        idFromDb: "",
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
        loaded: Object.keys(store.getters.getBlueprint).length ? true : false,
        loading: false,
      },

      serpData:
        Object.keys(store.getters.getBlueprint).length && this.error !== true
          ? store.getters.getBlueprint
          : {
              averageValues: {
                averageWordCount: {
                  icon: "AnnotationIcon",
                  value: 0,
                  label: "Words",
                  bg: "bg-pink",
                },
                averageHeaderCount: {
                  icon: "NewspaperIcon",
                  value: 0,
                  label: "Headers",
                  bg: "bg-purple",
                },
                averageImageCount: {
                  icon: "PhotographIcon",
                  value: 0,
                  label: "Images",
                  bg: "bg-orange",
                },
                averageParagraphCount: {
                  icon: "TemplateIcon",
                  value: 0,
                  label: "Paragraphs",
                  bg: "bg-green",
                },
              },
              expandedArticles: [],
            },
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
    onClickExpand(index) {
      if (this.serpData.expandedArticles.includes(index))
        this.serpData.expandedArticles = this.serpData.expandedArticles.filter(
          (i) => i !== index
        );
      else this.serpData.expandedArticles.push(index);
    },
    generate: async function () {
      this.search.timeStart = performance.now();
      this.$refs.topProgress.start();
      this.loader.loading = true;
      try {
        let response = await fetch(
          `${this.search.api_url}/generate?keyword=${this.search.query}&amount=${this.search.amount}&device=${this.search.device}&location=${this.search.location}&engine=${this.search.engine}&fetchQuestions=${this.search.fetchQuestions}&domainAuthority=${this.search.domainAuthority}`,
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
          this.search.idFromDb = data.id;
          setTimeout(() => {
            this.retrieve(data.id);
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    retrieve: async function (id) {
      try {
        let response = await fetch(`${this.search.api_url}/retrieve?id=${id}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        let data = await response.json();
        if (data.error) {
          if (data.error.message === "Data Not Ready") {
            setTimeout(() => {
              this.retrieve(id);
            }, 1500);
          } else {
            this.errorHandler.errorMessage = data.error.message;
            this.errorHandler.error = true;
            this.loader.loaded = false;
            this.loader.loading = false;
            this.$refs.topProgress.done();
          }
        } else {
          this.serpData = { ...this.serpData, ...data };
          this.massage();
          this.$store.dispatch("addBluePrintData", {
            ...this.serpData,
            ...data,
          });
          this.search.timeTaken = Math.round(
            (performance.now() - this.search.timeStart) / 1000
          );
          this.loadedAndShow();
        }
      } catch (err) {
        this.errorHandler.errorMessage = "Something went wrong!";
        this.$refs.topProgress.done();
      }
    },
    animateSearchBtn() {
      this.search.animatedSearchBtn = true;
    },
    deleteItem(index) {
      this.serpData.results.splice(index, 1);
      this.massage();
    },
    loadedAndShow() {
      if (!this.retrieving) {
        this.$nextTick(() =>
          VueScrollTo.scrollTo("#results", { offset: -270 })
        );
      }

      this.loader.loaded = true;
      this.loader.loading = false;
      this.search.idFromDb = "";
      this.$refs.topProgress.done();
    },
    massage() {
      //Average Word Count
      const countsNotZero = this.serpData.results.filter(
        (entry) => entry.wordCount !== 0
      );
      this.serpData.averageValues.averageWordCount.value =
        countsNotZero.length === 0
          ? null
          : Math.round(
              countsNotZero.reduce((p, c) => (p += c.wordCount), 0) /
                countsNotZero.length
            );

      //Average Header Count
      const headersNotZero = this.serpData.results.filter(
        (entry) => entry.headers.length !== 0
      );
      this.serpData.averageValues.averageHeaderCount.value =
        headersNotZero.length === 0
          ? null
          : Math.round(
              headersNotZero.reduce((p, c) => (p += c.headers.length), 0) /
                headersNotZero.length
            );

      //Average Image Count
      const imagesNotZero = this.serpData.results.filter(
        (entry) => entry.imageCount !== 0
      );
      this.serpData.averageValues.averageImageCount.value =
        imagesNotZero.length === 0
          ? null
          : Math.round(
              imagesNotZero.reduce((p, c) => (p += c.imageCount), 0) /
                imagesNotZero.length
            );

      //Average Paragraph Count
      const paragraphsNotZero = this.serpData.results.filter(
        (entry) => entry.paragraphCount !== 0
      );
      this.serpData.averageValues.averageParagraphCount.value =
        paragraphsNotZero.length === 0
          ? null
          : Math.round(
              paragraphsNotZero.reduce((p, c) => (p += c.paragraphCount), 0) /
                paragraphsNotZero.length
            );

      //Prettify Total Results
      if (this.serpData.totalResults && !isNaN(this.serpData.totalResults)) {
        const britishNumberFormatter = new Intl.NumberFormat("en-GB");
        this.serpData.totalResults = britishNumberFormatter.format(
          this.serpData.totalResults
        );
      }
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