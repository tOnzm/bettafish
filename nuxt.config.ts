// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    preset: "node-server",
  },
  // ตั้งค่าเบื้องต้น
  ssr: true, // ใช้ server-side rendering

  // ตั้งค่า baseURL ถ้าต้องการ
  router: {},

  // ตั้งค่าคุณสมบัติอื่นๆ ที่จำเป็น
});
