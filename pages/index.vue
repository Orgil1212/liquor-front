<template>
  <div>
    <Navbar />
    <header
      class="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-black"
    >
      <!-- Background Slideshow -->
      <div class="absolute inset-0 w-full h-full">
        <transition-group name="fade" tag="div">
          <img
            v-for="(image, index) in images"
            v-show="index === currentImageIndex"
            :key="index"
            :src="image"
            class="absolute inset-0 w-full h-full object-cover brightness-75"
          />
        </transition-group>
      </div>
      
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/60"></div>
      
      <!-- Content -->
      <div class="relative text-center z-10 animate-fadeInUp">
        <h1 class="text-6xl font-extrabold mb-4 drop-shadow-2xl text-white">
          Welcome to <span class="text-red-500">Liquor Store</span>
        </h1>
        <p class="text-2xl drop-shadow-lg text-gray-200 max-w-2xl mx-auto">
          Хотын хамгийн <span class="text-red-400 font-semibold">шилдэг</span>, <span class="text-yellow-400 font-semibold">онцгой</span>, <span class="text-green-400 font-semibold">шинэ</span> архи, дарсыг олж мэдээрэй
        </p>
        <button 
          @click="goToProducts"
          class="mt-6 px-10 py-4 bg-gradient-to-r from-red-600 to-red-400 text-white text-lg font-semibold rounded-full hover:from-red-700 hover:to-red-500 shadow-lg transform hover:scale-110 transition duration-500 animate-bounce"
        >
          Худалдаж авах
        </button>
      </div>
    </header>
    
    <!-- Featured Products with Discounts and Filters -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-10 text-red-500">Онцлох бүтээгдэхүүн</h2>
        
        <!-- Product Filter -->
        <div class="mb-6 flex justify-center gap-4">
          <button @click="filterProducts('all')" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-red-500">Бүгд</button>
          <button @click="filterProducts('discount')" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-red-500">Хямдралтай</button>
          <button @click="filterProducts('premium')" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-red-500">Тансаг</button>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            v-for="(product, index) in filteredProducts"
            :key="index"
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 duration-500"
          >
            <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
              <p class="text-gray-300 mb-4">{{ product.description }}</p>
              <span class="text-red-400 text-2xl font-semibold">{{ product.price }}</span>
              <span v-if="product.discount" class="text-green-400 text-lg font-semibold ml-2">{{ product.discount }}% OFF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-16 bg-black text-white">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-10 text-yellow-400">Хэрэглэгчийн сэтгэгдэл</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(review, index) in reviews" :key="index" class="p-6 bg-gray-800 rounded-lg shadow-lg">
            <p class="text-gray-300 mb-4">"{{ review.comment }}"</p>
            <h4 class="text-lg font-semibold text-white">— {{ review.name }}</h4>
            <p class="text-yellow-400">★★★★★</p>
          </div>
        </div>
        
        <!-- Add Review Form -->
        <div class="mt-10 max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-4 text-white">Сэтгэгдэл үлдээх</h3>
          <input v-model="newReview.name" placeholder="Нэрээ оруулна уу" class="w-full p-2 mb-4 rounded text-black" />
          <textarea v-model="newReview.comment" placeholder="Сэтгэгдлээ бичнэ үү" class="w-full p-2 mb-4 rounded text-black"></textarea>
          <button @click="addReview" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Илгээх</button>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToProducts = () => {
  router.push('/products');
};

// Background Slideshow Images
const images = [
  '/images/icon.jpg',
  '/images/header.jpg',
  '/images/2.jpg'
];
const currentImageIndex = ref(0);

const changeImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

onMounted(() => {
  setInterval(changeImage, 5000); // Change image every 5 seconds
});

// Testimonials Section Data
const reviews = ref([
  { name: "Батбаяр", comment: "Хамгийн чанартай дарсууд энд байна!" },
  { name: "Солонго", comment: "Хүргэлт хурдан, амт нь гайхалтай!" },
  { name: "Энх-Амгалан", comment: "Эндээс дарс авахад хэзээ ч харамсахгүй!" },
]);

const newReview = ref({ name: '', comment: '' });

const addReview = () => {
  if (newReview.value.name && newReview.value.comment) {
    reviews.value.push({ ...newReview.value });
    newReview.value.name = '';
    newReview.value.comment = '';
  }
};
</script>
