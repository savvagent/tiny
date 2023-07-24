const isSerializedDate = (value) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  return (typeof value === 'string' && datePattern.test(value))
}

export default function dateReviver (key, value) {
  if (isSerializedDate(value)) {
    return (new Date(value))
  }
  if (isSerializedDate(key)) {
    return (new Date(key))
  }
  return (value)
}
