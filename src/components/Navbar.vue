<template>
  <div
    :class="{ sticky: $route.name !== 'Blueprint Editorz' }"
    class="top-0 z-40"
  >
    <transition
      enter-active-class="slide-in-left"
      leave-active-class="slide-out-left"
    >
      <div
        class="fixed z-30 w-3/4 h-screen border-r bg-gray-25 md:w-2/3 lg:w-64 md:top-0 md:left-0 lg:hidden"
        id="mobile-nav"
        v-if="sideBarOpen"
      >
        <div class="flex items-center">
          <router-link
            active-class="bg-gray-25"
            to="/"
            @click.native="toggleSidebar()"
            class="flex items-center w-full h-20 px-4"
          >
            <DocumentTextIcon class="w-8 h-8 ml-2 text-indigo-600" />

            <p
              class="pl-2 text-3xl font-semibold text-gray-800 hover:text-indigo-600"
            >
              RUBRIC
            </p>
          </router-link>

          <!-- Close Menu -->
          <button
            @click="toggleSidebar(), animateClose()"
            class="flex align-middle"
            id="mobCloseBtn"
          >
            <XIcon class="w-12 h-12 mr-4 text-gray-700 hover:text-indigo-600" />
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
        <!-- mobile hamburger OPEN -->
        <div class="flex items-center mr-4 text-gray-700 lg:hidden">
          <button
            class="hover:text-indigo-600 hover:border-white focus:outline-none navbar-burger"
            @click="toggleSidebar()"
          >
            <MenuAlt2Icon class="w-10 h-10" />
          </button>
        </div>

        <!-- search bar -->
        <div class="relative text-gray-500"></div>
      </div>

      <!-- right navbar -->
      <div class="relative flex items-center">
        <button class="p-1 mr-4 text-gray-700 duration-150 focus:outline-none">
          <div class="flex px-0 leading-3">
            <BellIcon
              class="w-8 h-8 text-gray-600 duration-150 hover:text-indigo-600"
            />
            <div class="z-10 w-2 h-2 -ml-1 rounded-full bg-pink"></div>
          </div>
        </button>
        <button
          class="p-0 duration-150 focus:outline-none"
          @click="dropDownOpen = !dropDownOpen"
        >
          <UserCircleIcon
            class="w-8 h-8 text-gray-600 duration-150 hover:text-indigo-600"
          />
        </button>
      </div>
    </div>

    <!-- dropdown menu -->
    <div
      class="absolute right-0 w-48 mr-6 text-gray-700 border border-t-0 rounded-b-lg shadow-xl bg-gray-25"
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <a v-if="isLoggedIn" href="#" class="block px-4 py-2 hover:bg-gray-200"
        >Account</a
      >
      <a v-if="isLoggedIn" href="#" class="block px-4 py-2 hover:bg-gray-200"
        >Settings</a
      >
      <button
        v-if="isLoggedIn"
        @click="logout"
        class="flex w-full px-4 py-2 flex-start hover:bg-gray-200"
        title="Log Out"
      >
        Logout
      </button>

      <router-link
        to="/login"
        class="block px-4 py-2 hover:bg-gray-200"
        v-if="!isLoggedIn"
        >Login</router-link
      >

      <router-link
        to="/register"
        class="block px-4 py-2 hover:bg-gray-200"
        v-if="!isLoggedIn"
        >Register</router-link
      >
    </div>
    <!-- dropdown menu end -->
  </div>
</template>

<script>
import {
  DocumentTextIcon,
  UserCircleIcon,
  XIcon,
  MenuAlt2Icon,
  BellIcon,
} from "@vue-hero-icons/outline";
import MenuItems from "@/components/MenuItems";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState(["sideBarOpen"]),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    authStatus: function () {
      return this.$store.getters.authStatus;
    },
  },
  components: {
    MenuItems,
    DocumentTextIcon,
    XIcon,
    UserCircleIcon,
    MenuAlt2Icon,
    BellIcon,
  },
  data() {
    return {
      dropDownOpen: false,
      // mobNavOpen: false,
      animatedCloseBtn: true,
    };
  },

  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
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
  // created: function () {
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //     return new Promise(function () {
  //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //         this.$store.dispatch("logout");
  //       }
  //       throw err;
  //     });
  //   });
  // },
};
</script>

<style scoped>
.slide-in-left {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

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