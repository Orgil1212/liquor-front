<template>
  <nav class="relative bg-gray-900 p-4 shadow-2xl">
    <div class="container mx-auto flex justify-between items-center space-x-6">
      <a href="/" class="text-white font-extrabold text-2xl hover:text-red-500 transition-transform duration-300 transform hover:scale-105">
        Liquor Store
      </a>
      <ul class="flex space-x-8">
        <li class="group relative">
          <a href="/" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">Home</a>
          <!-- 3D хөвдөг эффектийг доорх div-ээр илэрхийлнэ -->
          <div class="absolute -bottom-2 left-1/2 w-0 h-1 bg-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
        </li>
        <li class="group relative">
          <a href="/products" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">Products</a>
          <div class="absolute -bottom-2 left-1/2 w-0 h-1 bg-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
        </li>
        <li class="group relative">
          <a href="/about" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">About Us</a>
          <div class="absolute -bottom-2 left-1/2 w-0 h-1 bg-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
        </li>
        <li class="group relative">
          <router-link to="/signin" class="text-white font-bold text-lg tracking-wider group-hover:text-red-500 transition duration-300">
            Нэвтрэх
          </router-link>
          <div class="absolute -bottom-2 left-1/2 w-0 h-1 bg-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
nav {
  background: linear-gradient(to right, #0f0f0f, #1c1c1c);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
}
</style>
