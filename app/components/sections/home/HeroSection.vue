<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

useGsapSection(sectionRef, ({ gsap, root, isMobile, canHover }) => {
  gsap.set('[data-hero-photo]', {
    scale: 1.08,
    transformOrigin: 'center center',
  })

  const timeline = gsap.timeline({
    defaults: {
      duration: isMobile ? 0.72 : 0.95,
      ease: 'power3.out',
    },
  })

  timeline
    .from('[data-hero-reveal]', {
      y: isMobile ? 22 : 34,
      autoAlpha: 0,
      stagger: 0.11,
    })
    .from(
      '[data-hero-image]',
      {
        clipPath: 'inset(16% 0% 16% 0% round 2rem)',
        scale: 1.08,
        autoAlpha: 0,
        duration: isMobile ? 0.9 : 1.18,
      },
      '-=0.7',
    )
    .from(
      '[data-hero-caption]',
      {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
      },
      '-=0.42',
    )

  gsap.to('[data-hero-photo]', {
    yPercent: isMobile ? -3 : -8,
    ease: 'none',
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
  })

  if (!canHover) {
    return
  }

  const buttons = gsap.utils.toArray<HTMLElement>('[data-gsap-button]')
  const cleanupHandlers = buttons.map((button) => {
    const enter = () => {
      gsap.to(button, { y: -2, scale: 1.025, duration: 0.24, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(button, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    button.addEventListener('pointerenter', enter)
    button.addEventListener('pointerleave', leave)

    return () => {
      button.removeEventListener('pointerenter', enter)
      button.removeEventListener('pointerleave', leave)
    }
  })

  return () => cleanupHandlers.forEach((cleanup) => cleanup())
})
</script>

<template>
  <section
    id="home"
    ref="sectionRef"
    class="relative overflow-hidden bg-surface"
  >
    <div class="section-shell grid min-h-[calc(100svh-7rem)] items-center gap-8 pb-16 pt-10 md:grid-cols-[1fr_0.92fr] md:gap-12 md:pb-20 md:pt-14">
      <div class="max-w-3xl">
        <p
          data-hero-reveal
          class="eyebrow"
        >
          Rumah wewangian HRM Parfume
        </p>
        <h1
          data-hero-reveal
          class="luxury-heading luxury-heading--italic mt-5 max-w-4xl text-5xl text-ink sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Aroma yang Tetap Tinggal
          <span class="block not-italic">Bahkan Setelah Anda Pergi.</span>
        </h1>
        <p
          data-hero-reveal
          class="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg"
        >
          HRM Parfume menciptakan wewangian yang elegan, hangat, dan tahan lama,
          dirancang untuk meninggalkan kesan yang berkesan.
        </p>
        <div
          data-hero-reveal
          class="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#scents"
            data-gsap-button
            class="btn btn-primary focus-ring"
          >
            Jelajahi Aroma
          </a>
          <a
            href="#contact"
            data-gsap-button
            class="btn btn-secondary focus-ring"
          >
            Hubungi Kami
          </a>
        </div>
      </div>

      <div
        data-hero-image
        class="relative mx-auto w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-surface-warm shadow-[0_16px_48px_rgba(0,0,0,0.08)] md:mr-0"
      >
        <img
          data-hero-photo
          src="/images/hrm/hero-perfume.jpg"
          alt="Botol parfum HRM Parfume berwarna amber di samping kain sutra hitam pada permukaan batu hangat"
          class="h-[42svh] min-h-[18rem] w-full object-cover sm:min-h-[24rem] md:h-[70svh] md:max-h-[42rem]"
          width="1024"
          height="1536"
          fetchpriority="high"
        >
        <div
          data-hero-caption
          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-dark/85 to-transparent p-5 text-white sm:p-7"
        >
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Accord unggulan
          </p>
          <p class="mt-2 max-w-xs font-display text-2xl italic leading-tight">
            Kehangatan amber, floral bersih, dan sentuhan woody yang lembut.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
