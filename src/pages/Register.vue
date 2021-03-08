<template>
  <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden dark:bg-gray-800">
    <div class="flex items-center justify-center p-6 sm:p-12">
      <div class="w-full">
        <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
          Create account
        </h1>
        <form @submit.prevent="formSubmit">
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">Email</span>
            <input
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Jane Doe"
              type="email"
              required
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">Password</span>
            <input
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="***************"
              type="password"
              required
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">
              Confirm password
            </span>
            <input
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="***************"
              type="password"
              required
            />
          </label>

          <div class="flex mt-6 text-sm">
            <label class="flex items-center dark:text-gray-400">
              <input
                type="checkbox"
                class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                required
              />
              <span class="ml-2">
                I agree to the
                <router-link to="/privacy" target="_blank" class="underline"
                  >privacy policy</router-link
                >
              </span>
            </label>
          </div>
          <button
            class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-purple"
            type="submit"
          >
            Create Account
          </button>
          <!-- You should use a button here, as the anchor is only used for the example  -->
        </form>
        <hr class="my-8" />

        <p class="mt-2">
          <router-link
            class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            to="/login"
          >
            Already have an account? Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    formSubmit() {
      alert("Registration Form Submitted!");
    },
  },
};
</script>