export type AllOptional<T> = T extends { [x: string]: any }
  ? { [K in keyof T]?: T[K] extends { [x: string]: any } ? AllOptional<T[K]> : T[K] }
  : never