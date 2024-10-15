<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-35 lg:px-8 flex-grow">
      <div class="lg:grid lg:grid-cols-2 lg:gap-12">
        <div class="lg:col-span-1">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Бидний тухай</h2>
          <p class="mt-4 text-lg text-gray-600">
            Liquor Store-т тавтай морилно уу. Бид маш олон төрлийн дарсаар хангадаг. 
            2024 онд үүсгэн байгуулагдсан манай эрхэм зорилго бол үйлчлүүлэгчиддээ хамгийн сайн сонголтыг санал болгож,
            ямар ч тохиолдлыг төгс дарсаар онцгой байлгах явдал юм.
          </p>
          <p class="mt-4 text-lg text-gray-600">
            Бид чанар, хэрэглэгчийн сэтгэл ханамжийг эрхэмлэн, манай дэлгүүрт орж ирсэн эсвэл манай вэб сайтад зочилсон 
            хүн бүрт мартагдашгүй туршлагыг бий болгодог. 
            Та онцгой мөчөө тэмдэглэж байгаа эсвэл зүгээр л тайвшруулах ундаа хайж байгаа эсэхээс үл хамааран танд 
            тохирох бүтээгдэхүүнийг бид танд санал болгож байна.
          </p>
        </div>
        <div class="lg:col-span-1 flex justify-center lg:justify-end">
          <img src="/assets/zurag/test.png" alt="Our Store" class="rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
/* Custom styles if needed */
</style>
