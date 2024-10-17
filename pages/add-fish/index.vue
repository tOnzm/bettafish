<template>
  <div>
    <h1 class="text-6xl">Add Betta Fish</h1>
    <form @submit.prevent="addFish">
      <input type="file" @change="onFileChange" accept="image/*" />
      <input v-model="fish.breed" placeholder="สายพันธุ์" required />
      <input v-model="fish.age" type="number" placeholder="Age" required />
      <input v-model="fish.size" placeholder="Size" required />
      <input v-model="fish.color" placeholder="Color" required />
      <input v-model="fish.gender" placeholder="Gender" required />
      <input v-model="fish.healthStatus" placeholder="Health Status" required />
      <button type="submit">Add Fish</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const fish = ref({
  breed: "",
  age: null,
  size: "",
  color: "",
  gender: "",
  healthStatus: "",
  image: null, // Property to store the image file
});

const onFileChange = (event) => {
  const file = event.target.files[0]; // Get the first file
  if (file) {
    fish.value.image = file; // Store the file in the fish object
  }
};

const addFish = async () => {
  const formData = new FormData();

  // ตรวจสอบว่าไฟล์อยู่ใน fish.value.image
  if (!fish.value.image) {
    alert("Please select an image file.");
    return;
  }

  // Append each property to FormData
  for (const key in fish.value) {
    formData.append(key, fish.value[key]);
  }

  try {
    const { data, error } = await useFetch("/api/fish", {
      method: "POST",
      body: formData,
    });

    if (error.value) {
      throw new Error(error.value);
    }

    alert("Fish added successfully");
    // Reset the form after successful submission
    resetForm();
  } catch (err) {
    alert("Error adding fish: " + err.message);
  }
};

// Function to reset the form
const resetForm = () => {
  fish.value = {
    breed: "",
    age: null,
    size: "",
    color: "",
    gender: "",
    healthStatus: "",
    image: null,
  };
};
</script>
