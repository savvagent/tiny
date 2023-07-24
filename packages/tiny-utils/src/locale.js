import isBrowser from './isBrowser'

export const userLocale =
  isBrowser && typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : 'en'

export const simpleLocale = userLocale.replace(/-.*/, '')

