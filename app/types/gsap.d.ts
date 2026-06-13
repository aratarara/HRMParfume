import type gsapModule from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof gsapModule
    $ScrollTrigger: typeof ScrollTriggerType
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $gsap: typeof gsapModule
    $ScrollTrigger: typeof ScrollTriggerType
  }
}

export {}
