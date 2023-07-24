import TinyUri from '@savvagent/tiny-uri'
const tRegEx = /({(.+?)})/g

export default class TinyUrlTemplate {
  constructor(template) {
    this.uri = new TinyUri(template)
    this.path = this.uri.path.get()
    this.urlTemplateQuery = this.uri.query.getUrlTemplateQuery()
    return this
  }

  expand(obj = {}) {
    this.path.forEach((path, i) => {
      let substitution = path.substring(path.lastIndexOf('{') + 1, path.lastIndexOf('}'))
      if (substitution) this.uri.path.replace(obj[substitution], i)
    })

    if (this.urlTemplateQuery) {
      let tEls = this.urlTemplateQuery.split(',')
      tEls.forEach((te) => {
        if (typeof obj[te] !== 'undefined') {
          let o = {}
          o[te] = String(obj[te])
          this.uri.query.add(o)
        }
      })
    }

    this.template = this.uri.toString()
    return this
  }

  toString() {
    return this.template
  }
}
