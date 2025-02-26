<template>
    <footer class="bg-gray-800 p-4">
      <div class="container mx-auto text-center">
        <p class="text-white">© {{year}} {{day}} Liquor Store. Бүх эрх хуулиар хамгаалагдсан.</p>
      </div>
    </footer>
  </template>
  
  <script setup>
  let year = new Date().getFullYear();
  let day = new Date().getDate();
  // Энэ компонентын логик оруулах шаардлагагүй.
  </script>
  
  <style scoped>
  /* Footer-ын стилийг энд оруулж болно */
  </style>
  