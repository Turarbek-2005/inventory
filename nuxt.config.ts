// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [[
    "@nuxtjs/google-fonts",
    {
      families: {
        Inter: [400, 500, 600, 700, 900],
      },
    },
  ], "@nuxt/image", "@nuxt/icon"],
});