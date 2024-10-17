<template>
  <div>
    <h1 class="text-7xl mb-5">Aquaman Betta Fish</h1>
    <ul>
      <li v-for="fish in fishes" :key="fish._id" class="mb-4">
        <img
          :src="getFishImageUrl(fish.image)"
          alt="Betta Fish"
          class="w-32 h-32 object-cover"
        />
        <div>สายพันธ์ุ: {{ fish.breed }}</div>
        <div>อายุ: {{ fish.age }}</div>
        <div>ขนาด: {{ fish.size }}</div>
        <div>สี: {{ fish.color }}</div>
      </li>
    </ul>
    <p v-if="error">Error loading fishes: {{ error.message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const fishes = ref([]);
const error = ref(null);

// ฟังก์ชันเพื่อดึงข้อมูลจาก API
const fetchFishes = async () => {
  try {
    const { data, error: fetchError } = await useFetch("/api/fish");

    if (fetchError.value) {
      throw fetchError.value;
    }

    fishes.value = data.value; // อัปเดตค่าที่นี่
  } catch (err) {
    error.value = err;
    console.error("Failed to fetch fishes:", err);
  }
};

// ฟังก์ชันเพื่อสร้าง URL สำหรับรูปภาพ
const getFishImageUrl = (filename) => {
  return `/api/fish/image/${filename}`; // เปลี่ยนเป็นเส้นทางที่ถูกต้องสำหรับการดึงรูปภาพ
};

fetchFishes(); // เรียกฟังก์ชันเพื่อดึงข้อมูล
</script>
