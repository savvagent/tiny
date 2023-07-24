import serialize from './serialize'

export default async function digest(message) {
  return serialize(message)
}
