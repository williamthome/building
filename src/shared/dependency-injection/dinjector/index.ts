/**
 * Inspired by https://github.com/microsoft/tsyringe
 */

if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
  throw new Error(
    'DInjector requires the package reflect-metadata. Install the package and add "import \'reflect-metadata\'" to the top of your entry point.'
  )
}

import { DInjector } from './usecases'

export default new DInjector()
export * from './decorators'