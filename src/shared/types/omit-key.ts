export type OmitKey<T, K extends keyof T & string> = Pick<T, Exclude<keyof T, K>>
