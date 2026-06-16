<script setup lang="ts">
const { contactLink } = useWhatsApp()
</script>

<template>
  <div class="bg-surface-dark text-white">
    <div class="section-shell flex min-h-10 items-center justify-center gap-2 py-2 text-center">
      <p class="text-xs font-medium tracking-[0.04em] text-white/80 sm:text-sm">
        Temukan aroma signature Anda bersama HRM Parfume.
        <a
          :href="contactLink()"
          target="_blank"
          rel="noopener noreferrer"
          class="focus-ring ml-1 font-semibold text-gold underline-offset-4 hover:underline"
        >
          Konsultasi via WhatsApp
        </a>
      </p>
    </div>
  </div>
</template>
