export default class I18next {
  message: object;
  options: object;
  splitter: string;
  fallback: string;
  constructor(message = {}, options = {}) {
    this.options = options;
    this.message = message;
    this.splitter = options.splitter || "::";

    return (...key): string => {
      let replacements: object | undefined;
      let count;

      if (key[1] && typeof key[1] === "object") replacements = key[1];
      else if (key[1] && typeof key[1] === "string") this.fallback = key[1];
      else if (key[2] && typeof key[2] === "object") replacements = key[2];
      if (key[2] && typeof key[2] === "string") this.fallback = key[2];

      if (Number.isInteger(key[1])) count = key[1];
      else if (Number.isInteger(key[2])) count = key[2];

      let translation = this.getTranslation(key[0]);

      if (count && replacements) {
        replacements.n = replacements.n ? replacements.n : count;

        // get appropriate plural translation string
        translation = this.getPlural(translation, count);
      }

      // replace {placeholders}
      if (replacements) {
        translation = this.replacePlaceholders(translation, replacements);
      }

      if (translation === null) {
        console.warn(
          `Translation for "${key}" not found. Returning fallback, if any`
        );
        if (this.fallback) translation = this.fallback;
      }

      return translation;
    };
  }

  getTranslation(key: string) {
    if (!key) return null;
    if (Object.hasOwn(this.message, key)) {
      return this.message[key];
    }
    try {
      const components = key.split(this.splitter);
      const namespace = components[0];
      const _key = components[1];
      if (
        Object.hasOwn(this.message, namespace) &&
        this.message[namespace][_key]
      ) {
        return this.message[namespace][_key];
      }
      if (!_key && this.fallback) return this.fallback;
      return key;
    } catch (e) {
      if (this.fallback) return this.fallback;
      return key;
    }
  }

  getPlural(translation: object, count: number) {
    let i;
    let _translation;
    let upper = 0;
    if (typeof translation === "object") {
      const keys = Object.keys(translation);
      if (keys.length === 0) return null;
      for (i = 0; i < keys.length; i++) {
        if (keys[i].indexOf("gt" === 0))
          upper = parseInt(keys[i].replace("gt", ""), 10);
      }
      if (translation[count]) _translation = translation[count];
      else if (count > upper) _translation = translation[`gt${upper}`];
      else if (translation.n) _translation = translation.n;
      else _translation = translation[Object.keys(translation).reverse()[0]];

      return _translation;
    }
  }

  replacePlaceholders(translation: string, replacements: Array<string>) {
    const t =
      typeof translation === "string"
        ? translation.replace(/\{(\w*)\}/g, (match, key) => replacements[key])
        : translation;

    return t;
  }
}
