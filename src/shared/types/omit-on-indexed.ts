// see: https://github.com/microsoft/TypeScript/issues/31153#issuecomment-487872268

type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U }
  ? U
  : never

// A bit of arm wrestling to convince TS  KnownKeys<T> is keyof T
type OmitFromKnownKeys<T, K extends PropertyKey> = KnownKeys<T> extends infer U
  ? [U] extends [keyof T]
    ? Pick<T, Exclude<U, K>>
    : never
  : never

export type OmitOnIndexed<T, K extends PropertyKey> = OmitFromKnownKeys<T, K> & // Get the known part without K
  (string extends keyof T ? { [n: string]: T[keyof T] } : Record<PropertyKey, any>) // Add the index signature back if necessary
