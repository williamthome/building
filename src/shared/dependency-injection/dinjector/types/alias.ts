import { InjectConstructor } from './inject-constructor'

export type Alias <T> = string | symbol | InjectConstructor<T>