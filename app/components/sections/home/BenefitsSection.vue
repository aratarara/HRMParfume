<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

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

onMounted(() => {
  if (!sectionRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const { $gsap } = useNuxtApp()
  const ctx = $gsap.context(() => {
    $gsap.from('[data-benefit-reveal]', {
      y: 24,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 72%',
        once: true,
      },
    })
  }, sectionRef.value)

  cleanupAnimation = () => ctx.revert()
})

onUnmounted(() => {
  cleanupAnimation?.()
})
</script>

<template>
  <section
    id="benefits"
    ref="sectionRef"
    class="bg-hrm-ink py-20 text-hrm-ivory sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div>
        <p
          data-benefit-reveal
          class="eyebrow text-hrm-gold"
        >
          Why HRM Parfume
        </p>
        <h2
          data-benefit-reveal
          class="luxury-heading mt-5 max-w-4xl text-4xl text-white sm:text-5xl lg:text-7xl"
        >
          Benefits Just for You
        </h2>
        <p
          data-benefit-reveal
          class="mt-7 max-w-3xl text-lg leading-9 text-white/68"
        >
          HRM Parfume is crafted to bring everyday elegance through balanced
          composition, lasting comfort, and a scent character that feels personal.
        </p>
      </div>

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          data-benefit-reveal
          class="rounded-lg border border-white/14 bg-white/[0.035] p-5"
        >
          <div class="flex items-start justify-between gap-5">
            <h3 class="text-base font-semibold text-white">
              {{ benefit.title }}
            </h3>
            <span
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
