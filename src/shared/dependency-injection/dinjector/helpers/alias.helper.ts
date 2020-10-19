import { Alias, InjectConstructor } from '../types'

export const aliasToString = (alias: Alias): string => {
  return isAliasInjectConstructor(alias) ? (alias as InjectConstructor).name : alias.toString()
}

export const minimizeAlias = (alias: Alias): string | InjectConstructor => {
  return isAliasInjectConstructor(alias) ? alias as InjectConstructor : alias.toString()
}

export const isAliasInjectConstructor = (alias: Alias): alias is InjectConstructor => {
  return typeof alias !== 'string' && typeof alias !== 'symbol'
}
