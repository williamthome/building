import { AliasType, TargetType } from '../types'

export const aliasToString = <T> (alias: AliasType<T>): string => {
  return isAliasInjectConstructor(alias) ? (alias as TargetType<T>).name : alias.toString()
}

export const minimizeAlias = <T> (alias: AliasType<T>): string | TargetType<T> => {
  return isAliasInjectConstructor(alias) ? alias as TargetType<T> : alias.toString()
}

export const isAliasInjectConstructor = <T> (alias: AliasType<T>): alias is TargetType<T> => {
  return typeof alias !== 'string' && typeof alias !== 'symbol'
}
