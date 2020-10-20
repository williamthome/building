import { Alias, InjectConstructor } from '../types'

export const aliasToString = <T> (alias: Alias<T>): string => {
  return isAliasInjectConstructor(alias) ? (alias as InjectConstructor<T>).name : alias.toString()
}

export const minimizeAlias = <T> (alias: Alias<T>): string | InjectConstructor<T> => {
  return isAliasInjectConstructor(alias) ? alias as InjectConstructor<T> : alias.toString()
}

export const isAliasInjectConstructor = <T> (alias: Alias<T>): alias is InjectConstructor<T> => {
  return typeof alias !== 'string' && typeof alias !== 'symbol'
}
