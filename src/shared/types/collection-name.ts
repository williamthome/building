export const collectionNames = [
  'users',
  'unverified',
  'companies',
  'errors',
  'buildings',
  'projects',
  'plans'
] as const

export type CollectionName = typeof collectionNames[number]