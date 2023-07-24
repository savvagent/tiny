import isBrowser from './isBrowser'

const portal = (node) => {
  if (isBrowser) {
    document.body.appendChild(node)
  }
}

export default portal
