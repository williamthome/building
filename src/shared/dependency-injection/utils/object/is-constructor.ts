const handler = { construct () { return handler } }

export const isConstructor = (x: any): boolean => {
  try {
    return !!(new (new Proxy(x, handler))())
  } catch (e) {
    return false
  }
}