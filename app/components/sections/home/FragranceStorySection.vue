<script setup lang="ts">
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)

const fragranceNotes = [
  {
    stage: 'Opening',
    title: 'Fresh and inviting',
    copy: 'A clean first impression that feels bright, polished, and easy to wear.',
  },
  {
    stage: 'Heart',
    title: 'Floral and refined',
    copy: 'Soft florals bring an elegant signature without feeling heavy or loud.',
  },
  {
    stage: 'Base',
    title: 'Warm and lasting',
    copy: 'Amber, musk, and woods settle close to the skin and leave a memorable trail.',
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
        rotateX: isMobile ? 0 : -6,
        transformOrigin: 'center bottom',
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
    class="bg-hrm-ivory py-20 sm:py-24 lg:py-28"
  >
    <div class="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        <p
          data-fragrance-reveal
          class="eyebrow"
        >
          Fragrance storytelling
        </p>
        <h2
          data-fragrance-reveal
          class="luxury-heading mt-5 text-4xl text-hrm-ink sm:text-5xl lg:text-7xl"
        >
          Our Fragrances
        </h2>
      </div>

      <div>
        <p
          data-fragrance-reveal
          class="max-w-3xl text-lg leading-9 text-hrm-charcoal/78"
        >
          Every HRM Parfume creation is designed as a personal signature. From the
          first fresh impression to the warm base that lingers, each scent is made
          to feel elegant, memorable, and easy to wear.
        </p>

        <dl
          class="mt-9 grid gap-4 sm:grid-cols-3"
          aria-label="HRM Parfume fragrance notes"
        >
          <div
            v-for="(note, index) in fragranceNotes"
            :key="note.stage"
            data-fragrance-note
            class="rounded-lg border border-hrm-ink/10 bg-[#fbf8f1] p-5 shadow-[0_1rem_2.5rem_rgba(21,18,16,0.05)]"
          >
            <dt class="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.2em] text-hrm-gold">
              {{ note.stage }}
              <span
                class="text-[0.65rem] text-hrm-charcoal/42"
                aria-hidden="true"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </dt>
            <dd class="mt-5">
              <div
                data-fragrance-rule
                class="mb-5 h-px w-12 bg-hrm-gold"
                aria-hidden="true"
              />
              <p class="font-serif text-2xl italic leading-tight text-hrm-ink">
                {{ note.title }}
              </p>
              <p class="mt-4 text-sm leading-7 text-hrm-charcoal/70">
                {{ note.copy }}
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
