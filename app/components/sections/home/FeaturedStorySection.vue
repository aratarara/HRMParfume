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
    $gsap.from('[data-story-reveal]', {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 74%',
        once: true,
      },
    })

    $gsap.to('[data-story-image]', {
      yPercent: -8,
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
    id="story"
    ref="sectionRef"
    class="overflow-hidden bg-[#fbf8f1] py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell grid gap-10 lg:grid-cols-[0.86fr_1fr] lg:items-center lg:gap-16">
      <div class="max-w-xl">
        <p
          data-story-reveal
          class="eyebrow"
        >
          Featured fragrance story
        </p>
        <h2
          data-story-reveal
          class="luxury-heading mt-5 text-4xl text-hrm-ink sm:text-5xl lg:text-7xl"
        >
          Your New Obsession
        </h2>
        <p
          data-story-reveal
          class="mt-7 text-lg leading-9 text-hrm-charcoal/78"
        >
          Created for those who want their presence to be remembered, HRM Parfume
          blends soft freshness, warm depth, and refined sensuality in every
          bottle.
        </p>
      </div>

      <figure
        data-story-reveal
        class="relative overflow-hidden rounded-[2rem] bg-hrm-ink shadow-[0_2rem_5rem_rgba(21,18,16,0.12)]"
      >
        <img
          data-story-image
          src="/images/hrm/campaign-perfume.jpg"
          alt="Luxury perfume bottle glowing against dark satin in an editorial campaign setting"
          class="h-[28rem] w-full scale-110 object-cover sm:h-[34rem] lg:h-[42rem]"
          width="1536"
          height="864"
          loading="lazy"
        >
      </figure>
    </div>
  </section>
</template>
