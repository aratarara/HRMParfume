<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

const guideCards = [
  'Choose Aurora Bloom if you love soft, fresh, floral elegance for daily wear.',
  'Choose Noir Woods if you prefer warm, woody, bold character for evening moments.',
]

const useTips = [
  'Spray on pulse points',
  'Keep 15 cm distance',
  'Do not rub after spraying',
  'Store in a cool, dry place',
]

onMounted(() => {
  if (!sectionRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const { $gsap } = useNuxtApp()
  const ctx = $gsap.context(() => {
    $gsap.from('[data-guide-reveal]', {
      y: 24,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 74%',
        once: true,
      },
    })
  }, sectionRef.value)

  cleanupAnimation = () => ctx.revert()
})

onUnmounted(() => {
  cleanupAnimation?.()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-[#fbf8f1] py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div
        data-guide-reveal
        class="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end"
      >
        <div>
          <p class="eyebrow">Fragrance guide</p>
          <h2 class="luxury-heading mt-5 text-4xl text-hrm-ink sm:text-5xl lg:text-7xl">
            Which HRM Scent Is Right for You?
          </h2>
        </div>
        <p class="max-w-xl text-base leading-8 text-hrm-charcoal/74 lg:justify-self-end">
          Match your scent to the moment, then wear it with a light, considered
          ritual that keeps the fragrance elegant.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-[1fr_0.78fr]">
        <div
          data-guide-reveal
          class="grid gap-4 sm:grid-cols-2"
        >
          <article
            v-for="(card, index) in guideCards"
            :key="card"
            class="rounded-lg border border-hrm-ink/10 bg-hrm-ivory p-6"
          >
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-hrm-gold">
              {{ index === 0 ? 'Aurora Bloom' : 'Noir Woods' }}
            </p>
            <p class="mt-8 text-lg leading-8 text-hrm-ink">
              {{ card }}
            </p>
          </article>
        </div>

        <aside
          data-guide-reveal
          class="rounded-lg bg-hrm-ink p-6 text-white"
          aria-labelledby="how-to-use-title"
        >
          <h3
            id="how-to-use-title"
            class="font-serif text-3xl italic"
          >
            How to Use
          </h3>
          <ul class="mt-6 space-y-4">
            <li
              v-for="tip in useTips"
              :key="tip"
              class="flex gap-3 text-sm leading-7 text-white/72"
            >
              <span
                class="mt-3 h-px w-6 shrink-0 bg-hrm-gold"
                aria-hidden="true"
              />
              <span>{{ tip }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>
