import { isObject } from '../is-object'
import { isObjectEmpty } from '../is-object-empty'
import { ObjectComparison } from './protocols/object-comparison'

export const objectComparer = (o1: Record<any, any>, o2: Record<any, any>, deep = false): ObjectComparison => {
  const added: Record<any, any> = {}
  const updated: Record<any, any> = {}
  const removed: Record<any, any> = {}
  const unchanged: Record<any, any> = {}

  for (const prop in o1) {
    if (o1 && isObject(o1) && !isObjectEmpty(o1) && Object.prototype.hasOwnProperty.call(o1, prop)) {
      const o2PropValue = o2 ? o2[prop] : {}
      const o1PropValue = o1 ? o1[prop] : {}
      if (o2 && isObject(o2) && !isObjectEmpty(o2) && Object.prototype.hasOwnProperty.call(o2, prop)) {
        if (o2PropValue === o1PropValue) {
          if (unchanged[prop] && Object.getOwnPropertyDescriptor(unchanged, 'prop')?.writable) {
            Object.defineProperty(unchanged, prop, o1PropValue)
          }
          // unchanged[prop] = o1PropValue
        } else {
          if (updated[prop] && Object.getOwnPropertyDescriptor(updated, 'prop')?.writable) {
            const updatedValue = deep && isObject(o1PropValue) && isObject(o2PropValue) ? objectComparer(o1PropValue, o2PropValue, deep) : { newValue: o2PropValue }
            Object.defineProperty(updated, prop, updatedValue)
          }
          // updated[prop] = deep && isObject(o1PropValue) && isObject(o2PropValue) ? objectComparer(o1PropValue, o2PropValue, deep) : { newValue: o2PropValue }
        }
      } else {
        if (removed[prop] && Object.getOwnPropertyDescriptor(removed, 'prop')?.writable) {
          Object.defineProperty(removed, prop, o1PropValue)
        }
        // removed[prop] = o1PropValue
      }
    }
  }

  for (const prop in o2) {
    if (o2 && isObject(o2) && !isObjectEmpty(o2) && Object.prototype.hasOwnProperty.call(o2, prop)) {
      const o1PropValue = o1 ? o1[prop] : {}
      const o2PropValue = o2 ? o2[prop] : {}
      if (o1 && isObject(o1) && !isObjectEmpty(o1) && Object.prototype.hasOwnProperty.call(o1, prop)) {
        if (o1PropValue !== o2PropValue) {
          if (!deep || !isObject(o1PropValue)) {
            if (updated[prop] && Object.getOwnPropertyDescriptor(updated[prop], 'oldValue')?.writable) {
              updated[prop].oldValue = o1PropValue
            }
          }
        }
      } else {
        if (added[prop] && Object.getOwnPropertyDescriptor(added, 'prop')?.writable) {
          Object.defineProperty(added, prop, o2PropValue)
        }
        // added[prop] = o2PropValue
      }
    }
  }

  const equals = isObjectEmpty(added)
    && isObjectEmpty(updated)
    && isObjectEmpty(removed)
    && isObjectEmpty(unchanged)

  return { added, updated, removed, unchanged, equals }
}