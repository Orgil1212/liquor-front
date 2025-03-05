<template>
  <Navbar/>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">🛒 Миний Сагс</h1>

    <div v-if="loading" class="text-center text-gray-500 text-lg">Ачааллаж байна...</div>
    <div v-if="error" class="text-center text-red-500 text-lg">Алдаа гарлаа: {{ error }}</div>

    <div v-if="cart.length === 0 && !loading" class="text-center text-gray-600 text-lg">Сагс хоосон байна.</div>

    <div v-else>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Бүтээгдэхүүн</th>
            <th class="border p-2">Үнэ</th>
            <th class="border p-2">Тоо</th>
            <th class="border p-2">Нийт</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.product_id">
            <td class="border p-2">{{ item.product_name }}</td>
            <td class="border p-2">{{ formatPrice(item.price) }}</td>
            <td class="border p-2">{{ item.quantity }}</td>
            <td class="border p-2">{{ formatPrice(item.price * item.quantity) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4 text-xl font-bold text-right">
        Нийт: {{ formatPrice(totalPrice) }}
      </div>

      <button
        @click="placeOrder"
        class="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg font-medium"
      >
        📝 Захиалга хийх
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const cart = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchCart = async () => {
  try {
    console.log("🛠 FetchCart function called!");

    const userData = localStorage.getItem("user");
    console.log("📌 LocalStorage user data:", userData);

    if (!userData) {
      console.warn("⚠️ LocalStorage дотор 'user' мэдээлэл олдсонгүй.");
      return;
    }

    let user;
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("❌ 'user' JSON биш форматтай байна!", error);
      return;
    }

    console.log("✅ Parsed User Data:", user);

    if (!user || !user.id) {
      console.warn("⚠️ User ID олдсонгүй. Нэвтрэх шаардлагатай.");
      return;
    }

    console.log(`🚀 Fetching data from: http://localhost:8080/api/cart/${user.id}`);

    const response = await fetch(`http://localhost:8080/api/cart/${user.id}`);
    console.log("🔄 Fetch response status:", response.status);

    if (!response.ok) throw new Error("Сагсны мэдээлэл авахад алдаа гарлаа!");

    // **JSON биш response буцааж байгааг шалгах**
    const responseText = await response.text();
    console.log("🔍 Raw Response from API:", responseText); // 🚀 Response JSON биш бол энд харагдана

    try {
      const data = JSON.parse(responseText);
      console.log("✅ Parsed JSON Data:", data);
      cart.value = data;
    } catch (err) {
      console.error("❌ JSON Parse Error:", err);
    }

  } catch (err) {
    console.error("❌ FetchCart алдаа:", err);
  } finally {
    loading.value = false;
  }
};


    onMounted(fetchCart);

    return {
      cart,
      loading,
      error,
      totalPrice: computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)),
      formatPrice: (price) => new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT' }).format(price),
    };
  }
};
</script>
