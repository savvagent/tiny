const copy = (thing) => typeof thing === 'object' ? JSON.parse(JSON.stringify(thing)) : thing

export default copy