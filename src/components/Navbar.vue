<template>
  <div class="sticky top-0 z-40">
    <transition
      enter-active-class="slide-in-left"
      leave-active-class="slide-out-left"
    >
      <div
        class="fixed z-30 w-full h-screen border-r bg-gray-25 md:w-2/3 lg:w-64 md:top-0 md:left-0 lg:hidden"
        id="mobile-nav"
        v-if="mobNavOpen"
      >
        <div class="flex items-center">
          <router-link
            active-class="bg-gray-25"
            to="/"
            v-on:click.native="mobNavOpen = false"
            class="flex items-center w-full h-20 px-4"
          >
            <svg
              class="w-8 h-8 ml-2 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
            <p class="pl-4 text-3xl font-semibold text-gray-800">RUBRIC</p>
          </router-link>

          <!-- Close Menu -->
          <button
            v-on:click="(mobNavOpen = !mobNavOpen), animateClose()"
            class="flex align-middle"
            id="mobCloseBtn"
          >
            <svg
              class="w-12 h-12 mr-4 text-gray-700 hover:text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <MenuItems />
      </div>
    </transition>
    <div
      class="flex items-center justify-between w-full h-20 px-6 bg-white border-b"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="flex items-center mr-4 text-gray-700 lg:hidden">
          <button
            class="hover:text-indigo-600 hover:border-white focus:outline-none navbar-burger"
            v-on:click="mobNavOpen = !mobNavOpen"
          >
            <svg
              class="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          </button>
        </div>

        <!-- search bar -->
        <div class="relative text-gray-500"></div>
      </div>

      <!-- right navbar -->
      <div class="relative flex items-center">
        <button
          class="p-1 mr-4 text-gray-700 duration-150 rounded-full hover:bg-indigo-100 hover:text-indigo-600 focus:outline-none"
        >
          <div class="flex px-0 leading-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              class="fill-current"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
              />
            </svg>
            <div class="z-10 w-2 h-2 -ml-1 rounded-full bg-pink"></div>
          </div>
        </button>
        <button
          class="p-0 duration-150 focus:outline-none"
          @click="dropDownOpen = !dropDownOpen"
        >
          <img
            src="https://images.unsplash.com/photo-1552774021-9ebbb764f03e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            class="w-10 h-10 duration-150 border-2 border-white rounded-full shadow-lg hover:border-indigo-600"
          />
        </button>
      </div>
    </div>

    <!-- dropdown menu -->
    <div
      class="absolute right-0 w-48 mr-6 text-gray-700 border border-t-0 rounded-b-lg shadow-xl bg-gray-25 bottom-10"
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <a href="#" class="block px-4 py-2 hover:bg-gray-200">Account</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-200">Settings</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-200">Logout</a>
    </div>
    <!-- dropdown menu end -->
  </div>
</template>

<script>
import MenuItems from "@/components/MenuItems";

export default {
  name: "Navbar",
  components: {
    MenuItems,
  },
  data() {
    return {
      dropDownOpen: false,
      mobNavOpen: false,
      animatedCloseBtn: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.mobNavOpen = true;
    },
    animateClose() {
      document.getElementById("mobCloseBtn").classList.add("rotate-center");
      setTimeout(function () {
        if (document.getElementById("mobCloseBtn"))
          document
            .getElementById("mobCloseBtn")
            .classList.remove("rotate-center");
      }, 3000);
    },
  },
  mounted() {
    //breakpoint sizing
    if (process.env.NODE_ENV !== "production") {
      const plugin = document.createElement("script");
      plugin.setAttribute("src", "https://awesomecdn.netlify.app/tw.js");
      plugin.async = true;
      document.head.appendChild(plugin);
    }
  },
};
</script>

<style scoped>
.slide-in-left {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-17 18:12:4
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-left
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-out-left {
  -webkit-animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-17 21:4:17
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-out-left
 * ----------------------------------------
 */
@-webkit-keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
}
@keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
}

.rotate-center {
  -webkit-animation: rotate-center 0.3s ease-in-out both;
  animation: rotate-center 0.3s ease-in-out both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-17 21:13:36
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation rotate-center
 * ----------------------------------------
 */
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>