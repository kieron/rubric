<template>
  <div id="analysis" class="slide-in-right">
    <Breadcrumb />

    <div class="items-center mb-6">
      <h1
        class="mb-3 text-3xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
      >
        My Account
      </h1>

      <p class="text-gray-800 dark:text-gray-300">
        It's all about you<span v-if="userDetails.email"
          >, <strong>{{ userDetails.email }}</strong></span
        >
      </p>
      <hr class="mt-2 dark:border-gray-600" />
      <div
        class="flex justify-center my-20 text-indigo-600"
        v-if="loader.loading"
      >
        <LoadingSpinner
          class="flex justify-center w-40 ml-auto mr-auto text-center fill-current "
        />
      </div>
      <div v-if="!loader.loading">
        <section class="text-gray-700 body-font" v-if="plan === 'Free'">
          <stripe-checkout
            ref="checkoutRef"
            :pk="publishableKey"
            :session-id="sessionId"
          />
          <ErrorMessage
            class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded  alert swing-in-top-fwd"
            v-if="errorHandler.error && loader.loading != true"
            v-bind:message="errorHandler.errorMessage"
          />
          <SuccessMessage
            class="flex flex-row items-center p-5 mt-5 bg-green-200 border-b-2 border-green-300 rounded  alert swing-in-top-fwd"
            v-if="successMessage && !errorHandler.error && activeSub !== false"
            v-bind:message="successMessage"
          />
          <div class="container px-8 mx-auto">
            <h3
              class="text-xl font-semibold text-center text-gray-700  my-7 dark:text-gray-300"
            >
              Pick a plan to get started, and pay nothing for 10 days!
            </h3>
            <div
              class="flex flex-wrap text-center  lg:divide-x dark:divide-gray-600"
            >
              <div class="order-3 w-full px-8 py-6 mx-auto lg:order-1 lg:w-1/3">
                <h2
                  class="mb-3 text-lg font-semibold text-gray-700  dark:text-gray-300 lg:text-2xl title-font"
                >
                  Just Start
                </h2>
                <p class="my-4 text-base leading-relaxed dark:text-gray-300">
                  Generate up to 50 reports a month.
                </p>
                <div
                  class="flex flex-col items-center justify-center px-2 text-center  lg:h-32"
                >
                  <h2
                    class="flex items-center justify-center mt-2 mb-4 text-3xl font-bold leading-none text-black  dark:text-gray-300 lg:text-6xl"
                  >
                    $8.99
                    <span class="ml-1 text-base text-gray-600">/mo</span>
                  </h2>
                </div>
                <button
                  v-if="sessionId === ''"
                  @click="pay(justStartPlan)"
                  class="flex items-center px-8 py-3 mx-auto mt-3 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <div class="order-2 w-full px-8 py-6 mx-auto lg:order-1 lg:w-1/3">
                <h2
                  class="mb-3 text-lg font-semibold text-gray-700  dark:text-gray-300 lg:text-2xl title-font"
                >
                  Pro
                </h2>
                <p class="my-4 text-base leading-relaxed dark:text-gray-300">
                  Generate up to 100 reports a month.
                </p>
                <div
                  class="flex flex-col items-center justify-center px-2 text-center  lg:h-32"
                >
                  <h2
                    class="flex items-center justify-center mt-2 mb-4 text-3xl font-bold leading-none text-black  dark:text-gray-300 lg:text-6xl"
                  >
                    $19.99
                    <span class="ml-1 text-base text-gray-600">/mo</span>
                  </h2>
                </div>
                <button
                  v-if="sessionId === ''"
                  @click="pay(proPlan)"
                  class="flex items-center px-8 py-3 mx-auto mt-3 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <div class="order-1 w-full px-8 py-6 mx-auto lg:order-1 lg:w-1/3">
                <h2
                  class="mb-3 text-lg font-semibold text-gray-700  dark:text-gray-300 lg:text-2xl title-font"
                >
                  Agency
                </h2>
                <p class="my-4 text-base leading-relaxed dark:text-gray-300">
                  Generate 500 reports a month!
                </p>
                <div
                  class="flex flex-col items-center justify-center px-2 text-center  lg:h-32"
                >
                  <h2
                    class="flex items-center justify-center mt-2 mb-4 text-3xl font-bold leading-none text-black  dark:text-gray-300 lg:text-6xl"
                  >
                    $34.99
                    <span class="ml-1 text-base text-gray-600">/mo</span>
                  </h2>
                </div>
                <button
                  v-if="sessionId === ''"
                  @click="pay(agencyPlan)"
                  class="flex items-center px-8 py-3 mx-auto mt-3 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        <div class="dark:text-gray-400">
          <div class="flex my-5" v-if="admin">
            <p>
              Logged In: <strong v-if="isLoggedIn">True</strong
              ><strong v-if="!isLoggedIn">False</strong>
            </p>
          </div>
          <div class="flex my-5" v-if="admin">
            <p>
              Email:
              <strong v-if="userDetails" class="break-all">{{
                userDetails.email || "null"
              }}</strong>
            </p>
          </div>
          <div class="flex my-5" v-if="admin">
            <p>
              Token (JWT):
              <strong v-if="userDetails" class="break-all">{{
                userDetails.token || "null"
              }}</strong>
            </p>
          </div>
          <div class="flex my-5" v-if="admin">
            <p>
              Rubric Customer ID:
              <strong v-if="userDetails" class="break-all">{{
                userDetails._id || "null"
              }}</strong>
            </p>
          </div>
          <div class="flex my-5" v-if="admin">
            <p>
              Customer Stripe ID:
              <strong>{{ stripeCustomerID || "null" }}</strong>
            </p>
          </div>

          <div class="flex my-5" v-if="admin">
            <p>
              Active Plan:
              <strong class="break-all">{{ activeSub }}</strong>
            </p>
          </div>
          <div class="flex my-5" v-if="plan">
            <p>
              Plan:
              <strong class="break-all"
                >{{ plan || "null" }}
                <span v-if="quota">({{ quota }} Reports)</span></strong
              >
            </p>
          </div>
          <div class="flex my-5" v-if="quota && admin">
            <p>
              Quota:
              <strong class="break-all">{{ quota }} </strong>
            </p>
          </div>
          <div class="flex my-5" v-if="quota">
            <p>
              Reports Remaining:
              <strong class="break-all">{{ quotaRemaining }} </strong>
            </p>
          </div>
        </div>
        <div>
          <div
            class="flex mt-5"
            v-if="activeSub && billingMode && plan != 'Free'"
          >
            <form @submit.prevent="portal" class="w-full">
              <button
                type="submit"
                class="items-center self-center w-full h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
              >
                Open Billing Portal
              </button>
            </form>
          </div>
        </div>

        <div class="mt-5" v-if="userSerps.length">
          <h2
            class="mb-3 text-2xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
          >
            Your Reports
          </h2>

          <p class="text-sm text-gray-800 dark:text-gray-300">
            Look back on your old reports
          </p>
          <hr class="mt-2 dark:border-gray-600" />
          <div
            class="flex flex-col mt-5 mb-12 border border-gray-300 rounded-md  dark:border-gray-600 bg-gray-25 dark:bg-gray-700"
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
                          Report
                        </th>
                        <td
                          class="py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-700 uppercase  dark:text-gray-300 dark:bg-gray-700 bg-gray-50"
                        >
                          Analysis
                        </td>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white border-t border-gray-300 divide-y divide-gray-200  dark:border-gray-600 dark:bg-gray-800 dark:divide-gray-600"
                    >
                      <tr
                        :key="index"
                        v-for="(report, index) in userSerps"
                        class="border-b border-gray-200 dark:border-gray-600"
                      >
                        <td class="px-3 py-3 md:px-6 md:py-4">
                          <div class="flex items-center">
                            <div class="">
                              <div
                                class="mb-1 mr-16 font-medium leading-5 text-gray-900  dark:text-gray-300 md:text-lg"
                              >
                                {{ report.searchTerm }}
                              </div>

                              <div
                                class="text-xs leading-5 text-gray-500  dark:text-gray-400 md:text-sm"
                              >
                                <span class="break-all">{{
                                  convertTime(report.createdAt)
                                }}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="w-40 p-2 text-center md:py-0">
                          <div class="flex flex-wrap sm:justify-around">
                            <router-link
                              :to="`/analysis?retrieve=${report._id}`"
                              tag="button"
                              class="w-auto h-10 px-4 mx-auto mb-1 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                              title="Open Report"
                            >
                              <ArrowCircleRightIcon class="flex align-middle" />
                            </router-link>
                            <button
                              class="w-auto h-10 px-4 mx-auto font-semibold text-white duration-150 bg-red-600 rounded-lg  md:mt-0 focus:outline-none whitespace-nowrap"
                              @click="deleteReport(index, report)"
                              title="Delete Report"
                            >
                              <XIcon
                                class="flex align-middle"
                                :id="report._id + '_x'"
                              />
                              <LoadingSpinner
                                class="items-center hidden w-6 h-6 fill-current"
                                :id="report._id + '_spinner'"
                              />
                            </button>
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
        <div class="mt-5" v-else>
          <h2
            class="mb-3 text-2xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
          >
            Your Reports
          </h2>

          <p class="text-sm text-gray-800 dark:text-gray-300">
            Look back on your old reports
          </p>
          <hr class="mt-2 dark:border-gray-600" />
          <div class="flex flex-col mt-5 mb-12 dark:border-gray-600">
            <p
              class="mt-2 text-sm text-gray-800 md:text-base dark:text-gray-300"
            >
              You havent performed any SERP Analysis yet, start now!
            </p>
            <div class="flex justify-center mt-6 lg:justify-start">
              <router-link
                class="flex items-center self-center h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  hover:bg-indigo-500 focus:outline-none"
                to="/analysis"
                v-if="isLoggedIn"
                >SERP Analysis</router-link
              >
            </div>
          </div>
        </div>
        <div class="mt-5" v-if="userBlueprints.length">
          <h2
            class="mb-3 text-2xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
          >
            Your Blueprints
          </h2>

          <p class="text-sm text-gray-800 dark:text-gray-300">
            Look back on your old blueprints
          </p>
          <hr class="mt-2 dark:border-gray-600" />
          <div
            class="flex flex-col mt-5 mb-12 border border-gray-300 rounded-md  dark:border-gray-600 bg-gray-25 dark:bg-gray-700"
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
                          Blueprint
                        </th>
                        <td
                          class="py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-700 uppercase  dark:text-gray-300 dark:bg-gray-700 bg-gray-50"
                        >
                          Options
                        </td>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white border-t border-gray-300 divide-y divide-gray-200  dark:border-gray-600 dark:bg-gray-800 dark:divide-gray-600"
                    >
                      <tr
                        :key="index"
                        v-for="(blueprint, index) in userBlueprints"
                        class="border-b border-gray-200 dark:border-gray-600"
                      >
                        <td class="px-3 py-3 md:px-6 md:py-4">
                          <div class="flex items-center">
                            <div class="">
                              <div
                                class="mb-1 mr-16 font-medium leading-5 text-gray-900  dark:text-gray-300 md:text-lg"
                              >
                                {{ blueprint.searchTerm }}
                              </div>

                              <div
                                class="text-xs leading-5 text-gray-500  dark:text-gray-400 md:text-sm"
                              >
                                <span class="break-all">{{
                                  convertTime(blueprint.createdAt)
                                }}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="w-40 p-2 text-center md:py-0">
                          <div class="flex flex-wrap sm:justify-around">
                            <router-link
                              :to="`/blueprint?retrieve=${blueprint._id}`"
                              tag="button"
                              class="w-auto h-10 px-4 mx-auto mb-1 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                              title="Open Blueprint"
                            >
                              <ArrowCircleRightIcon class="flex align-middle" />
                            </router-link>
                            <button
                              class="w-auto h-10 px-4 mx-auto font-semibold text-white duration-150 bg-red-600 rounded-lg  md:mt-0 focus:outline-none whitespace-nowrap"
                              @click="deleteBlueprint(index, blueprint)"
                              title="Delete Report"
                            >
                              <XIcon
                                class="flex align-middle"
                                :id="blueprint._id + '_x'"
                              />
                              <LoadingSpinner
                                class="items-center hidden w-6 h-6 fill-current"
                                :id="blueprint._id + '_spinner'"
                              />
                            </button>
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
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { XIcon, ArrowCircleRightIcon } from "@vue-hero-icons/outline";
const orderBy = require("lodash.orderby");
import config from "../../config";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  name: "Account",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    userDetails: function () {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  components: {
    StripeCheckout,
    Breadcrumb,
    ErrorMessage,
    SuccessMessage,
    LoadingSpinner,
    XIcon,
    ArrowCircleRightIcon,
  },

  data() {
    this.publishableKey = config.STRIPE_PUBKEY;
    this.justStartPlan = config.JUSTSTART_PLAN;
    this.proPlan = config.PRO_PLAN;
    this.agencyPlan = config.AGENCY_PLAN;
    this.billingMode = config.BILLING_MODE;
    return {
      activeSub: false,
      stripeCustomerID: "",
      plan: "No Plan Selected",
      sessionId: "",
      api_url: config.API_URL,
      loader: {
        loading: true,
      },
      errorHandler: {
        error: false,
        errorMessage: "Something Went Wrong!",
      },
      successMessage: "",
      userSerps: [],
      userBlueprints: [],
      quota: 0,
      quotaRemaining: 0,
      admin: false,
    };
  },
  mounted: async function () {
    this.loader.loading = true;
    try {
      let response = await fetch(
        `${this.api_url}/user?id=${this.userDetails._id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await response.json();
      if (data.error) {
        if (
          data.error.message === "invalid token" ||
          data.error.message === "jwt expired"
        ) {
          localStorage.removeItem("token");
          location.reload();
        } else {
          this.errorHandler.errorMessage = data.error.message;
          this.errorHandler.error = true;
        }
      } else {
        this.stripeCustomerID = data.billing.stripeId;
        this.activeSub = data.billing.activePlan || false;
        this.quota = data.billing.quota || 0;
        this.quotaRemaining = data.billing.quotaRemaining || 0;
        this.plan = data.billing.plan;
        if (data.reports) {
          this.userSerps = orderBy(data.reports, "createdAt", "desc");
        }
        if (data.blueprints) {
          this.userBlueprints = orderBy(data.blueprints, "createdAt", "desc");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.loader.loading = false;
    }

    if (
      this.$route.query.checkout === "true" &&
      this.errorHandler.error == false
    ) {
      this.errorHandler.error = false;
      this.successMessage = "You're all set! We hope you love Rubric.";
    } else if (this.$route.query.checkout === "false") {
      this.errorHandler.errorMessage = "Looks like you changed your mind!";
      this.errorHandler.error = true;
    }
  },

  methods: {
    pay: async function (plan) {
      try {
        let response = await fetch(`${this.api_url}/purchase`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            client_reference_id: this.stripeCustomerID,
            email: this.stripeCustomerID ? null : this.userDetails.email,
            plan: plan,
          }),
        });
        let data = await response.json();
        if (data.error) {
          this.errorHandler.errorMessage = data.error.message;
          this.errorHandler.error = true;
        } else {
          this.sessionId = data.id;
          this.$refs.checkoutRef.redirectToCheckout();
        }
      } catch (err) {
        console.log(err);
      }
    },

    portal: async function () {
      let response = await fetch(`${this.api_url}/customer-portal`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        redirect: "follow",
        body: JSON.stringify({ customer: this.stripeCustomerID }),
      });
      let data = await response.json();
      window.location.assign(data);
    },

    convertTime: function (input) {
      let d = new Date(input);
      return d.toUTCString();
    },

    deleteReport: async function (index, report) {
      const r = confirm("Are you sure you want to delete this report?");
      if (r == true) {
        this.showSpinner(report._id);
        try {
          let response = await fetch(
            `${this.api_url}/delete?id=${report._id}`,
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
          } else if (data === "Report Deleted") {
            this.userSerps.splice(index, 1);
          } else {
            this.errorHandler.errorMessage = data;
            this.errorHandler.error = true;
          }
        } catch (err) {
          this.errorHandler.errorMessage = "Something went wrong!";
        } finally {
          this.hideSpinner(report._id);
        }
      }
    },

    deleteBlueprint: async function (index, blueprint) {
      const r = confirm("Are you sure you want to delete this blueprint?");
      if (r == true) {
        this.showSpinner(blueprint._id);
        try {
          let response = await fetch(
            `${this.api_url}/blueprint/delete?id=${blueprint._id}`,
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
          } else if (data === "Blueprint Deleted") {
            this.userBlueprints.splice(index, 1);
          } else {
            this.errorHandler.errorMessage = data;
            this.errorHandler.error = true;
          }
        } catch (err) {
          this.errorHandler.errorMessage = "Something went wrong!";
        } finally {
          this.hideSpinner(blueprint._id);
        }
      }
    },

    showSpinner: function (reportId) {
      if (
        document.getElementById(reportId + "_x") &&
        document.getElementById(reportId + "_spinner")
      )
        document.getElementById(reportId + "_x").classList.remove("flex");
      document.getElementById(reportId + "_x").classList.add("hidden");
      document.getElementById(reportId + "_spinner").classList.remove("hidden");
      document.getElementById(reportId + "_spinner").classList.add("flex");
    },
    hideSpinner: function (reportId) {
      if (
        document.getElementById(reportId + "_x") &&
        document.getElementById(reportId + "_spinner")
      )
        document.getElementById(reportId + "_x").classList.remove("hidden");
      document.getElementById(reportId + "_x").classList.add("flex");
      document.getElementById(reportId + "_spinner").classList.remove("flex");
      document.getElementById(reportId + "_spinner").classList.add("hidden");
    },
  },
};
</script>

<style>
</style>