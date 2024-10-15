<template>
  <Navbar/>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    
    <h1 class="text-3xl font-bold mb-6">Sign In</h1>
    <form @submit.prevent="handleSignIn" class="bg-white p-8 rounded shadow-md w-80">
      <input
        v-model="username"
        placeholder="Username"
        required
        class="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Sign In
      </button>
      <p v-if="message" :class="{ 'text-red-600': isError, 'text-green-600': !isError }" class="mt-4 text-center">{{ message }}</p>
    </form>

    <!-- Бүртгүүлэх хэсэг -->
    <p class="mt-4 text-center">
      Don't have an account? 
      <button @click="goToSignUp" class="text-blue-600 hover:underline">Sign Up</button>
    </p>
  </div>
  <Footer />
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      isError: false,
    };
  },
  methods: {
    async handleSignIn() {
      // Нэвтрэх логик
    },
    goToSignUp() {
      this.$router.push({ name: 'SignUp' }); // SignUp хуудсанд шилжих
    },
  },
};
</script>
