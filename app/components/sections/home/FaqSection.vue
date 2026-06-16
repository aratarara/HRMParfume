<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const faqs = [
  {
    question: 'Apakah HRM Parfume tahan lama?',
    answer:
      'Setiap aroma diracik dengan base notes hangat seperti amber, musk, dan sandalwood yang membantu wewangian menetap nyaman di kulit sepanjang hari.',
  },
  {
    question: 'Untuk pria, wanita, atau unisex?',
    answer:
      'Koleksi kami dibangun di sekitar mood dan kehadiran, sehingga berkarakter unisex dan dapat dikenakan oleh siapa saja.',
  },
  {
    question: 'Apakah bisa dipakai setiap hari?',
    answer:
      'Tentu. Aurora Bloom dirancang lembut untuk pemakaian harian, sementara Noir Woods cocok untuk momen sore hingga malam hari.',
  },
  {
    question: 'Tipe parfum mana yang lebih tahan lama?',
    answer:
      'Kedua aroma kami berjenis Eau de Parfum dengan konsentrasi yang lebih pekat, sehingga umumnya lebih tahan lama dibanding Eau de Toilette.',
  },
  {
    question: 'Bagaimana cara menyimpan parfum?',
    answer:
      'Simpan botol di tempat yang sejuk dan kering, jauh dari sinar matahari langsung serta perubahan suhu yang ekstrem.',
  },
  {
    question: 'Bagaimana cara memesan HRM Parfume?',
    answer:
      'Pilih aroma favorit Anda, klik tombol “Pesan via WhatsApp”, lalu konfirmasikan produk, jumlah, dan detail pengiriman dengan tim kami.',
  },
]

const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

useGsapSection(sectionRef, ({ gsap, root, isMobile }) => {
  gsap.from('[data-faq-reveal]', {
    y: isMobile ? 20 : 30,
    autoAlpha: 0,
    duration: 0.82,
    ease: 'power3.out',
    stagger: 0.09,
    scrollTrigger: {
      trigger: root,
      start: 'top 76%',
      once: true,
    },
  })
})
</script>

<template>
  <section
    id="faq"
    ref="sectionRef"
    class="bg-surface py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div data-faq-reveal>
        <p class="eyebrow">Pertanyaan umum</p>
        <h2 class="luxury-heading luxury-heading--italic mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
          Hal yang Sering Ditanyakan
        </h2>
        <p class="mt-6 text-base leading-relaxed text-ink-secondary">
          Temukan jawaban singkat sebelum Anda menghubungi tim kami melalui
          WhatsApp.
        </p>
      </div>

      <div
        data-faq-reveal
        class="divide-y divide-ink/10 border-y border-ink/10"
      >
        <div
          v-for="(faq, index) in faqs"
          :key="faq.question"
        >
          <h3>
            <button
              type="button"
              class="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-bronze"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-panel-${index}`"
              :id="`faq-trigger-${index}`"
              @click="toggle(index)"
            >
              <span class="text-base font-semibold text-ink sm:text-lg">
                {{ faq.question }}
              </span>
              <span
                class="grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-transform duration-300"
                :class="openIndex === index ? 'rotate-45' : ''"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
          </h3>
          <div
            v-show="openIndex === index"
            :id="`faq-panel-${index}`"
            role="region"
            :aria-labelledby="`faq-trigger-${index}`"
            class="pb-6 pr-12"
          >
            <p class="text-sm leading-relaxed text-ink-secondary sm:text-base">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
