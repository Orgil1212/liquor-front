<template>
  <nav class="relative bg-gray-900 p-4 shadow-2xl">
    <div class="container mx-auto flex justify-between items-center space-x-6">
      <a href="/" class="text-white font-extrabold text-2xl hover:text-red-500 transition-transform duration-300 transform hover:scale-105">
        Liquor Store
      </a>

      <ul class="flex space-x-8">
        <li class="group relative">
          <a href="/" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">Home</a>
        </li>
        <li class="group relative">
          <a href="/products" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">Products</a>
        </li>
        <li class="group relative">
          <a href="/about" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">About Us</a>
        </li>

        <!-- Cart Icon (Only if Logged In) -->
        <li v-if="isLoggedIn" class="relative">
          <router-link to="/cart" class="relative flex items-center space-x-2 text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">
            <ShoppingCartIcon class="w-7 h-7 text-white hover:text-red-500 transition duration-300" />
            <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {{ cartItemCount }}
            </span>
          </router-link>
        </li>

        <!-- Login Button (If Not Logged In) -->
        <li v-if="!isLoggedIn" class="group relative">
          <router-link to="/login" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">
            Login
          </router-link>
        </li>

        <!-- Profile Icon (If Logged In) -->
        <li v-else class="relative">
          <button @click="toggleDropdown" class="flex items-center space-x-2">
            <UserCircleIcon class="w-10 h-10 text-white cursor-pointer hover:text-red-500 transition duration-300" />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <!-- User Info -->
            <div class="px-4 py-2 text-gray-900 border-b">
              <p class="text-sm font-semibold">{{ user.name }}</p>
              <p class="text-xs text-gray-600">{{ user.email }}</p>
            </div>

            <router-link
              to="/settings"
              class="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
            >
              ⚙️ Settings
            </router-link>

            <router-link
              to="/email-verify"
              class="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
            >
              📩 Email Verify
            </router-link>

            <!-- Logout -->
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              🚪 Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid' // Heroicons icons

const router = useRouter()
const isLoggedIn = ref(false)
const showDropdown = ref(false)
const user = ref({ name: '', email: '' })
const cartItemCount = ref(0) // Stores cart count

// Toggle Profile Dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Logout function
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  user.value = { name: '', email: '' }
  cartItemCount.value = 0 // Reset cart count
  router.push({ name: 'Home' })
}

// Fetch Cart Data
const fetchCartData = async () => {
  try {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    const parsedUser = JSON.parse(storedUser)
    isLoggedIn.value = true
    user.value = parsedUser

    const response = await fetch(`http://localhost:8080/api/cart/${parsedUser.id}`)
    if (!response.ok) throw new Error('Failed to fetch cart data')

    const cartData = await response.json()
    cartItemCount.value = cartData.length
  } catch (err) {
    console.error("❌ Cart data fetch error:", err)
  }
}

// Check login status & fetch cart data on mount
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    isLoggedIn.value = true
    user.value = JSON.parse(storedUser)
    fetchCartData()
  }
})
</script>

<style scoped>
nav {
  background: linear-gradient(to right, #0f0f0f, #1c1c1c);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
}

/* Dropdown menu styling */
div[role="menu"] {
  border-radius: 8px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

div[role="menu"] a,
div[role="menu"] button {
  padding: 10px 20px;
  display: block;
  width: 100%;
  text-align: left;
}
</style>
