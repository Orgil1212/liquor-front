<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    <Navbar />
    <div class="max-w-7xl mx-auto p-8 flex-grow">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
            v-for="(wine, index) in wines" 
            :key="index" 
            class="relative bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-500"
          >
          <div class="relative">
            <img 
              class="w-full h-64 object-cover transition duration-500 hover:opacity-90"
              :src="wine.image" 
              :alt="wine.name"
            >
            <div class="absolute inset-0 border-4 border-transparent rounded-lg transition duration-500"></div>
          </div>
          <div class="p-4 text-center">
            <h1 class="text-lg font-bold mb-2 text-gray-800">{{ wine.name }}</h1>
            <p class="text-gray-600 mb-4">{{ wine.description }}</p>
            <span class="text-2xl text-red-500 font-semibold">{{ wine.price }}</span>
            <button 
              @click="addToCart(wine)"
              class="mt-2 px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-md transform hover:scale-90"
            >
              Сагсанд нэмэх
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer /> 
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import wine1 from '@/assets/zurag/1.jpg';
import wineMerlot from '@/assets/zurag/merlot.png';
import wineChardonnay from '@/assets/zurag/chardonnay.png';

interface Wine {
    name: string;
    description: string;
    price: string;
    image: string;
}

const wines: Wine[] = [
    { name: "Cabernet Sauvignon", description: "A full-bodied red wine", price: "$19.99", image: wine1 },
    { name: "Merlot", description: "A smooth red wine", price: "$18.99", image: wineMerlot },
    { name: "Chardonnay", description: "A popular white wine", price: "$20.99", image: wineChardonnay },
];

const cart = ref<Wine[]>([]);

const addToCart = (wine: Wine) => {
  cart.value.push(wine);
  alert(`${wine.name} сагсанд нэмэгдлээ!`);
}
</script>

<style scoped>
/* Сүүдэр болон 3D эффект нэмсэн */
.grid > div {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s, box-shadow 0.5s;
}

.grid > div:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 50px rgba(0, 0, 0, 0.1);
}

img {
  transition: opacity 0.5s;
}

img:hover {
  opacity: 0.85;
}
</style>
