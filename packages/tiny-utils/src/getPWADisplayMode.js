import isBrowser from './isBrowser'

export default function getPWADisplayMode() {
  if (isBrowser) {
    const isStandalone = typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches
    if (document.referrer.startsWith('android-app://')) {
      return 'twa'
    } else if (navigator.standalone || isStandalone) {
      return 'standalone'
    }
    return 'browser'
  }
}
