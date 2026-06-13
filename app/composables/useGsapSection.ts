import type gsapModule from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, type Ref } from 'vue'

type GsapTools = {
  gsap: typeof gsapModule
  ScrollTrigger: typeof ScrollTriggerType
  root: HTMLElement
  isMobile: boolean
  canHover: boolean
}

type GsapSetup = (tools: GsapTools) => void | (() => void)

export function useGsapSection(
  sectionRef: Ref<HTMLElement | null>,
  setupAnimation: GsapSetup,
) {
  let cleanupAnimation: (() => void) | undefined

  onMounted(() => {
    const root = sectionRef.value

    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const { $gsap, $ScrollTrigger } = useNuxtApp()
    const cleanupHandlers: Array<() => void> = []
    const ctx = $gsap.context(() => {
      const setupCleanup = setupAnimation({
        gsap: $gsap,
        ScrollTrigger: $ScrollTrigger,
        root,
        isMobile: window.matchMedia('(max-width: 767px)').matches,
        canHover: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
      })

      if (typeof setupCleanup === 'function') {
        cleanupHandlers.push(setupCleanup)
      }
    }, root)

    cleanupAnimation = () => {
      cleanupHandlers.forEach((cleanup) => cleanup())
      ctx.revert()
      $ScrollTrigger.refresh()
    }
  })

  onUnmounted(() => {
    cleanupAnimation?.()
  })
}
