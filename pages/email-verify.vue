<template>
    <div class="container mx-auto py-10 max-w-lg text-center">
      <h1 class="text-3xl font-bold mb-4">📩 Имэйл баталгаажуулах</h1>
      <p class="text-gray-600">Таны имэйл хаяг баталгаажиж байна...</p>
      <p v-if="message" class="mt-4" :class="{ 'text-green-600': success, 'text-red-600': !success }">
        {{ message }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const message = ref("")
  const success = ref(false)
  
  const verifyEmail = async () => {
    console.log("📌 URL-аас авсан токен:", route.query.token) // 🔍 Debug
  
    try {
      const token = route.query.token // URL-аас токен авах
      if (!token) {
        throw new Error("Имэйл баталгаажуулах токен олдсонгүй!")
      }
  
      const response = await fetch(`http://localhost:8080/api/verify-email?token=${token}`, {
        method: 'GET'
      })
  
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Имэйл баталгаажуулахад алдаа гарлаа!")
      }
  
      message.value = "Имэйл амжилттай баталгаажлаа!"
      success.value = true
  
      setTimeout(() => {
        router.push("/")
      }, 3000)
  
    } catch (error) {
      message.value = error.message
      success.value = false
    }
  }
  
  onMounted(verifyEmail)
  </script>
  