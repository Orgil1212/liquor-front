<template>
    <div class="container mx-auto py-10 max-w-lg">
      <h1 class="text-3xl font-bold mb-6">⚙️ Settings</h1>
      
      <form @submit.prevent="updateProfile" class="bg-white p-6 shadow-lg rounded-lg">
        <div class="mb-4">
          <label class="block text-gray-700">хаяг</label>
          <input v-model="address" type="text" class="w-full p-3 border rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Имэйл</label>
          <input v-model="email" type="email" class="w-full p-3 border rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Утасны дугаар</label>
          <input v-model="phone" type="text" class="w-full p-3 border rounded" required />
        </div>
  
        <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Хадгалах
        </button>
  
        <p v-if="message" class="mt-4 text-center" :class="{ 'text-red-600': isError, 'text-green-600': !isError }">
          {{ message }}
        </p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const address = ref("")
  const email = ref("")
  const phone = ref("")
  const message = ref("")
  const isError = ref(false)
  
  const loadUserProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser) {
      address.value = storedUser.address || ""
      email.value = storedUser.email || ""
      phone.value = storedUser.phone || ""
    }
  }
  
  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication token not found!")
      }
  
      const userInfo = {
        address: address.value,
        email: email.value,
        phone: phone.value
      }
  
      const response = await fetch('http://localhost:8080/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userInfo),
      })
  
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Profile update failed!")
      }
  
      // ✅ LocalStorage дээр шинэ мэдээллийг хадгалах
      localStorage.setItem('user', JSON.stringify(data.user))
  
      message.value = "Profile updated successfully!"
      isError.value = false
    } catch (error) {
      message.value = error.message || "An error occurred during profile update."
      isError.value = true
    }
  }
  
  // Хэрэглэгчийн одоогийн мэдээллийг ачаалах
  onMounted(loadUserProfile)
  </script>
  