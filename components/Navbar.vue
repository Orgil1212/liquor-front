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

        <!-- Хэрэв хэрэглэгч Login хийгээгүй бол "Login" товч гарна -->
        <li v-if="!isLoggedIn" class="group relative">
          <router-link to="/login" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">
            Login
          </router-link>
        </li>

        <!-- Хэрэв хэрэглэгч Login хийсэн бол Profile icon гарч ирнэ -->
        <li v-else class="relative">
          <button @click="toggleDropdown" class="flex items-center space-x-2">
            <UserCircleIcon class="w-10 h-10 text-white cursor-pointer hover:text-red-500 transition duration-300" />
          </button>

          <!-- Dropdown цонх -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <!-- Хэрэглэгчийн нэр, email -->
            <div class="px-4 py-2 text-gray-900 border-b">
              <p class="text-sm font-semibold">{{ user.name }}</p>
              <p class="text-xs text-gray-600">{{ user.email }}</p>
            </div>

            <!-- Settings -->
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
import { UserCircleIcon } from '@heroicons/vue/24/solid' // Heroicons сангаас UserCircleIcon импортлох

const router = useRouter()
const isLoggedIn = ref(false)
const showDropdown = ref(false)
const user = ref({ name: '', email: '' })

// Dropdown menu-г toggle хийх
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Logout үйлдэл
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  user.value = { name: '', email: '' }
  router.push({ name: 'Home' })
}

// **Login хийсэн эсэхийг шалгах**
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    isLoggedIn.value = true
    user.value = JSON.parse(storedUser)
  }
})
</script>

<style scoped>
nav {
  background: linear-gradient(to right, #0f0f0f, #1c1c1c);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
}

/* Dropdown menu-ийн дизайн */
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
