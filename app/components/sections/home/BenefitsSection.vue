<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const benefits = [
  {
    title: 'Long-lasting Scent',
    copy: 'Warm base notes help each fragrance stay present, comfortable, and memorable.',
  },
  {
    title: 'Balanced Aroma',
    copy: 'Fresh, floral, and woody notes are composed to feel smooth from first spray.',
  },
  {
    title: 'Elegant Packaging',
    copy: 'Rounded bottles and refined tones keep the presentation understated and premium.',
  },
  {
    title: 'Small-Batch Feel',
    copy: 'A focused collection gives each fragrance a clear, personal character.',
  },
  {
    title: 'Daily & Special Occasion Use',
    copy: 'Soft enough for daily rituals and polished enough for moments that matter.',
  },
  {
    title: 'Unisex Character',
    copy: 'Built around mood and presence instead of fixed fragrance categories.',
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
        rotate: isMobile ? 0 : -10,
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
        backgroundColor: 'rgba(255,255,255,0.065)',
        borderColor: 'rgba(185,146,85,0.38)',
        duration: 0.28,
        ease: 'power2.out',
      })
    }
    const leave = () => {
      gsap.to(card, {
        y: 0,
        backgroundColor: 'rgba(255,255,255,0.035)',
        borderColor: 'rgba(255,255,255,0.14)',
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
    class="bg-hrm-ink py-20 text-hrm-ivory sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div data-benefit-header>
        <p
          class="eyebrow text-hrm-gold"
        >
          Why HRM Parfume
        </p>
        <h2
          class="luxury-heading mt-5 max-w-4xl text-4xl text-white sm:text-5xl lg:text-7xl"
        >
          Benefits Just for You
        </h2>
        <p
          class="mt-7 max-w-3xl text-lg leading-9 text-white/68"
        >
          HRM Parfume is crafted to bring everyday elegance through balanced
          composition, lasting comfort, and a scent character that feels personal.
        </p>
      </div>

      <ul
        data-benefits-grid
        class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <li
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          data-benefit-card
          class="rounded-lg border border-white/14 bg-white/[0.035] p-5"
        >
          <div class="flex items-start justify-between gap-5">
            <h3 class="text-base font-semibold text-white">
              {{ benefit.title }}
            </h3>
            <span
              data-benefit-index
              class="flex size-10 shrink-0 items-center justify-center rounded-full border border-hrm-gold/45 text-xs font-bold text-hrm-gold"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          <p class="mt-3 text-sm leading-7 text-white/60">
            {{ benefit.copy }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
