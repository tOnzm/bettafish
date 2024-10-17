// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    preset: "node-server",
  },
  // ตั้งค่าเบื้องต้น
  ssr: true, // ใช้ server-side rendering
});
