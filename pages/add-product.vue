<template>
  <div class="container mx-auto p-4">
    <navbar />
    <h1 class="text-3xl font-semibold text-center mb-8">Бүтээгдэхүүн нэмэх</h1>
    <form @submit.prevent="addProduct" class="max-w-md mx-auto bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-600 p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Нэр</label>
        <input type="text" v-model="name" id="name" required class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700">Үнэ</label>
        <input type="text" v-model="price" id="price" required class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Тодорхойлолт</label>
        <textarea v-model="description" id="description" required rows="4" class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">Зураг</label>
        <input type="file" @change="handleFileUpload" id="image" required class="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
      </div>
      <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
        Нэмэх
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      price: '',
      description: '',
      image: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0]; // Store the uploaded image
    },
    async addProduct() {
      if (!this.name || !this.description || !this.price || !this.image) {
        console.error("All fields are required.");
        return;
      }

      const parsedPrice = parseFloat(this.price);
      if (isNaN(parsedPrice)) {
        console.error("Invalid price format.");
        return;
      }

      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('price', parsedPrice); // Ensure price is a valid number
      formData.append('image', this.image); // Append the image

      try {
        // Send the data to the API
        const response = await fetch('http://localhost:8080/api/products', {
          method: 'POST',  // POST request
          body: formData,  // formData contains user input
        });

        // Check response status
        if (response.ok) {  // If the response is successful
          const data = await response.json();  // Parse the response as JSON
          console.log('Product created successfully:', data);  // Log the success
        } else {
          console.error('Error creating product:', response.statusText);  // Log the error
        }
      } catch (error) {
        console.error('Error adding product:', error);  // Log any other errors
      }
    }
  }
}
</script>

<style scoped>
/* Additional styles can be added here */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #4c51bf, #667eea);
}

/* Form background customization */
form {
  background-color: rgba(255, 255, 255, 0.8); /* Light transparent background */
}
</style>
