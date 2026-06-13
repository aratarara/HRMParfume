<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Story', href: '#story' },
  { label: 'Scents', href: '#scents' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/' },
  { label: 'WhatsApp', href: '#contact' },
]

useGsapSection(sectionRef, ({ gsap, root, isMobile }) => {
  const timeline = gsap.timeline({
    defaults: {
      duration: 0.68,
      ease: 'power3.out',
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 86%',
      once: true,
    },
  })

  timeline
    .from('[data-footer-rule]', {
      scaleX: 0,
      transformOrigin: 'left center',
    })
    .from(
      '[data-footer-reveal]',
      {
        y: isMobile ? 14 : 22,
        autoAlpha: 0,
        stagger: 0.08,
      },
      '-=0.34',
    )
    .from(
      '[data-footer-link]',
      {
        y: 10,
        autoAlpha: 0,
        stagger: 0.035,
        duration: 0.46,
      },
      '-=0.42',
    )
})
</script>

<template>
  <footer
    ref="sectionRef"
    class="bg-hrm-ivory py-12"
  >
    <div class="section-shell">
      <div
        data-footer-rule
        class="h-px w-full bg-hrm-ink/10"
        aria-hidden="true"
      />
      <div class="grid gap-8 pt-8 lg:grid-cols-[1fr_auto_auto]">
        <div
          data-footer-reveal
          class="max-w-md"
        >
          <a
            href="#home"
            class="focus-ring font-serif text-3xl italic text-hrm-ink"
          >
            HRM Parfume
          </a>
          <p class="mt-4 text-sm leading-7 text-hrm-charcoal/72">
            Elegant, warm, and long-lasting fragrances crafted for memorable
            everyday moments.
          </p>
        </div>

        <nav
          data-footer-reveal
          class="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-hrm-charcoal/74"
          aria-label="Footer navigation"
        >
          <a
            v-for="link in footerLinks"
            :key="link.href"
            :href="link.href"
            data-footer-link
            class="focus-ring transition hover:text-hrm-ink"
          >
            {{ link.label }}
          </a>
        </nav>

        <nav
          data-footer-reveal
          class="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-hrm-charcoal/74"
          aria-label="Social links"
        >
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            data-footer-link
            class="focus-ring transition hover:text-hrm-ink"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>
