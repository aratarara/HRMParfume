<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const guideCards = [
  {
    name: 'Aurora Bloom',
    copy: 'Pilih Aurora Bloom jika Anda menyukai keanggunan floral yang lembut dan segar untuk pemakaian harian.',
  },
  {
    name: 'Noir Woods',
    copy: 'Pilih Noir Woods jika Anda lebih suka karakter woody yang hangat dan bold untuk momen malam hari.',
  },
]

const useTips = [
  'Semprotkan pada titik nadi',
  'Jaga jarak sekitar 15 cm',
  'Jangan digosok setelah disemprot',
  'Hindari area mata dan wajah',
  'Simpan di tempat sejuk dan kering',
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
    .from('[data-guide-heading] > *', {
      y: isMobile ? 20 : 30,
      autoAlpha: 0,
      stagger: 0.1,
    })
    .from(
      '[data-guide-card]',
      {
        y: isMobile ? 20 : 32,
        autoAlpha: 0,
        stagger: 0.1,
      },
      '-=0.36',
    )
    .from(
      '[data-guide-aside]',
      {
        x: isMobile ? 0 : 28,
        y: isMobile ? 22 : 0,
        autoAlpha: 0,
      },
      '-=0.44',
    )
    .from(
      '[data-guide-tip]',
      {
        x: -14,
        autoAlpha: 0,
        stagger: 0.075,
        duration: 0.54,
      },
      '-=0.3',
    )
    .from(
      '[data-guide-line]',
      {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.075,
        duration: 0.5,
      },
      '<',
    )
})
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-surface py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div
        data-guide-heading
        class="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end"
      >
        <div>
          <p class="eyebrow">Panduan wewangian</p>
          <h2 class="luxury-heading luxury-heading--italic mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
            Aroma HRM Mana yang Tepat untuk Anda?
          </h2>
        </div>
        <p class="max-w-xl text-base leading-relaxed text-ink-secondary lg:justify-self-end">
          Sesuaikan aroma dengan momen Anda, lalu kenakan dengan ritual yang
          ringan dan terukur agar wewangian tetap terasa elegan.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-[1fr_0.78fr]">
        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="card in guideCards"
            :key="card.name"
            data-guide-card
            class="flex flex-col rounded-lg border border-ink/10 bg-surface-soft p-6"
          >
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
              {{ card.name }}
            </p>
            <p class="mt-6 text-lg leading-relaxed text-ink">
              {{ card.copy }}
            </p>
            <a
              href="#scents"
              class="focus-ring mt-auto inline-flex pt-6 text-sm font-semibold text-bronze underline-offset-4 hover:underline"
            >
              Lihat aroma ini →
            </a>
          </article>
        </div>

        <aside
          data-guide-aside
          class="rounded-lg bg-surface-dark p-7 text-white"
          aria-labelledby="how-to-use-title"
        >
          <h3
            id="how-to-use-title"
            class="font-display text-3xl italic"
          >
            Cara Pemakaian
          </h3>
          <ul class="mt-6 space-y-4">
            <li
              v-for="tip in useTips"
              :key="tip"
              data-guide-tip
              class="flex gap-3 text-sm leading-relaxed text-white/75"
            >
              <span
                data-guide-line
                class="mt-3 h-px w-6 shrink-0 bg-gold"
                aria-hidden="true"
              />
              <span>{{ tip }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>
