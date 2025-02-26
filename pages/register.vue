<template>
  <div class="max-w-md mx-auto mt-12 p-6 bg-gray-800 shadow-lg rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl">
    <h1 class="text-3xl font-bold text-yellow-500 mb-6 text-center">Бүртгүүлэх</h1>
    <form @submit.prevent="registerUser" class="bg-white p-8 rounded-lg shadow-lg">
      <div class="mb-6">
        <label for="name" class="block text-sm font-medium text-gray-700">Нэр</label>
        <input
          type="text"
          v-model="name"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div class="mb-6">
        <label for="email" class="block text-sm font-medium text-gray-700">Имэйл хаяг</label>
        <input
          type="email"
          v-model="email"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700">Нууц үг</label>
        <UInput
          type="password"
          v-model="password"
          required
          placeholder="password..."
          class="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div class="mb-6">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Нууц үгийг баталгаажуулах</label>
        <input
          type="password"
          v-model="confirmPassword"
          required
          class="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
      >
        Бүртгүүлэх
      </button>
    </form>

    <p class="text-center mt-6 text-white">
      Аль хэдийн нэвтэрсэн үү? 
      <nuxt-link to="/login" class="text-yellow-400 hover:underline">Нэвтрэх</nuxt-link>
    </p>
  </div>
</template>

<script>
import { UInput } from '#components';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        alert('Нууц үг таарахгүй байна!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          this.$router.push('/login'); // Нэвтрэх хуудсанд шилжих
        } else {
          throw new Error(data.error || 'Бүртгэл хийхэд алдаа гарлаа!');
        }
      } catch (error) {
        console.error("Алдаа гарлаа:", error);
        alert(error.message);
      }
    }
  }
};
</script>

<style scoped>
/* Tailwind дээр нэмэлт загвар хэрэггүй */
</style>
