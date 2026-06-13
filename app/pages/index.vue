<script setup lang="ts">
import BenefitsSection from '~/components/sections/home/BenefitsSection.vue'
import FeaturedStorySection from '~/components/sections/home/FeaturedStorySection.vue'
import FinalCtaSection from '~/components/sections/home/FinalCtaSection.vue'
import FooterSection from '~/components/sections/home/FooterSection.vue'
import FragranceGuideSection from '~/components/sections/home/FragranceGuideSection.vue'
import FragranceStorySection from '~/components/sections/home/FragranceStorySection.vue'
import HeroSection from '~/components/sections/home/HeroSection.vue'
import ScentsSection from '~/components/sections/home/ScentsSection.vue'

useSeoMeta({
  title: 'HRM Parfume | Luxury Signature Scents',
  description:
    'HRM Parfume creates elegant, warm, and long-lasting fragrances designed to leave a memorable impression.',
})
</script>

<template>
  <main>
    <HeroSection />
    <FeaturedStorySection />
    <FragranceStorySection />
    <ScentsSection />
    <BenefitsSection />
    <FragranceGuideSection />
    <FinalCtaSection />
    <FooterSection />
  </main>
</template>
