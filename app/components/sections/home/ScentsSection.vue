<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

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

  if (!isMobile) {
    gsap.utils.toArray<HTMLElement>('[data-product-card]').forEach((card) => {
      const image = card.querySelector<HTMLElement>('[data-product-image]')

      if (!image) {
        return
      }

      gsap.to(image, {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      })
    })
  }

  if (!canHover) {
    return
  }

  const cleanupHandlers = gsap.utils.toArray<HTMLElement>('[data-product-card]').map((card) => {
    const image = card.querySelector<HTMLElement>('[data-product-image]')
    const cta = card.querySelector<HTMLElement>('[data-product-cta]')

    const enter = () => {
      gsap.to(card, {
        y: -6,
        duration: 0.32,
        ease: 'power2.out',
      })
      if (image) {
        gsap.to(image, {
          scale: 1.13,
          duration: 0.48,
          ease: 'power2.out',
        })
      }
      if (cta) {
        gsap.to(cta, {
          x: 4,
          duration: 0.26,
          ease: 'power2.out',
        })
      }
    }

    const leave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.36,
        ease: 'power2.out',
      })
      if (image) {
        gsap.to(image, {
          scale: 1.08,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
      if (cta) {
        gsap.to(cta, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
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
          <div
            data-product-image-wrap
            class="aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-hrm-warm"
          >
            <img
              data-product-image
              :src="product.image"
              :alt="product.alt"
              class="h-full w-full object-cover"
              width="1214"
              height="1214"
              loading="lazy"
            >
          </div>
          <div
            data-product-copy
            class="p-2 pt-6 sm:p-4 sm:pt-7"
          >
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
              data-product-cta
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
