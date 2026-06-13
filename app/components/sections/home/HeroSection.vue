<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Story', href: '#story' },
  { label: 'Scents', href: '#scents' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Contact', href: '#contact' },
]

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
    .from(
      '[data-hero-reveal]',
      {
        y: isMobile ? 22 : 34,
        autoAlpha: 0,
        stagger: 0.11,
      },
    )
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
      gsap.to(button, {
        y: -2,
        scale: 1.025,
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

  return () => cleanupHandlers.forEach((cleanup) => cleanup())
})
</script>

<template>
  <section
    id="home"
    ref="sectionRef"
    class="relative overflow-hidden bg-hrm-ivory"
  >
    <header class="section-shell flex flex-col gap-4 border-b border-hrm-ink/10 py-4 sm:flex-row sm:items-center sm:justify-between">
      <a
        href="#home"
        class="focus-ring font-serif text-2xl italic leading-none text-hrm-ink"
        aria-label="HRM Parfume home"
      >
        HRM Parfume
      </a>

      <nav
        class="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-hrm-charcoal/70"
        aria-label="Primary navigation"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="focus-ring transition hover:text-hrm-ink"
        >
          {{ link.label }}
        </a>
      </nav>
    </header>

    <div class="section-shell pt-5">
      <p class="text-center text-[0.68rem] font-bold uppercase tracking-[0.2em] text-hrm-charcoal/62 sm:text-left">
        Discover your signature scent with HRM Parfume.
      </p>
    </div>

    <div class="section-shell grid min-h-[calc(100svh-8rem)] items-center gap-8 pb-12 pt-8 md:grid-cols-[1fr_0.92fr] md:gap-12 md:pb-16">
      <div
        data-hero-copy
        class="max-w-3xl"
      >
        <p
          data-hero-reveal
          class="eyebrow"
        >
          HRM Parfume fragrance house
        </p>
        <h1
          data-hero-reveal
          class="luxury-heading mt-5 max-w-4xl text-4xl text-hrm-ink sm:text-6xl lg:text-8xl"
        >
          A Scent That Stays
          <span class="block not-italic">Even After You Leave.</span>
        </h1>
        <p
          data-hero-reveal
          class="mt-6 max-w-2xl text-base leading-8 text-hrm-charcoal/78 sm:text-lg"
        >
          HRM Parfume creates elegant, warm, and long-lasting fragrances designed
          to leave a memorable impression.
        </p>
        <div
          data-hero-reveal
          class="mt-7 flex flex-wrap gap-3"
        >
          <a
            href="#scents"
            data-gsap-button
            class="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-hrm-ink px-6 text-sm font-semibold text-hrm-ivory transition hover:bg-hrm-charcoal"
          >
            Explore Scents
          </a>
          <a
            href="#contact"
            data-gsap-button
            class="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-hrm-ink/20 px-6 text-sm font-semibold text-hrm-ink transition hover:border-hrm-ink hover:bg-white/45"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div
        data-hero-image
        class="relative mx-auto w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-hrm-warm shadow-[0_2rem_5rem_rgba(21,18,16,0.16)] md:mr-0"
      >
        <img
          data-hero-photo
          src="/images/hrm/hero-perfume.jpg"
          alt="Amber HRM Parfume bottle beside black silk on a warm stone surface"
          class="h-[34svh] min-h-[16rem] w-full object-cover sm:min-h-[22rem] md:h-[70svh] md:max-h-[42rem]"
          width="1024"
          height="1536"
          fetchpriority="high"
        >
        <div
          data-hero-caption
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-hrm-ink/82 to-transparent p-5 text-white sm:p-7"
        >
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-hrm-gold">
            Featured accord
          </p>
          <p class="mt-2 max-w-xs font-serif text-2xl italic leading-tight">
            Amber warmth, clean florals, and a quiet woody finish.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
