<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const { orderLink } = useWhatsApp()

const products = [
  {
    name: 'Aurora Bloom',
    type: 'Eau de Parfum',
    size: '50ml',
    price: 'Rp 285.000',
    image: '/images/hrm/perfume-1.jpg',
    alt: 'Botol parfum Aurora Bloom dengan aksen bunga jasmine dan citrus',
    description:
      'Wewangian floral lembut dengan fresh citrus, jasmine, rose, musk, dan vanilla. Dirancang untuk keanggunan sehari-hari dan rasa percaya diri yang effortless.',
    notes: 'Fresh Citrus, Jasmine, Rose, Musk, Vanilla',
    mood: 'Fresh, Floral, Soft',
    occasion: 'Pemakaian Harian',
  },
  {
    name: 'Noir Woods',
    type: 'Eau de Parfum',
    size: '50ml',
    price: 'Rp 285.000',
    image: '/images/hrm/perfume-2.jpg',
    alt: 'Botol parfum Noir Woods berwarna gelap dengan aksen sandalwood dan amber',
    description:
      'Wewangian woody hangat dengan black pepper, amber, sandalwood, dan tonka bean. Dibuat untuk momen malam hari dan kesan kuat yang tahan lama.',
    notes: 'Black Pepper, Amber, Sandalwood, Tonka Bean',
    mood: 'Warm, Woody, Bold',
    occasion: 'Malam Hari',
  },
]

useGsapSection(sectionRef, ({ gsap, root, isMobile, canHover }) => {
  gsap.set('[data-product-image]', {
    scale: 1.08,
    transformOrigin: 'center center',
  })

  gsap.from('[data-scents-heading] > *', {
    y: isMobile ? 20 : 28,
    autoAlpha: 0,
    duration: 0.82,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: root,
      start: 'top 74%',
      once: true,
    },
  })

  const cardsTimeline = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
    scrollTrigger: {
      trigger: '[data-product-grid]',
      start: 'top 78%',
      once: true,
    },
  })

  cardsTimeline
    .from('[data-product-card]', {
      y: isMobile ? 22 : 38,
      autoAlpha: 0,
      duration: 0.82,
      stagger: 0.14,
    })
    .from(
      '[data-product-image-wrap]',
      {
        clipPath: 'inset(0% 0% 100% 0% round 1.75rem)',
        duration: 0.92,
        stagger: 0.12,
      },
      '-=0.54',
    )
    .from(
      '[data-product-image]',
      {
        scale: 1.16,
        duration: 0.92,
        stagger: 0.12,
      },
      '<',
    )
    .from(
      '[data-product-copy] > *',
      {
        y: 14,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.045,
      },
      '-=0.48',
    )

  if (!canHover) {
    return
  }

  const cleanupHandlers = gsap.utils.toArray<HTMLElement>('[data-product-card]').map((card) => {
    const image = card.querySelector<HTMLElement>('[data-product-image]')

    const enter = () => {
      gsap.to(card, { y: -6, duration: 0.32, ease: 'power2.out' })
      if (image) {
        gsap.to(image, { scale: 1.13, duration: 0.48, ease: 'power2.out' })
      }
    }
    const leave = () => {
      gsap.to(card, { y: 0, duration: 0.36, ease: 'power2.out' })
      if (image) {
        gsap.to(image, { scale: 1.08, duration: 0.5, ease: 'power2.out' })
      }
    }

    card.addEventListener('pointerenter', enter)
    card.addEventListener('pointerleave', leave)

    return () => {
      card.removeEventListener('pointerenter', enter)
      card.removeEventListener('pointerleave', leave)
    }
  })

  return () => cleanupHandlers.forEach((cleanup) => cleanup())
})
</script>

<template>
  <section
    id="scents"
    ref="sectionRef"
    class="bg-surface-soft py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell">
      <div
        data-scents-heading
        class="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end"
      >
        <div>
          <p class="eyebrow">Koleksi signature</p>
          <h2 class="luxury-heading luxury-heading--italic mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
            Signature Scents
          </h2>
        </div>
        <p class="max-w-xl text-base leading-relaxed text-ink-secondary lg:justify-self-end">
          Dua komposisi pilihan mendefinisikan koleksi HRM Parfume: kelembutan
          floral segar untuk keanggunan harian dan kedalaman woody hangat untuk
          kehadiran malam hari.
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
          class="flex flex-col rounded-xl border border-ink/10 bg-surface p-4 shadow-[0_12px_32px_rgba(0,0,0,0.06)] sm:p-5"
        >
          <div
            data-product-image-wrap
            class="aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-warm"
          >
            <img
              data-product-image
              :src="product.image"
              :alt="product.alt"
              class="h-full w-full object-cover"
              width="1214"
              height="910"
              loading="lazy"
            >
          </div>
          <div
            data-product-copy
            class="flex flex-1 flex-col p-2 pt-6 sm:p-3 sm:pt-7"
          >
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.18em] text-bronze">
              <span>{{ product.type }}</span>
              <span
                class="text-ink-muted"
                aria-hidden="true"
              >•</span>
              <span class="text-ink-secondary">{{ product.size }}</span>
            </div>
            <h3 class="mt-4 font-display text-3xl italic text-ink sm:text-4xl">
              {{ product.name }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-ink-secondary">
              {{ product.description }}
            </p>

            <dl class="mt-5 space-y-2 text-sm">
              <div class="flex gap-2">
                <dt class="shrink-0 font-semibold text-ink">Notes:</dt>
                <dd class="text-ink-secondary">{{ product.notes }}</dd>
              </div>
              <div class="flex gap-2">
                <dt class="shrink-0 font-semibold text-ink">Mood:</dt>
                <dd class="text-ink-secondary">{{ product.mood }}</dd>
              </div>
              <div class="flex gap-2">
                <dt class="shrink-0 font-semibold text-ink">Cocok untuk:</dt>
                <dd class="text-ink-secondary">{{ product.occasion }}</dd>
              </div>
            </dl>

            <div class="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
              <p class="font-display text-2xl text-ink">
                {{ product.price }}
              </p>
              <a
                :href="orderLink(product.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-whatsapp focus-ring"
                :aria-label="`Pesan ${product.name} via WhatsApp`"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
