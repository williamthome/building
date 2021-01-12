export const errorStack = (error: unknown): string =>
  typeof error === 'undefined'
    ? 'Error is undefined'
    : error instanceof Error
    ? error.stack || 'No error stack'
    : typeof error === 'string'
    ? error
    : typeof error === 'bigint' ||
      typeof error === 'boolean' ||
      typeof error === 'number' ||
      typeof error === 'symbol'
    ? error.toString()
    : JSON.stringify(error)
