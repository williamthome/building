/**
 * Inspired by https://github.com/microsoft/tsyringe
 */

if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
  throw new Error(
    'DInjector requires the package reflect-metadata. Install the package and add "import \'reflect-metadata\'" to the top of your entry point.'
  )
}

import { InjectorMap } from './models/injector.model'
// import { DInjector } from './usecases'

// export default new DInjector()
export default new InjectorMap()
export * from './decorators'