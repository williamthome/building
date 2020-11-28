export const errorStack = (error: any): string =>
  typeof error === 'undefined'
    ? 'Error is undefined'
    : 'stack' in error
      ? error['stack']
      : typeof error === 'string'
        ? error
        : typeof error === 'bigint' ||
          typeof error === 'boolean' ||
          typeof error === 'number' ||
          typeof error === 'symbol'
          ? error.toString()
          : JSON.stringify(error)