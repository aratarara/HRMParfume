<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

const products = [
  {
    name: 'Aurora Bloom',
    type: 'Eau de Parfum',
    image: '/images/hrm/perfume-1.jpg',
    alt: 'Aurora Bloom perfume bottle with jasmine flowers and citrus accents',
    description:
      'A soft floral fragrance with fresh citrus, jasmine, rose, musk, and vanilla. Designed for daily elegance and effortless confidence.',
    notes: 'Fresh Citrus, Jasmine, Rose, Musk, Vanilla',
  },
  {
    name: 'Noir Woods',
    type: 'Eau de Parfum',
    image: '/images/hrm/perfume-2.jpg',
    alt: 'Noir Woods dark perfume bottle with sandalwood and amber accents',
    description:
      'A warm woody fragrance with black pepper, amber, sandalwood, and tonka bean. Made for evening moments and a bold lasting impression.',
    notes: 'Black Pepper, Amber, Sandalwood, Tonka Bean',
  },
]

onMounted(() => {
  if (!sectionRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const { $gsap } = useNuxtApp()
  const ctx = $gsap.context(() => {
    $gsap.from('[data-scents-heading]', {
      y: 24,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 74%',
        once: true,
      },
    })

    $gsap.from('[data-product-card]', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.16,
      scrollTrigger: {
        trigger: '[data-product-grid]',
        start: 'top 78%',
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
    id="scents"
    ref="sectionRef"
    class="bg-[#fbf8f1] py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div
        data-scents-heading
        class="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end"
      >
        <div>
          <p class="eyebrow">Signature collection</p>
          <h2 class="luxury-heading mt-5 text-4xl text-hrm-ink sm:text-5xl lg:text-7xl">
            Signature Scents
          </h2>
        </div>
        <p class="max-w-xl text-base leading-8 text-hrm-charcoal/74 lg:justify-self-end">
          Two refined compositions define the HRM Parfume collection: fresh floral
          softness for daily elegance and warm woody depth for evening presence.
        </p>
      </div>

      <div
        data-product-grid
        class="mt-12 grid gap-6 lg:grid-cols-2"
      >
        <article
          v-for="product in products"
          :key="product.name"
          data-product-card
          class="rounded-lg border border-hrm-ink/10 bg-hrm-ivory p-4 shadow-[0_1.5rem_4rem_rgba(21,18,16,0.07)] sm:p-5"
        >
          <img
            :src="product.image"
            :alt="product.alt"
            class="aspect-[4/3] w-full rounded-[1.75rem] object-cover"
            width="1214"
            height="1214"
            loading="lazy"
          >
          <div class="p-2 pt-6 sm:p-4 sm:pt-7">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-hrm-gold">
              {{ product.type }}
            </p>
            <h3 class="mt-4 font-serif text-4xl italic text-hrm-ink sm:text-5xl">
              {{ product.name }}
            </h3>
            <p class="mt-4 max-w-2xl text-base leading-8 text-hrm-charcoal/76">
              {{ product.description }}
            </p>
            <p class="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-hrm-charcoal/66">
              Notes: {{ product.notes }}
            </p>
            <a
              href="#contact"
              class="focus-ring mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-hrm-ink/18 px-5 text-sm font-semibold text-hrm-ink transition hover:border-hrm-ink hover:bg-white/55"
            >
              Discover the Scent
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
