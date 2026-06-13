<script setup lang="ts">
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
</script>

<template>
  <footer class="bg-hrm-ivory py-12">
    <div class="section-shell">
      <div class="grid gap-8 border-t border-hrm-ink/10 pt-8 lg:grid-cols-[1fr_auto_auto]">
        <div class="max-w-md">
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
          class="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-hrm-charcoal/74"
          aria-label="Footer navigation"
        >
          <a
            v-for="link in footerLinks"
            :key="link.href"
            :href="link.href"
            class="focus-ring transition hover:text-hrm-ink"
          >
            {{ link.label }}
          </a>
        </nav>

        <nav
          class="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-hrm-charcoal/74"
          aria-label="Social links"
        >
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
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
