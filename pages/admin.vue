<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">🛠 Админ Хяналтын Самбар</h1>

        <!-- Loading & Error Handling -->
        <div v-if="loading" class="text-center text-gray-500 text-lg">Ачааллаж байна...</div>
        <div v-if="error" class="text-center text-red-500 text-lg">Алдаа гарлаа: {{ error }}</div>

        <!-- Dashboard Stats -->
        <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold">🛍 Нийт бүтээгдэхүүн</h2>
                <p class="text-3xl font-semibold">{{ dashboardData.total_products }}</p>
            </div>
            <div class="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold">🛒 Сагсны бүтээгдэхүүн</h2>
                <p class="text-3xl font-semibold">{{ dashboardData.total_cartItems }}</p>
            </div>
            <div class="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold">📦 Нийт захиалга</h2>
                <p class="text-3xl font-semibold">{{ dashboardData.total_orders }}</p>
            </div>
            <div class="bg-red-500 text-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold">👥 Нийт хэрэглэгч</h2>
                <p class="text-3xl font-semibold">{{ dashboardData.total_users }}</p>
            </div>
        </div>

        <!-- Cart Items Table -->
        <h2 class="text-2xl font-bold mt-8">🛒 Сагсны Бүтээгдэхүүнүүд</h2>
        <table class="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border p-2">Хэрэглэгч</th>
                    <th class="border p-2">Бүтээгдэхүүн</th>
                    <th class="border p-2">Тоо</th>
                    <th class="border p-2">Үнэ</th>
                    <th class="border p-2">Нийт</th>
                    <th class="border p-2">Үйлдэл</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cart in dashboardData.cart_items" :key="cart.id">
                    <td class="border p-2">{{ cart.user_id }}</td>
                    <td class="border p-2">{{ cart.product_name }}</td>
                    <td class="border p-2">{{ cart.quantity }}</td>
                    <td class="border p-2">{{ formatPrice(cart.price) }}</td>
                    <td class="border p-2">{{ formatPrice(cart.price * cart.quantity) }}</td>
                    <td class="border p-2 text-center">
                        <button @click="deleteCartItem(cart.id)" class="bg-red-500 text-white px-3 py-1 rounded-md">
                            ❌ Устгах
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Orders Table -->
        <h2 class="text-2xl font-bold mt-8">📦 Захиалгууд</h2>
        <table class="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border p-2">Захиалагч</th>
                    <th class="border p-2">Огноо</th>
                    <th class="border p-2">Нийт үнэ</th>
                    <th class="border p-2">Төлөв</th>
                    <th class="border p-2">Үйлдэл</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in dashboardData.orders" :key="order.id">
                    <td class="border p-2">{{ order.user_id }}</td>
                    <td class="border p-2">{{ order.created_at }}</td>
                    <td class="border p-2">{{ formatPrice(order.total_price) }}</td>
                    <td class="border p-2">{{ order.status }}</td>
                    <td class="border p-2 text-center">
                        <button @click="deleteOrder(order.id)" class="bg-red-500 text-white px-3 py-1 rounded-md">
                            ❌ Устгах
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const dashboardData = ref({});
        const loading = ref(true);
        const error = ref(null);

        const fetchAdminDashboardData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/admin/dashboard');
                if (!response.ok) throw new Error("Админ Dashboard өгөгдөл татах үед алдаа гарлаа!");

                dashboardData.value = await response.json();
            } catch (err) {
                error.value = err.message;
            } finally {
                loading.value = false;
            }
        };

        const deleteCartItem = async (id) => {
  console.log("🛠️ Устгах гэж буй Cart ID:", id);

  if (!id || id === "undefined") {
    alert("⚠️ Устгах ID буруу байна! Cart ID: " + id);
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/admin/cart/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error || "Сагсны бүтээгдэхүүнийг устгах үед алдаа гарлаа!");
    }

    fetchAdminDashboardData();
  } catch (err) {
    alert("❌ Алдаа: " + err.message);
  }
};


        const deleteOrder = async (id) => {
            if (!confirm("Та энэ захиалгыг устгахдаа итгэлтэй байна уу?")) return;

            try {
                const response = await fetch(`http://localhost:8080/api/admin/orders/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.error || "Захиалгыг устгах үед алдаа гарлаа!");
                }

                fetchAdminDashboardData();
            } catch (err) {
                alert("❌ Алдаа: " + err.message);
            }
        };

        onMounted(fetchAdminDashboardData);

        return {
            dashboardData,
            loading,
            error,
            deleteCartItem,
            deleteOrder,
            formatPrice: (price) => new Intl.NumberFormat('mn-MN', {
                style: 'currency',
                currency: 'MNT',
                minimumFractionDigits: 0
            }).format(price),
        };
    }
};
</script>
