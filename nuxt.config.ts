import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-06-13',
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'HRM Parfume | Luxury Fragrance Company Profile',
      meta: [
        {
          name: 'description',
          content:
            'HRM Parfume creates elegant, warm, and long-lasting fragrances designed to leave a memorable impression.',
        },
      ],
    },
  },
})
