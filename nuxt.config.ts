// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    preset: "node-server",
  },
  ssr: true, // หรือ false ขึ้นอยู่กับการใช้งาน
});
