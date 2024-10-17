<template>
  <div>
    <h1>Betta Fish List</h1>
    <ul>
      <li v-for="fish in fishes" :key="fish._id">
        Breed: {{ fish.breed }} | Age: {{ fish.age }} | Size: {{ fish.size }} |
        Color: {{ fish.color }}
      </li>
    </ul>
    <p v-if="error">Error loading fishes: {{ error.message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFetch } from "#app";

const fishes = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const { data, error: fetchError } = await useFetch("/api/fish");

    if (fetchError.value) {
      throw fetchError.value;
    }

    fishes.value = data.value;
  } catch (err) {
    error.value = err;
    console.error("Failed to fetch fishes:", err);
  }
});
</script>
