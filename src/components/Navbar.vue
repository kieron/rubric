<template>
  <div
    :class="{ sticky: $route.name !== 'Blueprint Editor' }"
    class="top-0 z-40"
  >
    <transition
      enter-active-class="slide-in-left"
      leave-active-class="slide-out-left"
    >
      <div
        class="fixed z-30 w-3/4 h-screen border-r dark:border-gray-600 bg-gray-25 dark:bg-gray-800 md:w-2/3 lg:w-64 md:top-0 md:left-0 lg:hidden"
        id="mobile-nav"
        v-if="sideBarOpen"
      >
        <div class="flex items-center">
          <router-link
            active-class="bg-gray-25 dark:bg-gray-800"
            to="/"
            @click.native="toggleSidebar()"
            class="flex items-center w-full h-20 px-4 text-gray-800 hover:text-indigo-600 dark:hover:text-indigo-600 dark:text-indigo-200"
          >
            <Logo class="ml-2" />
            <p class="text-3xl font-semibold">RUBRIC</p>
          </router-link>

          <!-- Close Menu -->
          <button
            @click="toggleSidebar(), animateClose()"
            class="flex mr-4 text-gray-700 align-middle rounded-lg hover:text-indigo-600 dark:hover:text-red-400 focus:outline-none focus:ring focus:border-indigo-600 dark:text-indigo-200"
            id="mobCloseBtn"
          >
            <XIcon class="w-12 h-12" />
          </button>
        </div>

        <MenuItems />
      </div>
    </transition>
    <div
      class="flex items-center justify-between w-full h-20 px-6 bg-white border-b dark:border-gray-600 dark:bg-gray-900"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger OPEN -->
        <div
          class="flex items-center mr-4 text-gray-600 dark:text-indigo-200 lg:hidden"
        >
          <button
            class="rounded-lg hover:text-indigo-600 dark:hover:text-red-400 focus:outline-none focus:ring focus:border-indigo-600 hover:border-white navbar-burger"
            @click="toggleSidebar()"
          >
            <MenuAlt2Icon class="w-10 h-10" />
          </button>
        </div>

        <!-- search bar -->
        <div class="relative text-gray-500"></div>
      </div>

      <!-- right navbar -->
      <div
        class="relative flex items-center text-gray-600 dark:text-indigo-200"
      >
        <button
          @click="toggleTheme"
          class="mr-4 rounded-lg hover:text-indigo-600 dark:hover:text-red-400 focus:outline-none focus:ring focus:border-indigo-600"
          title="Toggle Theme"
        >
          <SunIcon v-if="theme === 'dark'" class="w-8 h-8 duration-150" />
          <MoonIcon v-if="theme !== 'dark'" class="w-8 h-8 duration-150" />
        </button>
        <button
          class="hidden p-1 mr-4 duration-150 rounded-lg focus:outline-none focus:ring focus:border-indigo-600 hover:text-indigo-600 dark:hover:text-red-400"
        >
          <div class="flex px-0 leading-3">
            <BellIcon class="w-8 h-8 duration-150" />
            <div class="z-10 w-2 h-2 -ml-1 rounded-full bg-pink"></div>
          </div>
        </button>
        <button
          class="p-0 duration-150 rounded-lg focus:outline-none hover:text-indigo-600 focus:ring focus:border-indigo-600 dark:hover:text-red-400"
          @click.prevent="toggleDropdown"
        >
          <UserCircleIcon class="w-8 h-8 duration-150" />
        </button>
      </div>
    </div>

    <!-- dropdown menu -->
    <transition
      enter-active-class="swing-in-top-fwd"
      leave-active-class="swing-out-top-bck"
    >
      <div
        class="absolute right-0 z-10 w-48 mr-6 text-gray-700 border border-t-0 rounded-b-lg shadow-xl dark:border-gray-600 bg-gray-25 dark:bg-gray-700 dark:text-gray-400"
        v-if="dropDownOpen"
      >
        <router-link
          v-if="isLoggedIn"
          to="/account"
          class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500 dark:hover:text-gray-200"
          >Account</router-link
        >
        <button
          v-if="isLoggedIn"
          @click="logout"
          class="flex w-full px-4 py-2 flex-start hover:bg-gray-200 dark:hover:bg-gray-500 dark:hover:text-gray-200"
          title="Log Out"
        >
          Logout
        </button>

        <router-link
          to="/login"
          class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500 dark:hover:text-gray-200"
          v-if="!isLoggedIn"
          >Login</router-link
        >

        <router-link
          to="/register"
          class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500 dark:hover:text-gray-200"
          v-if="!isLoggedIn"
          >Register</router-link
        >
      </div>
    </transition>
    <!-- dropdown menu end -->
  </div>
</template>

<script>
import {
  UserCircleIcon,
  XIcon,
  MenuAlt2Icon,
  BellIcon,
  SunIcon,
  MoonIcon,
} from "@vue-hero-icons/outline";
import MenuItems from "@/components/MenuItems";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Logo from "@/components/BaseLogo";

export default {
  name: "Navbar",

  computed: {
    ...mapGetters({ theme: "getTheme" }),
    ...mapState(["sideBarOpen"]),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  components: {
    MenuItems,
    XIcon,
    UserCircleIcon,
    MenuAlt2Icon,
    BellIcon,
    SunIcon,
    MoonIcon,
    Logo,
  },
  data() {
    return {
      dropDownOpen: false,
      animatedCloseBtn: true,
    };
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  watch: {
    $route() {
      this.dropDownOpen = false;
    },
  },
  methods: {
    toggleDropdown() {
      this.dropDownOpen = !this.dropDownOpen;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.dropDownOpen = false;
      }
    },
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        // this.dropDownOpen = !this.dropDownOpen;
        if (this.$route.path !== "/") this.$router.push("/");
      });
    },
    toggleSidebar() {
      // this.dropDownOpen = false;
      this.$store.dispatch("toggleSidebar");
    },
    animateClose() {
      // this.dropDownOpen = false;
      document.getElementById("mobCloseBtn").classList.add("rotate-center");
      setTimeout(function () {
        if (document.getElementById("mobCloseBtn"))
          document
            .getElementById("mobCloseBtn")
            .classList.remove("rotate-center");
      }, 3000);
    },
  },
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

.slide-out-top {
  -webkit-animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@-webkit-keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
}
@keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
}

.swing-out-top-bck {
  -webkit-animation: swing-out-top-bck 0.45s
    cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
  animation: swing-out-top-bck 0.45s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
}

@-webkit-keyframes swing-out-top-bck {
  0% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
}
@keyframes swing-out-top-bck {
  0% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
}
</style>