<template>
  <Navbar />
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">🛍 Бүтээгдэхүүнүүд</h1>

    <!-- Loading & Error Handling -->
    <div v-if="loading" class="text-center text-gray-500 text-lg">Ачааллаж байна...</div>
    <div v-if="error" class="text-center text-red-500 text-lg">Алдаа гарлаа: {{ error }}</div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
      >
        <!-- Product Image -->
        <div class="relative w-full h-52 overflow-hidden rounded-lg bg-gray-100">
          <img
            :src="getImageUrl(product.image)"
            alt="product image"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <!-- Product Details -->
        <div class="mt-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ product.name }}</h3>
          <p class="text-lg text-gray-600 font-medium mt-1">{{ formatPrice(product.price) }}</p>
          <p class="text-sm text-gray-500 mt-2 truncate">{{ product.description }}</p>
        </div>

        <!-- Quantity Selector & Add to Cart -->
        <div v-if="isAuthenticated" class="mt-4 flex items-center space-x-3">
          <button 
            @click="decreaseQuantity(product.id)"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-md"
          >-</button>

          <!-- 🏆 Тоо ширхэгийг төвд нь томоор харуулах -->
          <span class="text-xl font-bold bg-gray-200 px-4 py-2 rounded-md">{{ cartQuantities[product.id] || 1 }}</span>

          <button 
            @click="increaseQuantity(product.id)"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-md"
          >+</button>

          <button
            @click="addToCart(product)"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg font-medium transition-all ml-2"
          >
            🛒 Сагслах
          </button>
        </div>

        <button
          v-else
          @click="redirectToLogin"
          class="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg text-lg font-medium transition-all"
        >
          Нэвтрэх 🔑
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '~/composables/auth.js';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const { user, isAuthenticated, loadUser } = useAuth();
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const cartQuantities = ref({});

    // 🔥 Nuxt client дээр LocalStorage-ээс хэрэглэгчийн мэдээлэл авах
    onMounted(async () => {
      loadUser();
      await fetchProducts();
    });

    const fetchProducts = async () => {
      try {
        console.log("📡 Бүтээгдэхүүний мэдээлэл татаж байна...");
        const response = await fetch('http://localhost:8080/api/products');

        if (!response.ok) throw new Error("Серверээс өгөгдөл татах үед алдаа гарлаа!");

        const data = await response.json();
        console.log("✅ Амжилттай татлаа:", data);
        products.value = data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    const addToCart = async (product) => {
      if (!isAuthenticated.value) {
        window.location.href = "/login";
        return;
      }

      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          throw new Error("Хэрэглэгчийн мэдээлэл олдсонгүй. Нэвтэрч орно уу.");
        }

        const quantity = cartQuantities.value[product.id] || 1;

        const response = await fetch('http://localhost:8080/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id, product_id: product.id, quantity }),
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Сагслахад алдаа гарлаа!");
        alert(`${product.name} (${quantity} ширхэг) сагсанд нэмэгдлээ!`);
      } catch (err) {
        alert("Алдаа: " + err.message);
      }
    };

    const increaseQuantity = (productId) => {
      if (!cartQuantities.value[productId]) {
        cartQuantities.value[productId] = 1;
      }
      cartQuantities.value[productId]++;
    };

    const decreaseQuantity = (productId) => {
      if (cartQuantities.value[productId] && cartQuantities.value[productId] > 1) {
        cartQuantities.value[productId]--;
      }
    };

    return {
      user,
      isAuthenticated,
      products,
      loading,
      error,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      cartQuantities,
      getImageUrl: (imagePath) => `http://localhost:8080/${imagePath}`,
      formatPrice: (price) => new Intl.NumberFormat('mn-MN', {
        style: 'currency',
        currency: 'MNT',
        minimumFractionDigits: 0
      }).format(price),
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}
</style>
