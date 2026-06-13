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
    $gsap.from('[data-cta-reveal]', {
      y: 26,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 72%',
        once: true,
      },
    })

    $gsap.to('[data-cta-image]', {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
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
    id="contact"
    ref="sectionRef"
    class="relative overflow-hidden bg-hrm-ink py-20 text-white sm:py-24 lg:py-28"
  >
    <img
      data-cta-image
      src="/images/hrm/cta-perfume.jpg"
      alt="Luxury amber perfume bottle on a dark satin surface"
      class="absolute inset-0 h-[112%] w-full object-cover opacity-70"
      width="1536"
      height="864"
      loading="lazy"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-hrm-ink via-hrm-ink/82 to-hrm-ink/28" />

    <div class="section-shell relative">
      <div class="max-w-2xl">
        <p
          data-cta-reveal
          class="eyebrow text-hrm-gold"
        >
          Contact
        </p>
        <h2
          data-cta-reveal
          class="luxury-heading mt-5 text-4xl text-white sm:text-5xl lg:text-7xl"
        >
          Your Signature Scent is Just a Click Away
        </h2>
        <p
          data-cta-reveal
          class="mt-7 text-lg leading-9 text-white/72"
        >
          Discover a fragrance that matches your character and leaves an elegant
          impression wherever you go.
        </p>
        <a
          data-cta-reveal
          href="#contact"
          class="focus-ring mt-9 inline-flex min-h-11 items-center justify-center rounded-full bg-hrm-gold px-7 text-sm font-bold text-hrm-ink transition hover:bg-[#d2ad6b]"
        >
          Contact Us
        </a>
      </div>
    </div>
  </section>
</template>
