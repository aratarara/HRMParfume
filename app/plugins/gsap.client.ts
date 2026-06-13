import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

export default defineNuxtPlugin(() => {
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger)
    isRegistered = true
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
