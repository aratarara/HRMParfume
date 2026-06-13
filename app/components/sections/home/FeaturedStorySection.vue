<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

useGsapSection(sectionRef, ({ gsap, root, isMobile }) => {
  gsap.set('[data-story-image]', {
    scale: 1.1,
    transformOrigin: 'center center',
  })

  const timeline = gsap.timeline({
    defaults: {
      duration: 0.86,
      ease: 'power3.out',
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 74%',
      once: true,
    },
  })

  timeline
    .from('[data-story-reveal]', {
      y: isMobile ? 22 : 32,
      autoAlpha: 0,
      stagger: 0.11,
    })
    .from(
      '[data-story-frame]',
      {
        clipPath: 'inset(14% 0% 14% 0% round 2rem)',
        autoAlpha: 0,
        scale: 0.98,
        duration: 1,
      },
      '-=0.48',
    )
    .from(
      '[data-story-accent]',
      {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.74,
      },
      '-=0.52',
    )

  gsap.to('[data-story-image]', {
    yPercent: isMobile ? -4 : -10,
    ease: 'none',
    scrollTrigger: {
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
    },
  })

  if (!isMobile) {
    gsap.to('[data-story-copy]', {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }
})
</script>

<template>
  <section
    id="story"
    ref="sectionRef"
    class="overflow-hidden bg-[#fbf8f1] py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell grid gap-10 lg:grid-cols-[0.86fr_1fr] lg:items-center lg:gap-16">
      <div
        data-story-copy
        class="max-w-xl"
      >
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
        <div
          data-story-accent
          class="mt-8 h-px w-24 bg-hrm-gold"
          aria-hidden="true"
        />
      </div>

      <figure
        data-story-frame
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
