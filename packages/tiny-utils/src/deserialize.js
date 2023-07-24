import isJson from './isJson'
import dateReviver from './dateReviver'

const deserialize = (str) => {
  if (isJson(str)) {
    return JSON.parse(str, dateReviver)
  }
  return str
}

export default deserialize
