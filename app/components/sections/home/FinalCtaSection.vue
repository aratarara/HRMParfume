<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

useGsapSection(sectionRef, ({ gsap, root, isMobile, canHover }) => {
  gsap.set('[data-cta-image]', {
    scale: 1.07,
    transformOrigin: 'center center',
  })

  const timeline = gsap.timeline({
    defaults: {
      duration: 0.86,
      ease: 'power3.out',
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 72%',
      once: true,
    },
  })

  timeline
    .from('[data-cta-overlay]', {
      autoAlpha: 0,
      duration: 0.62,
    })
    .from(
      '[data-cta-reveal]',
      {
        y: isMobile ? 22 : 34,
        autoAlpha: 0,
        stagger: 0.11,
      },
      '-=0.24',
    )
    .from(
      '[data-cta-button]',
      {
        scale: 0.92,
        autoAlpha: 0,
        duration: 0.54,
      },
      '-=0.42',
    )

  gsap.to('[data-cta-image]', {
    yPercent: isMobile ? -4 : -8,
    ease: 'none',
    scrollTrigger: {
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
    },
  })

  if (!canHover) {
    return
  }

  const button = root.querySelector<HTMLElement>('[data-cta-button]')

  if (!button) {
    return
  }

  const enter = () => {
    gsap.to(button, {
      y: -2,
      scale: 1.03,
      duration: 0.24,
      ease: 'power2.out',
    })
  }
  const leave = () => {
    gsap.to(button, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  button.addEventListener('pointerenter', enter)
  button.addEventListener('pointerleave', leave)

  return () => {
    button.removeEventListener('pointerenter', enter)
    button.removeEventListener('pointerleave', leave)
  }
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
    <div
      data-cta-overlay
      class="absolute inset-0 bg-gradient-to-r from-hrm-ink via-hrm-ink/82 to-hrm-ink/28"
    />

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
          data-cta-button
          href="#contact"
          class="focus-ring mt-9 inline-flex min-h-11 items-center justify-center rounded-full bg-hrm-gold px-7 text-sm font-bold text-hrm-ink transition hover:bg-[#d2ad6b]"
        >
          Contact Us
        </a>
      </div>
    </div>
  </section>
</template>
