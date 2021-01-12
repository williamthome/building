export type RequiredLiteralKeys<T> = {
  [K in keyof T]-?: string extends K
    ? never
    : number extends K
    ? never
    : Record<PropertyKey, any> extends Pick<T, K>
    ? never
    : K
} extends { [_ in keyof T]-?: infer U }
  ? U extends keyof T
    ? U
    : never
  : never

export type OptionalLiteralKeys<T> = {
  [K in keyof T]-?: string extends K
    ? never
    : number extends K
    ? never
    : Record<PropertyKey, any> extends Pick<T, K>
    ? K
    : never
} extends { [_ in keyof T]-?: infer U }
  ? U extends keyof T
    ? U
    : never
  : never

export type IsUnique<T extends any[]> = UK0<T, 'Items are not unique', Record<PropertyKey, any>>

type Tail<T extends any[]> = ((...a: T) => void) extends (p: any, ...t: infer P) => void ? P : []
type UK0<T extends any[], TErr, TOk> = T extends []
  ? TOk
  : T[0] extends Tail<T>[number]
  ? TErr
  : UK1<Tail<T>, TErr, TOk>
type UK1<T extends any[], TErr, TOk> = T extends []
  ? TOk
  : T[0] extends Tail<T>[number]
  ? TErr
  : UK2<Tail<T>, TErr, TOk>
type UK2<T extends any[], TErr, TOk> = T extends []
  ? TOk
  : T[0] extends Tail<T>[number]
  ? TErr
  : UK3<Tail<T>, TErr, TOk>
type UK3<T extends any[], TErr, TOk> = T extends []
  ? TOk
  : T[0] extends Tail<T>[number]
  ? TErr
  : UK4<Tail<T>, TErr, TOk>
type UK4<T extends any[], TErr, TOk> = T extends []
  ? TOk
  : T[0] extends Tail<T>[number]
  ? TErr
  : UK5<Tail<T>, TErr, TOk>
type UK5<T extends any[], TErr, TOk> = T extends []
  ? TOk
  : T[0] extends Tail<T>[number]
  ? TErr
  : UK6<Tail<T>, TErr, TOk>
type UK6<T extends any[], TErr, TOk> = T extends []
  ? TOk
  : T[0] extends Tail<T>[number]
  ? TErr
  : 'Array to big'
