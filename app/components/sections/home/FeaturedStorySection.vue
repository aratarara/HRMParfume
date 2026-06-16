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
    class="overflow-hidden bg-surface-soft py-20 sm:py-24 lg:py-28"
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
          Cerita wewangian unggulan
        </p>
        <h2
          data-story-reveal
          class="luxury-heading luxury-heading--italic mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl"
        >
          Obsesi Baru Anda
        </h2>
        <p
          data-story-reveal
          class="mt-7 text-lg leading-relaxed text-ink-secondary"
        >
          Diciptakan untuk mereka yang ingin kehadirannya selalu dikenang, HRM
          Parfume memadukan kesegaran lembut, kedalaman hangat, dan sensualitas
          yang halus dalam setiap botol.
        </p>
        <div
          data-story-accent
          class="mt-8 h-px w-24 bg-gold"
          aria-hidden="true"
        />
      </div>

      <figure
        data-story-frame
        class="relative overflow-hidden rounded-[2rem] bg-surface-dark shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
      >
        <img
          data-story-image
          src="/images/hrm/campaign-perfume.jpg"
          alt="Botol parfum mewah bercahaya di atas satin gelap dalam suasana kampanye editorial"
          class="h-[28rem] w-full scale-110 object-cover sm:h-[34rem] lg:h-[42rem]"
          width="1536"
          height="864"
          loading="lazy"
        >
      </figure>
    </div>
  </section>
</template>
