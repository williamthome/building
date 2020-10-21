import { isObject } from './is-object'

export const isObjectEmpty = (obj: any): boolean => {
  if (!isObject(obj)) throw new Error(`Not an object: ${obj}`)
  return Object.entries(obj).length === 0
}