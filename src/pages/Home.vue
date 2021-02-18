<template>
  <div id="home">
    <div class="flex bg-white" style="height: 600px">
      <div
        class="flex items-center px-8 text-center lg:text-left md:px-12 lg:w-1/2"
      >
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">
            Welcome to <span class="text-indigo-600">Rubric</span>
          </h2>
          <p class="mt-2 text-sm text-gray-500 md:text-base">
            Rubric is an SEO tool, designed to help you maximise your efficiency
            when coming up with winning content. Perform you're first SERP
            Analysis now!
          </p>
          <div class="flex justify-center mt-6 lg:justify-start">
            <router-link
              class="flex items-center self-center h-16 px-4 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
              to="/analysis"
              >SERP Analysis</router-link
            >
            <router-link
              class="flex items-center self-center h-16 px-4 mb-2 ml-2 font-semibold text-center text-gray-300 duration-150 bg-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-700 focus:outline-none"
              to="/about"
              >Learn More</router-link
            >
          </div>
        </div>
      </div>
      <div
        class="hidden lg:block lg:w-1/2"
        style="clip-path: polygon(10% 0, 100% 0%, 100% 100%, 0 100%)"
      >
        <div
          class="object-cover h-full"
          style="background-image: url(./img/bg.png)"
        >
          <div class="h-full bg-black opacity-25"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>