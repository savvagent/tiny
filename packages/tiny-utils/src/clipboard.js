import isBrowser from './isBrowser'

export function clipboard(node, { trigger = 'click', text = '' } = {}) {
  const handle = async () => {
    if (isBrowser && typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(text).then(
        () => node.dispatchEvent(new CustomEvent('copied', { detail: { clipboard: text } })),
        (e) => node.dispatchEvent(new CustomEvent('error', { detail: { error: e } }))
      )
    }
  }

  if (isBrowser) {
    node.addEventListener(trigger, handle, true)
  }

  return {
    update: (params) => {
      if (params.trigger !== undefined) trigger = params.trigger

      if (params.text !== undefined) text = params.text
    },
    destroy() {
      node.removeEventListener(trigger, handle, true)
    },
  }
}
