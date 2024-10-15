<template>
  <transition name="slide">
    <div v-if="visible" class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div class="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
        <h2 class="text-xl font-bold mb-2">{{ wine.name }}</h2>
        <img :src="wine.image" :alt="wine.name" class="w-full h-48 object-cover mb-4">
        <p class="text-gray-700 mb-2">{{ wine.description }}</p>
        <span class="text-red-500 text-xl">{{ wine.price }}</span>
        <div class="mt-4">
          <button @click="close" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">Хаах</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  wine: Object
})

const visible = ref(true)

const close = () => {
  visible.value = false
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
