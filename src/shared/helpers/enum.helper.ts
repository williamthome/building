export const enumEntries = (enumerable: any): Record<string, any> => {
  return enumKeys(enumerable).map(key => ({ key, value: enumerable[key] }))
}

export const enumKeys = <T> (enumerable: T): string[] => {
  return enumKeysAndValues<string>(enumerable).filter(value => typeof value === 'string')
}

export const enumValues = <T> (enumerable: T): number[] => {
  return enumKeysAndValues<number>(enumerable).filter(value => typeof value === 'number')
}

const enumKeysAndValues = <T extends number | string> (enumerable: any): T[] => {
  return Object.keys(enumerable).map(key => enumerable[key])
}

export const firstEnumValue = <T> (enumerable: T): number => enumValues(enumerable)[0]

export const lastEnumValue = <T> (enumerable: T): number => {
  const values = enumValues(enumerable)
  const lastIndex = values.length - 1
  return values[lastIndex]
}