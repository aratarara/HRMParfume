<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined


onMounted(() => {
  if (!sectionRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const { $gsap } = useNuxtApp()
  const ctx = $gsap.context(() => {
    $gsap.from('[data-fragrance-reveal]', {
      y: 26,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 74%',
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
    ref="sectionRef"
    class="bg-hrm-ivory py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        <p
          data-fragrance-reveal
          class="eyebrow"
        >
          Fragrance storytelling
        </p>
        <h2
          data-fragrance-reveal
          class="luxury-heading mt-5 text-4xl text-hrm-ink sm:text-5xl lg:text-7xl"
        >
          Our Fragrances
        </h2>
      </div>

      <div>
        <p
          data-fragrance-reveal
          class="max-w-3xl text-lg leading-9 text-hrm-charcoal/78"
        >
          Every HRM Parfume creation is designed as a personal signature. From the
          first fresh impression to the warm base that lingers, each scent is made
          to feel elegant, memorable, and easy to wear.
        </p>

        <dl
          data-fragrance-reveal
          class="mt-9 grid gap-4 sm:grid-cols-3"
          aria-label="HRM Parfume fragrance notes"
        >
        </dl>
      </div>
    </div>
  </section>
</template>
