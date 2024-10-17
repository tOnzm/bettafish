<template>
  <div>
    <h1>Add Betta Fish</h1>
    <form @submit.prevent="addFish">
      <input v-model="fish.breed" placeholder="สายพันธ์ุ" />
      <input v-model="fish.age" type="number" placeholder="Age" />
      <input v-model="fish.size" placeholder="Size" />
      <input v-model="fish.color" placeholder="Color" />
      <input v-model="fish.gender" placeholder="Gender" />
      <input v-model="fish.healthStatus" placeholder="Health Status" />
      <button type="submit">Add Fish</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const fish = ref({
  breed: "",
  age: "",
  size: "",
  color: "",
  gender: "",
  healthStatus: "",
});

const addFish = async () => {
  await useFetch("/api/fish", {
    method: "POST",
    body: fish.value,
  });
  alert("Fish added successfully");
};
</script>
