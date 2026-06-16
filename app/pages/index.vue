<script setup lang="ts">
import AnnouncementBar from '~/components/sections/home/AnnouncementBar.vue'
import NavbarSection from '~/components/sections/home/NavbarSection.vue'
import HeroSection from '~/components/sections/home/HeroSection.vue'
import FeaturedStorySection from '~/components/sections/home/FeaturedStorySection.vue'
import FragranceStorySection from '~/components/sections/home/FragranceStorySection.vue'
import ScentsSection from '~/components/sections/home/ScentsSection.vue'
import BenefitsSection from '~/components/sections/home/BenefitsSection.vue'
import FragranceGuideSection from '~/components/sections/home/FragranceGuideSection.vue'
import HowToOrderSection from '~/components/sections/home/HowToOrderSection.vue'
import FaqSection from '~/components/sections/home/FaqSection.vue'
import FinalCtaSection from '~/components/sections/home/FinalCtaSection.vue'
import FooterSection from '~/components/sections/home/FooterSection.vue'

useSeoMeta({
  title: 'HRM Parfume | Parfum Signature Mewah & Tahan Lama',
  description:
    'HRM Parfume menghadirkan wewangian elegan, hangat, dan tahan lama yang dirancang untuk meninggalkan kesan yang berkesan. Pesan langsung via WhatsApp.',
  ogTitle: 'HRM Parfume | Parfum Signature Mewah & Tahan Lama',
  ogDescription:
    'Temukan aroma signature Anda bersama HRM Parfume. Pesan langsung via WhatsApp.',
  ogType: 'website',
})
</script>

<template>
  <div>
    <AnnouncementBar />
    <NavbarSection />
    <main>
      <HeroSection />
      <FeaturedStorySection />
      <FragranceStorySection />
      <ScentsSection />
      <BenefitsSection />
      <FragranceGuideSection />
      <HowToOrderSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
    <FooterSection />
  </div>
</template>
