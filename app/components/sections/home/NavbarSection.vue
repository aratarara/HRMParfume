<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const navLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Cerita', href: '#story' },
  { label: 'Aroma', href: '#scents' },
  { label: 'Keunggulan', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#contact' },
]

const isOpen = ref(false)
const isScrolled = ref(false)

const closeMenu = () => {
  isOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 16
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-300"
    :class="isScrolled || isOpen ? 'bg-surface/90 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'"
  >
    <div class="section-shell flex items-center justify-between py-4">
      <a
        href="#home"
        class="focus-ring font-display text-2xl italic leading-none text-ink"
        aria-label="HRM Parfume, kembali ke atas"
        @click="closeMenu"
      >
        HRM Parfume
      </a>

      <nav
        class="hidden items-center gap-x-7 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary lg:flex"
        aria-label="Navigasi utama"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="focus-ring transition hover:text-ink"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        type="button"
        class="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
        :aria-expanded="isOpen"
        aria-controls="mobile-nav"
        :aria-label="isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"
        @click="isOpen = !isOpen"
      >
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <nav
      v-show="isOpen"
      id="mobile-nav"
      class="section-shell flex flex-col gap-1 pb-6 lg:hidden"
      aria-label="Navigasi mobile"
    >
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        class="focus-ring flex min-h-11 items-center rounded-sm px-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink-secondary transition hover:bg-ink/5 hover:text-ink"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
