<template>
          <navbar/>
    <div class="container mx-auto px-6 py-12">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-yellow-500 mb-4 animate-fade-in">Бидний тухай</h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Манай дэлгүүр танд хамгийн шилдэг ундаа, согтууруулах ундааг санал болгодог. Бид хэрэглэгчиддээ чанартай үйлчилгээ үзүүлэхийг эрхэмлэдэг. 🍷🍺🥂
        </p>
      </div>
  
      <!-- 🛠 ХЭРХЭН АЖИЛЛАДАГ ВЭ? -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <h2 class="text-2xl font-bold text-gray-800 mb-3">📦 Бид хэрхэн ажилладаг вэ?</h2>
          <p class="text-gray-600">
            Манай платформ онлайн болон оффлайн үйлчилгээг хослуулсан бөгөөд хэрэглэгчид хүссэн бүтээгдэхүүнээ онлайнаар сонгож, захиалга өгөх боломжтой.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <h2 class="text-2xl font-bold text-gray-800 mb-3">🚚 Хүргэлтийн үйлчилгээ</h2>
          <p class="text-gray-600">
            Бид таны захиалгыг хурдан шуурхай хүргэж өгнө. Томоохон захиалгад нэмэлт хөнгөлөлт, урамшуулалтай! 
          </p>
        </div>
      </div>
  
      <!-- 🌟 МАНАЙ БАГ -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">🌟 Манай Баг</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Бид чадварлаг, туршлагатай хамт олон бөгөөд хэрэглэгчдэдээ өндөр түвшний үйлчилгээ үзүүлэхийг эрмэлздэг.  
        </p>
      </div>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="member in team" :key="member.id" class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <img :src="member.image" alt="Team Member" class="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
          <h3 class="text-xl font-semibold text-gray-800 text-center">{{ member.name }}</h3>
          <p class="text-gray-600 text-center">{{ member.role }}</p>
        </div>
      </div>
  
      <!-- 📞 ХОЛБОО БАРИХ -->
      <div class="mt-12 bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">📞 Холбоо барих</h2>
        <p class="text-lg text-gray-600">Асуулт байвал бидэнтэй холбогдоорой!</p>
        <div class="mt-4">
          <p class="text-lg font-semibold text-gray-800">📍 Хаяг: Улаанбаатар хот</p>
          <p class="text-lg font-semibold text-gray-800">📞 Утас: +976 99112233</p>
          <p class="text-lg font-semibold text-gray-800">📧 Имэйл: info@liquorstore.mn</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        team: [
          { id: 1, name: 'Бат-Эрдэнэ', role: 'Үүсгэн байгуулагч', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
          { id: 2, name: 'Цэцэгмаа', role: 'Менежер', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
          { id: 3, name: 'Ганбаатар', role: 'Хүргэлтийн ажилтан', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
          { id: 4, name: 'Сувдаа', role: 'Үйлчлүүлэгчийн үйлчилгээ', image: 'https://randomuser.me/api/portraits/women/4.jpg' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Fade-in анимаци */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
  </style>
  