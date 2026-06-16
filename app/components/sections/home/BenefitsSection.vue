<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const benefits = [
  {
    title: 'Aroma Tahan Lama',
    copy: 'Base notes hangat membantu setiap wewangian tetap hadir, nyaman, dan berkesan.',
  },
  {
    title: 'Komposisi Seimbang',
    copy: 'Notes fresh, floral, dan woody diracik agar terasa halus sejak semprotan pertama.',
  },
  {
    title: 'Kemasan Elegan',
    copy: 'Botol membulat dan warna lembut menjaga presentasi tetap understated dan premium.',
  },
  {
    title: 'Kesan Small-Batch',
    copy: 'Koleksi yang terfokus memberi setiap wewangian karakter yang jelas dan personal.',
  },
  {
    title: 'Harian & Acara Spesial',
    copy: 'Cukup lembut untuk ritual harian dan cukup elegan untuk momen yang berarti.',
  },
  {
    title: 'Karakter Unisex',
    copy: 'Dibangun di sekitar mood dan kehadiran, bukan kategori wewangian yang kaku.',
  },
]

useGsapSection(sectionRef, ({ gsap, root, isMobile, canHover }) => {
  const timeline = gsap.timeline({
    defaults: {
      duration: 0.82,
      ease: 'power3.out',
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 72%',
      once: true,
    },
  })

  timeline
    .from('[data-benefit-header] > *', {
      y: isMobile ? 20 : 30,
      autoAlpha: 0,
      stagger: 0.1,
    })
    .from(
      '[data-benefit-card]',
      {
        y: isMobile ? 18 : 32,
        autoAlpha: 0,
        stagger: 0.075,
      },
      '-=0.34',
    )
    .from(
      '[data-benefit-index]',
      {
        scale: 0.68,
        autoAlpha: 0,
        stagger: 0.065,
        duration: 0.52,
      },
      '-=0.58',
    )

  if (!canHover) {
    return
  }

  const cleanupHandlers = gsap.utils.toArray<HTMLElement>('[data-benefit-card]').map((card) => {
    const enter = () => {
      gsap.to(card, {
        y: -4,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderColor: 'rgba(184,151,100,0.4)',
        duration: 0.28,
        ease: 'power2.out',
      })
    }
    const leave = () => {
      gsap.to(card, {
        y: 0,
        backgroundColor: 'rgba(255,255,255,0.035)',
        borderColor: 'rgba(255,255,255,0.18)',
        duration: 0.32,
        ease: 'power2.out',
      })
    }

    card.addEventListener('pointerenter', enter)
    card.addEventListener('pointerleave', leave)

    return () => {
      card.removeEventListener('pointerenter', enter)
      card.removeEventListener('pointerleave', leave)
    }
  })

  return () => cleanupHandlers.forEach((cleanup) => cleanup())
})
</script>

<template>
  <section
    id="benefits"
    ref="sectionRef"
    class="bg-surface-dark py-20 text-white sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div data-benefit-header>
        <p class="eyebrow text-gold">
          Mengapa HRM Parfume
        </p>
        <h2 class="luxury-heading luxury-heading--italic mt-5 max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl">
          Keunggulan untuk Anda
        </h2>
        <p class="mt-7 max-w-3xl text-lg leading-relaxed text-white/70">
          HRM Parfume diracik untuk menghadirkan keanggunan setiap hari melalui
          komposisi yang seimbang, kenyamanan yang tahan lama, dan karakter aroma
          yang terasa personal.
        </p>
      </div>

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          data-benefit-card
          class="rounded-lg border border-white/[0.18] bg-white/[0.035] p-6"
        >
          <div class="flex items-start justify-between gap-5">
            <h3 class="text-base font-semibold text-white">
              {{ benefit.title }}
            </h3>
            <span
              data-benefit-index
              class="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/45 text-xs font-bold text-gold"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-white/65">
            {{ benefit.copy }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
