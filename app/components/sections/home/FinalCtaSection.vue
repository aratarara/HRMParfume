<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const { contactLink } = useWhatsApp()

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
    gsap.to(button, { y: -2, scale: 1.03, duration: 0.24, ease: 'power2.out' })
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
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative overflow-hidden bg-surface-dark py-20 text-white sm:py-24 lg:py-28"
  >
    <img
      data-cta-image
      src="/images/hrm/cta-perfume.jpg"
      alt="Botol parfum amber mewah di atas permukaan satin gelap"
      class="absolute inset-0 h-[112%] w-full object-cover opacity-70"
      width="1536"
      height="864"
      loading="lazy"
    >
    <div
      data-cta-overlay
      class="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/85 to-surface-dark/30"
    />

    <div class="section-shell relative">
      <div class="max-w-2xl">
        <p
          data-cta-reveal
          class="eyebrow text-gold"
        >
          Kontak
        </p>
        <h2
          data-cta-reveal
          class="luxury-heading luxury-heading--italic mt-5 text-4xl text-white sm:text-5xl lg:text-6xl"
        >
          Aroma Signature Anda Hanya Sejauh Satu Klik
        </h2>
        <p
          data-cta-reveal
          class="mt-7 text-lg leading-relaxed text-white/75"
        >
          Temukan wewangian yang sesuai dengan karakter Anda dan meninggalkan
          kesan elegan ke mana pun Anda pergi.
        </p>
        <a
          data-cta-button
          :href="contactLink()"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-whatsapp focus-ring mt-9"
        >
          Hubungi Kami via WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>
