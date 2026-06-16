<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const fragranceNotes = [
  {
    stage: 'Top Notes',
    title: 'Segar dan mengundang',
    copy: 'Bergamot dan citrus segar memberi kesan pertama yang cerah, bersih, dan mudah dikenakan.',
  },
  {
    stage: 'Heart Notes',
    title: 'Floral dan halus',
    copy: 'Jasmine dan soft rose menghadirkan signature elegan tanpa terasa berat atau berlebihan.',
  },
  {
    stage: 'Base Notes',
    title: 'Hangat dan tahan lama',
    copy: 'Amber, musk, dan sandalwood menetap dekat di kulit dan meninggalkan jejak yang berkesan.',
  },
]

useGsapSection(sectionRef, ({ gsap, root, isMobile }) => {
  const timeline = gsap.timeline({
    defaults: {
      duration: 0.82,
      ease: 'power3.out',
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 74%',
      once: true,
    },
  })

  timeline
    .from('[data-fragrance-reveal]', {
      y: isMobile ? 22 : 30,
      autoAlpha: 0,
      stagger: 0.11,
    })
    .from(
      '[data-fragrance-note]',
      {
        y: isMobile ? 20 : 30,
        autoAlpha: 0,
        stagger: 0.1,
      },
      '-=0.36',
    )
    .from(
      '[data-fragrance-rule]',
      {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.1,
        duration: 0.62,
      },
      '-=0.52',
    )
})
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-surface py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        <p
          data-fragrance-reveal
          class="eyebrow"
        >
          Filosofi wewangian
        </p>
        <h2
          data-fragrance-reveal
          class="luxury-heading luxury-heading--italic mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl"
        >
          Wewangian Kami
        </h2>
      </div>

      <div>
        <p
          data-fragrance-reveal
          class="max-w-3xl text-lg leading-relaxed text-ink-secondary"
        >
          Setiap kreasi HRM Parfume dirancang sebagai signature personal. Dari
          kesan segar pertama hingga base hangat yang menetap, setiap aroma dibuat
          agar terasa elegan, berkesan, dan mudah dikenakan.
        </p>

        <dl
          class="mt-9 grid gap-4 sm:grid-cols-3"
          aria-label="Tahapan aroma HRM Parfume"
        >
          <div
            v-for="(note, index) in fragranceNotes"
            :key="note.stage"
            data-fragrance-note
            class="rounded-lg border border-ink/10 bg-surface-soft p-5 shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
          >
            <dt class="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.2em] text-bronze">
              {{ note.stage }}
              <span
                class="text-xs text-ink-muted"
                aria-hidden="true"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </dt>
            <dd class="mt-5">
              <div
                data-fragrance-rule
                class="mb-5 h-px w-12 bg-gold"
                aria-hidden="true"
              />
              <p class="font-display text-2xl italic leading-tight text-ink">
                {{ note.title }}
              </p>
              <p class="mt-4 text-sm leading-relaxed text-ink-secondary">
                {{ note.copy }}
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
