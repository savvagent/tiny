import isBrowser from './isBrowser'
import deserialize from './deserialize'
import serialize from './serialize'

class MemoryStore {
  constructor() {
    this.db = new Map()
  }

  clear() {
    return this.db.clear()
  }

  del(path) {
    return this.db.delete(path)
  }

  get(path) {
    return this.db.get(path)
  }

  put(path, value) {
    return this.set(path, value)
  }

  set(path, value) {
    return this.db.set(path, value)
  }
}

class BlockingStorage {
  constructor() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.store = window.localStorage
    } else {
      this.store = window.sessionStorage
    }
  }

  clear() {
    return this.store.clear()
  }

  del(key) {
    return this.store.removeItem(key)
  }

  get(key) {
    if (isBrowser) return deserialize(this.store.getItem(key))
  }

  put(key, data) {
    return this.store.setItem(key, serialize({ ...this.get(key), ...data }))
  }

  set(key, data) {
    return this.store.setItem(key, serialize(data))
  }
}

export default isBrowser ? new BlockingStorage() : new MemoryStore()
