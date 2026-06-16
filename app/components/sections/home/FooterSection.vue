<script setup lang="ts">
const { contactLink } = useWhatsApp()

const footerLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Cerita', href: '#story' },
  { label: 'Aroma', href: '#scents' },
  { label: 'Keunggulan', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#contact' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', external: true },
  { label: 'TikTok', href: 'https://www.tiktok.com/', external: true },
  { label: 'WhatsApp', href: contactLink(), external: true },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-surface py-12">
    <div class="section-shell">
      <div class="grid gap-8 border-t border-ink/10 pt-10 lg:grid-cols-[1.4fr_auto_auto]">
        <div class="max-w-md">
          <a
            href="#home"
            class="focus-ring font-display text-3xl italic text-ink"
          >
            HRM Parfume
          </a>
          <p class="mt-4 text-sm leading-relaxed text-ink-secondary">
            Wewangian elegan, hangat, dan tahan lama yang diciptakan untuk
            momen-momen sehari-hari yang berkesan.
          </p>
        </div>

        <nav
          class="flex flex-col gap-3 text-sm font-semibold text-ink-secondary"
          aria-label="Navigasi footer"
        >
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
            Navigasi
          </span>
          <a
            v-for="link in footerLinks"
            :key="link.href"
            :href="link.href"
            class="focus-ring w-fit transition hover:text-ink"
          >
            {{ link.label }}
          </a>
        </nav>

        <nav
          class="flex flex-col gap-3 text-sm font-semibold text-ink-secondary"
          aria-label="Tautan sosial"
        >
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
            Ikuti Kami
          </span>
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            class="focus-ring w-fit transition hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <p class="mt-10 text-xs text-ink-muted">
        © {{ currentYear }} HRM Parfume. Semua hak dilindungi.
      </p>
    </div>
  </footer>
</template>
