/**
 * Centralized WhatsApp ordering helper for HRM Parfume.
 *
 * The order flow is intentionally static: every CTA resolves to a wa.me link
 * with a prefilled, URL-encoded Indonesian message. No cart, checkout, or API.
 *
 * Replace WHATSAPP_NUMBER with the real HRM Parfume business number.
 */
const WHATSAPP_NUMBER = '6281234567890'

export function useWhatsApp() {
  const buildLink = (message: string): string => {
    const text = encodeURIComponent(message)
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  }

  /** Link prefilled with a specific product order message. */
  const orderLink = (productName: string): string =>
    buildLink(
      `Halo HRM Parfume, saya tertarik untuk memesan ${productName}. Bisa dibantu informasinya?`,
    )

  /** General contact link for the final CTA and footer. */
  const contactLink = (): string =>
    buildLink(
      'Halo HRM Parfume, saya ingin berkonsultasi mengenai pilihan parfum yang cocok untuk saya.',
    )

  return {
    whatsappNumber: WHATSAPP_NUMBER,
    buildLink,
    orderLink,
    contactLink,
  }
}
