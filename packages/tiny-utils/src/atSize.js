export default (bp, { default: defaultValue, xxs, xs, sm, md, lg, xl, xxl }) => {
  let retVal
  switch (bp) {
    case 'xxl':
      retVal = xxl ?? xl ?? lg ?? md ?? sm ?? xs ?? xxs ?? defaultValue
      break
    case 'xl':
      retVal = xl ?? lg ?? md ?? sm ?? xs ?? xxs ?? defaultValue
      break
    case 'lg':
      retVal = lg ?? md ?? sm ?? xs ?? xxs ?? defaultValue
      break
    case 'md':
      retVal = md ?? sm ?? xs ?? xxs ?? defaultValue
      break
    case 'sm':
      retVal = sm ?? xs ?? xxs ?? defaultValue
      break
    case 'xs':
      retVal = xs ?? xxs ?? defaultValue
      break
    case 'xxs':
      retVal = xxs ?? defaultValue
      break
    default:
      retVal = defaultValue
      break
  }
  return retVal
}

