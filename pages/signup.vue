<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Sign Up</h1>
    <form @submit.prevent="register" class="bg-white p-8 rounded shadow-md w-80">
      <input
        v-model="username"
        placeholder="Username"
        required
        class="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select 
        v-model="userType"
        class="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="individual">Individual</option>
        <option value="corporate">Corporate</option>
      </select>
      <button
        type="submit"
        class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Бүртгүүлэх
      </button>
    </form>

    <!-- Бүртгүүлэх процессын үр дүн -->
    <p v-if="message" :class="{ 'text-red-600': isError, 'text-green-600': !isError }" class="mt-4 text-center">{{ message }}</p>
  </div>
</template>

<script>
import { useToast } from 'vue3-toastify';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      userType: 'individual',
      message: '',
      isError: false,
    };
  },
  methods: {
    async register() {
  console.log('Username:', this.username);
  console.log('Email:', this.email);
  console.log('Password:', this.password);
  console.log('User Type:', this.userType);

  const response = await fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: this.username,
      email: this.email,
      password: this.password,
      user_type: this.userType,
    }),
  });

  const toast = useToast();

  if (response.ok) {
    toast.success('Бүртгэл амжилттай!');
    this.message = 'Бүртгэл амжилттай!';
    this.isError = false;
  } else {
    const errorText = await response.text();
    toast.error('Бүртгэл амжилтгүй: ' + errorText);
    this.message = 'Бүртгэл амжилтгүй: ' + errorText;
    this.isError = true;
  }
}


  },
};
</script>
