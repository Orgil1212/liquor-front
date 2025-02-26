<template>
    <navbar/>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">🛒 Миний сагс</h1>
  
      <div v-if="loading" class="text-center text-gray-500 text-lg">Ачааллаж байна...</div>
      <div v-if="error" class="text-center text-red-500 text-lg">Алдаа гарлаа: {{ error }}</div>
  
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in cartItems" :key="item.id" class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800">{{ item.product_name }}</h3>
          <p class="text-lg text-gray-600">Тоо: {{ item.quantity }}</p>
          <button @click="removeFromCart(item.id)" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
            ❌ Устгах
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuth } from '~/composables/auth';
  
  export default {
    setup() {
      const { user, isAuthenticated, loadUser } = useAuth();
      onMounted(() => {
        loadUser();
      });
  
      return { user, isAuthenticated };
    },
    data() {
      return {
        cartItems: [],
        loading: true,
        error: null
      };
    },
    async created() {
      await this.fetchCart();
    },
    methods: {
      async fetchCart() {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          const response = await fetch(`http://localhost:8080/api/cart/${user.id}`);
          if (!response.ok) throw new Error("Сагсны өгөгдлийг татахад алдаа гарлаа!");
          this.cartItems = await response.json();
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
        }
      },
      async removeFromCart(id) {
        await fetch(`http://localhost:8080/api/cart/${id}`, { method: "DELETE" });
        this.cartItems = this.cartItems.filter(item => item.id !== id);
      }
    }
  };
  </script>
  