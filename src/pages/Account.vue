<template>
  <div id="analysis" class="slide-in-right">
    <Breadcrumb />
    <BetaMessage />

    <div class="items-center mb-6">
      <h1
        class="mb-3 text-3xl font-semibold text-gray-800 dark:text-gray-300 lg:mb-0"
      >
        My Account
      </h1>
      <p class="text-gray-800 dark:text-gray-300">It's all about you.</p>
      <hr class="mt-2" />
      <div
        class="flex justify-center my-20 text-indigo-600"
        v-if="loader.loading"
      >
        <LoadingSpinner
          class="flex justify-center w-40 ml-auto mr-auto text-center fill-current"
        />
      </div>
      <div v-if="!loader.loading">
        <div class="dark:text-gray-400">
          <div class="flex my-5">
            <p>
              Logged In: <strong v-if="isLoggedIn">True</strong
              ><strong v-if="!isLoggedIn">False</strong>
            </p>
          </div>
          <div class="flex my-5">
            <p>
              Email:
              <strong v-if="userDetails" class="break-all">{{
                userDetails.email || "null"
              }}</strong>
            </p>
          </div>
          <div class="flex my-5">
            <p>
              Token (JWT):
              <strong v-if="userDetails" class="break-all">{{
                userDetails.token || "null"
              }}</strong>
            </p>
          </div>
          <div class="flex my-5">
            <p>
              Rubric Customer ID:
              <strong v-if="userDetails" class="break-all">{{
                userDetails._id || "null"
              }}</strong>
            </p>
          </div>
          <div class="flex my-5">
            <p>
              Customer Stripe ID:
              <strong>{{ stripeCustomerID || "null" }}</strong>
            </p>
          </div>

          <div class="flex my-5">
            <p>
              Active Plan:
              <strong class="break-all">{{ activeSub }}</strong>
            </p>
          </div>
          <div class="flex my-5">
            <p>
              Plan:
              <strong class="break-all">{{ plan || "null" }} </strong>
            </p>
          </div>
          <div class="flex my-5">
            <p>
              Quota Remaining:
              <strong class="break-all">{{ quota }} </strong>
            </p>
          </div>
          <div class="flex my-5" v-if="userSerps.length">
            <p>
              Your Reports:
              <ul class="list-disc list-inside">
                <li class="ml-3" v-for="report in userSerps" v-bind:key="report.id">
                  <router-link :to="`/analysis?retrieve=${report._id}`">
                  {{report.searchTerm}}
                  </router-link></li>
              </ul>
            </p>
          </div>
        </div>
        <div>
          <div class="flex my-5" v-if="activeSub">
            <form @submit.prevent="portal">
              <button
                type="submit"
                class="items-center self-center w-full h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
              >
                Open Billing Portal
              </button>
            </form>
          </div>
        </div>

        <section class="text-gray-700 body-font" v-if="!activeSub && !errorHandler.error">
          <stripe-checkout
            ref="checkoutRef"
            :pk="publishableKey"
            :session-id="sessionId"
          />
          <div class="container px-8 mx-auto">
            <div class="flex flex-wrap text-center lg:divide-x">
              <div class="w-full px-8 py-6 mx-auto lg:w-1/3">
                <h2
                  class="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300 lg:text-2xl title-font"
                >
                  Just Start
                </h2>
                <p class="my-4 text-base leading-relaxed dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div
                  class="flex flex-col items-center justify-center px-2 text-center lg:h-32"
                >
                  <h2
                    class="flex items-center justify-center mt-2 mb-4 text-3xl font-bold leading-none text-black dark:text-gray-300 lg:text-6xl"
                  >
                    $8
                    <span class="ml-1 text-base text-gray-600">/mo</span>
                  </h2>
                </div>
                <button
                  v-if="sessionId === ''"
                  @click="pay('price_1IUyuIFDmua4eDfjjcwvBQMW')"
                  class="flex items-center px-8 py-3 mx-auto mt-3 font-semibold text-white duration-150 bg-indigo-600 rounded-lg sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <div class="w-full px-8 py-6 mx-auto lg:w-1/3">
                <h2
                  class="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300 lg:text-2xl title-font"
                >
                  Pro
                </h2>
                <p class="my-4 text-base leading-relaxed dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div
                  class="flex flex-col items-center justify-center px-2 text-center lg:h-32"
                >
                  <h2
                    class="flex items-center justify-center mt-2 mb-4 text-3xl font-bold leading-none text-black dark:text-gray-300 lg:text-6xl"
                  >
                    $16
                    <span class="ml-1 text-base text-gray-600">/mo</span>
                  </h2>
                </div>
                <button
                  v-if="sessionId === ''"
                  @click="pay('price_1IUyuoFDmua4eDfjMQPpCTFl')"
                  class="flex items-center px-8 py-3 mx-auto mt-3 font-semibold text-white duration-150 bg-indigo-600 rounded-lg sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <div class="w-full px-8 py-6 mx-auto lg:w-1/3">
                <h2
                  class="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300 lg:text-2xl title-font"
                >
                  Agency
                </h2>
                <p class="my-4 text-base leading-relaxed dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div
                  class="flex flex-col items-center justify-center px-2 text-center lg:h-32"
                >
                  <h2
                    class="flex items-center justify-center mt-2 mb-4 text-3xl font-bold leading-none text-black dark:text-gray-300 lg:text-6xl"
                  >
                    $38
                    <span class="ml-1 text-base text-gray-600">/mo</span>
                  </h2>
                </div>
                <button
                  v-if="sessionId === ''"
                  @click="pay('price_1IUyvEFDmua4eDfjVM96JENl')"
                  class="flex items-center px-8 py-3 mx-auto mt-3 font-semibold text-white duration-150 bg-indigo-600 rounded-lg sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ErrorMessage
        class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded alert swing-in-top-fwd"
        v-if="errorHandler.error && loader.loading != true"
        v-bind:message="errorHandler.errorMessage"
      />
      <SuccessMessage
        class="flex flex-row items-center p-5 mt-5 bg-green-200 border-b-2 border-green-300 rounded alert swing-in-top-fwd"
        v-if="successMessage && !errorHandler.error && activeSub !== false"
        v-bind:message="successMessage"
      />
    </div>
  </div>
</template>

<script>
import BetaMessage from "@/components/BetaMessage";
import Breadcrumb from "@/components/Breadcrumb";
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import config from "../../config";

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
    Breadcrumb,
    BetaMessage,
    StripeCheckout,
    ErrorMessage,
    SuccessMessage,
    LoadingSpinner,
  },

  data() {
    this.publishableKey = config.STRIPE_PUBKEY;

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
        errorMessage: "Something Went Wrong",
      },
      successMessage: "",
      userSerps: [],
      quota: 0,
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
        if (data.error.message === "invalid token") {
          localStorage.removeItem("token");
          location.reload();
        } else {
          this.errorHandler.errorMessage = data.error.message;
          this.errorHandler.error = true;
        }
      } else {
        this.stripeCustomerID = data.stripeId;
        this.activeSub = data.subscription || false;
        this.quota = data.quota || 0;
        this.userSerps = data.reports;
        if (data.plan === "prod_J7DL9tzQXLvekf") {
          this.plan = `Agency Plan [${data.plan}]`;
        }
        if (data.plan === "prod_J7DLe43HaCNbjj") {
          this.plan = `Pro Plan [${data.plan}]`;
        }
        if (data.plan === "prod_J7DKIW8v3s1Fkk") {
          this.plan = `Just Start Plan [${data.plan}]`;
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
            email: this.userDetails.email,
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
  },
};
</script>

<style>
</style>