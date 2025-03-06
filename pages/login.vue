<template>
  <Navbar />
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-800">
    <h1 class="text-4xl font-extrabold text-yellow-500 mb-6">Sign In</h1>

    <!-- 🔹 НЭВТРЭХ ФОРМ (Хэрэв профайл бүрдүүлээгүй бол) -->
    <form v-if="!isProfileCompleted" @submit.prevent="handleSignIn" class="bg-white p-8 rounded-lg shadow-lg w-80">
      <input
        v-model="username"
        placeholder="Username"
        required
        class="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button
        type="submit"
        class="w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 flex items-center justify-center"
        :disabled="loading"
      >
        <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
        {{ loading ? "Signing In..." : "Sign In" }}
      </button>
      <p v-if="message" :class="{ 'text-red-600': isError, 'text-green-600': !isError }" class="mt-4 text-center">
        {{ message }}
      </p>
    </form>

    <!-- 🔹 ПРОФАЙЛ БҮРДҮҮЛЭХ ФОРМ -->
    <form v-else @submit.prevent="updateProfile" class="bg-white p-8 rounded-lg shadow-lg w-80">
<<<<<<< HEAD
=======
      <h2>
        
      </h2>
>>>>>>> e167b9c (update)
      <h2 class="text-2xl font-extrabold text-yellow-600 mb-4">User Information</h2>
      <input
        v-model="address"
        placeholder="Address"
        required
        class="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <input
        v-model="phone"
        placeholder="Phone Number"
        required
        class="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button
        type="submit"
        class="w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 flex items-center justify-center"
        :disabled="loading"
      >
        <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
        {{ loading ? "Saving..." : "Save Information" }}
      </button>
    </form>

    <!-- 🔹 БҮРТГЭЛГҮЙ ХЭРЭГЛЭГЧИД "SIGN UP" ХИЙХ -->
    <p class="mt-4 text-center text-white">
      Don't have an account?
      <button @click="goToSignUp" class="text-yellow-400 hover:underline">Sign Up</button>
    </p>
  </div>
  <Footer />
</template>

<script>
<<<<<<< HEAD
=======
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

>>>>>>> e167b9c (update)
export default {
  data() {
    return {
      username: '',
      password: '',
      address: '',
      email: '',
      phone: '',
      message: '',
      isError: false,
      isProfileCompleted: false,
      loading: false // ✅ Ачаалж байгаа төлөв нэмсэн
    };
  },
  methods: {
    async handleSignIn() {
      this.loading = true; // ✅ Товч дармагц "Signing In..." төлөв харуулах
      try {
        const response = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.username, password: this.password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Login failed!");
        }
<<<<<<< HEAD

        // ✅ Токен болон хэрэглэгчийн мэдээллийг хадгалах
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
=======
        
        // ✅ Токен болон хэрэглэгчийн мэдээллийг хадгалах
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(jwtDecode(data.token)));
        // localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
>>>>>>> e167b9c (update)

        this.message = "Амжилттай нэвтэрлээ!";
        this.isError = false;

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

      } catch (error) {
        this.message = error.message || "Нэвтрэх үед алдаа гарлаа.";
        this.isError = true;
      } finally {
        this.loading = false;
      }
    },
    async handleLogin() {
<<<<<<< HEAD
  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.email, password: this.password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Login failed!");

    // ✅ LocalStorage-д user хадгалах (JSON форматтай)
    localStorage.setItem("user", JSON.stringify({ id: data.user_id, name: data.name, email: data.email }));

    // ✅ Амжилттай login хийсний дараа Home хуудас руу шилжүүлэх
    window.location.href = "/";
  } catch (error) {
    this.message = error.message || "Нэвтрэхэд алдаа гарлаа!";
    this.isError = true;
  }
},
=======
      try {
        const response = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Login failed!");

        // ✅ LocalStorage-д user хадгалах (JSON форматтай)
        localStorage.setItem("user", JSON.stringify({ id: data.user_id, name: data.name, email: data.email }));

        // ✅ Амжилттай login хийсний дараа Home хуудас руу шилжүүлэх
        window.location.href = "/";
      } catch (error) {
        this.message = error.message || "Нэвтрэхэд алдаа гарлаа!";
        this.isError = true;
      }
    },  
>>>>>>> e167b9c (update)


    async updateProfile() {
      this.loading = true;
      try {
        const userInfo = {
          address: this.address,
          email: this.email,
          phone: this.phone
        };

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found!");
        }

        const response = await fetch('http://localhost:8080/api/update-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(userInfo),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Profile update failed");
        }

        this.message = "Profile updated successfully!";
        this.isError = false;
        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

      } catch (error) {
        this.message = error.message || "Profile update error.";
        this.isError = true;
      } finally {
        this.loading = false;
      }
    },

    goToSignUp() {
      this.$router.push({ name: 'register' });
    }
  }
};
</script>
