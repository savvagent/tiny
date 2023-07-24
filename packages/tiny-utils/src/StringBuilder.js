export default class StringBuilder {
  constructor(string) {
    if (!string || typeof string === 'undefined') this.string = String('')
    else this.string = String(string)
  }
  toString() {
    return this.string
  }
  append(val) {
    this.string += val
    return this
  }
  insert(pos, val) {
    const length = this.string.length
    const left = this.string.slice(0, pos)
    const right = this.string.slice(pos)
    this.string = left + val + right
    return this
  }
}
