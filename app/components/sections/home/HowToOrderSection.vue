<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const { contactLink } = useWhatsApp()

const steps = [
  {
    title: 'Pilih aroma favorit',
    copy: 'Tentukan aroma HRM Parfume yang paling sesuai dengan karakter dan momen Anda.',
  },
  {
    title: 'Klik “Pesan via WhatsApp”',
    copy: 'Tombol akan membuka WhatsApp dengan pesan yang sudah terisi nama produk.',
  },
  {
    title: 'Konfirmasi pesanan',
    copy: 'Diskusikan produk, jumlah, dan detail pengiriman bersama tim kami.',
  },
]

useGsapSection(sectionRef, ({ gsap, root, isMobile }) => {
  const timeline = gsap.timeline({
    defaults: {
      duration: 0.82,
      ease: 'power3.out',
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 74%',
      once: true,
    },
  })

  timeline
    .from('[data-order-heading] > *', {
      y: isMobile ? 20 : 30,
      autoAlpha: 0,
      stagger: 0.1,
    })
    .from(
      '[data-order-step]',
      {
        y: isMobile ? 20 : 32,
        autoAlpha: 0,
        stagger: 0.12,
      },
      '-=0.36',
    )
})
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-surface-soft py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div
        data-order-heading
        class="max-w-2xl"
      >
        <p class="eyebrow">Proses pemesanan</p>
        <h2 class="luxury-heading luxury-heading--italic mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
          Cara Memesan
        </h2>
        <p class="mt-6 text-lg leading-relaxed text-ink-secondary">
          Tiga langkah sederhana untuk mendapatkan wewangian signature Anda
          langsung melalui WhatsApp.
        </p>
      </div>

      <ol class="mt-12 grid gap-4 md:grid-cols-3">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          data-order-step
          class="rounded-lg border border-ink/10 bg-surface p-6 shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
        >
          <span
            class="flex size-11 items-center justify-center rounded-full bg-surface-dark font-display text-lg text-gold"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <h3 class="mt-5 text-lg font-semibold text-ink">
            {{ step.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-ink-secondary">
            {{ step.copy }}
          </p>
        </li>
      </ol>

      <div class="mt-10">
        <a
          :href="contactLink()"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-whatsapp focus-ring"
        >
          Mulai Pesan via WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>
