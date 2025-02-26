<template>
  <div>
    <Navbar />
    <header
      class="bg-cover bg-center h-screen text-white flex flex-col justify-center items-center"
      style="background-image: url('@/assets/zurag/header.png');"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      <h1 class="relative text-6xl font-extrabold mb-4 drop-shadow-2xl transform hover:scale-110 transition duration-500">
        Welcome to Liquor Store
      </h1>
      <p class="relative text-xl drop-shadow-xl">Хотын хамгийн шилдэг архи, дарсыг олж мэдээрэй</p>
      <button class="relative mt-4 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transform hover:scale-110 transition duration-500">
        Худалдаж авах
      </button>
    </header>

    <!-- Онцлох бүтээгдэхүүн хэсэг -->
    <section class="py-12 bg-gradient-to-br from-gray-100 to-gray-200">
      <div class="container mx-auto text-center">
        <h2 class="text-5xl font-bold mb-12 drop-shadow-lg">Онцлох бүтээгдэхүүн</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            v-for="(wine, index) in wines"
            :key="index"
            class="wine-card bg-white rounded-lg overflow-hidden transform transition duration-500 shadow-lg relative group"
          >
            <div class="relative">
              <img
                :src="wine.image"
                :alt="wine.name"
                class="w-full h-72 object-cover group-hover:opacity-90 transition duration-500"
              />
              <!-- Зургийн хүрээ -->
              <div class="absolute inset-0 border-4 border-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2">{{ wine.name }}</h3>
              <p class="text-gray-800 mb-4">{{ wine.description }}</p>
              <span class="text-red-600 text-3xl font-semibold">{{ wine.price }}</span>
              <button
                @click="showSlide(wine)"
                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transform hover:scale-105 transition duration-500"
              >
                Дэлгэрэнгүй
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Slide v-if="selectedWine" :wine="selectedWine" @close="selectedWine = null" />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import { ref, onMounted } from 'vue'
import Slide from '@/components/slide.vue'

// Зургийг импортлох
import wineImage1 from '@/assets/zurag/1.jpg';
import wineImageMerlot from '@/assets/zurag/merlot.png';
import wineImageChardonnay from '@/assets/zurag/chardonnay.png';

const wines = ref([]);
const selectedWine = ref(null);
const fetchWines = async () => {
  try {
    const userType = "regular";
    const productIds = [1, 2, 3];

    for (const productId of productIds) {
      const response = await fetch(`http://localhost:8080/product?user_type=${userType}&id=${productId}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const wineData = await response.json();
      let image;

      if (wineData.name === "Cabernet Sauvignon") {
        image = wineImage1;
      } else if (wineData.name === "Merlot") {
        image = wineImageMerlot;
      } else if (wineData.name === "Chardonnay") {
        image = wineImageChardonnay;
      }

      wines.value.push({
        name: wineData.name,
        description: wineData.description,
        price: wineData.price,
        image: image,
        userType: userType
      });
    }

  } catch (error) {
    console.error("Error fetching wines:", error);
  }
}

const showSlide = (wine) => {
  selectedWine.value = wine;
}

onMounted(fetchWines);
</script>

<style scoped>
/* Header хэсэг */
header {
  background-size: cover; /* Зургийг бүрэн харуулна */
  background-position: center; /* Зургийг төвлөрүүлнэ */
  position: relative; /* Байршлын хувьд үндсэн элемент болгож байна */
}

/* Hover үед opacity-г өөрчлөх */
.group:hover .group-hover\:opacity-90 {
  opacity: 0.9; /* 90% ил тод байна */
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1; /* 100% бүрэн харагдахуйц */
}

/* "Онцлох бүтээгдэхүүн" хэсгийн background уусгалт */
section.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f8fafc, #e5e7eb); /* Цайвар саарал өнгөний уусгалт */
}

/* Бүх элементийг урагш гаргаж ирэх */
.relative > * {
  z-index: 1;
}

/* 3D Эффекттэй карт */
.wine-card {
  perspective: 1000px; /* 3D харагдах өнцөг */
}

.wine-card:hover {
  transform: rotateY(10deg) scale(1.05); /* Карт 10 градус эргэнэ, мөн 1.05 дахин томорно */
  transition: transform 0.5s ease-in-out; /* Шилжилт нь 0.5 секунд үргэлжилнэ */
}

/* Товчлуурын hover эффектийг сайжруулна */
button {
  transition: transform 0.2s ease-in-out; /* Товчлуурын шилжилтийн хугацааг 0.2 секунд болгож байна */
}

button:hover {
  transform: scale(1.05); /* Hover үед товчлуур 1.05 дахин томорно */
}
</style>
