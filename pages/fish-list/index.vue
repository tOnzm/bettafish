<template>
  <div>
    <h1>Betta Fish List</h1>
    <ul>
      <li v-for="fish in fishes" :key="fish._id">
        สายพันธ์ุ: {{ fish.breed }} |อายุ: {{ fish.age }} | ขนาด:
        {{ fish.size }} | สี: {{ fish.color }}
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

fetchFishes(); // เรียกฟังก์ชันเพื่อดึงข้อมูล
</script>
