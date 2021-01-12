export type Flatten<T> = NonObjectPropertiesOf<T> & SubPropertiesOf<T>

export type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends Record<PropertyKey, any> ? K : K
}[keyof T]
// export type NonObjectKeysOf<T> = {
//   [K in keyof T]: T[K] extends Array<any> ?
//   K :
//   T[K] extends Record<PropertyKey, any> ? never : K
// }[keyof T]

export type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>

export type ValuesOf<T> = T[keyof T]
export type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, Record<PropertyKey, any>>, Array<any>>

export type SubPropertiesOf<T> = {
  [K in keyof ObjectValuesOf<T>]: ObjectValuesOf<T>[K]
}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

type DFBase<T, Recursor> = Required<Pick<T, NonObjectKeysOf<T>>> & UnionToIntersection<Recursor>

export type DeepFlatten<T> = T extends any ? DFBase<T, DF2<ObjectValuesOf<T>>> : never
type DF2<T> = T extends any ? DFBase<T, DF3<ObjectValuesOf<T>>> : never
type DF3<T> = T extends any ? DFBase<T, DF4<ObjectValuesOf<T>>> : never
type DF4<T> = T extends any ? DFBase<T, DF5<ObjectValuesOf<T>>> : never
type DF5<T> = T extends any ? DFBase<T, DF6<ObjectValuesOf<T>>> : never
type DF6<T> = T extends any ? DFBase<T, DF7<ObjectValuesOf<T>>> : never
type DF7<T> = T extends any ? DFBase<T, DF8<ObjectValuesOf<T>>> : never
type DF8<T> = T extends any ? DFBase<T, DF9<ObjectValuesOf<T>>> : never
type DF9<T> = T extends any ? DFBase<T, ObjectValuesOf<T>> : never

export type DeepFlattenPaths<T> = { [K in keyof DeepFlatten<T>]: K }
