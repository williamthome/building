import { Controller } from '../protocols'

export const UsesTransaction = <T extends new(...args: any[]) => Controller<any, any>> (
  controller: T
): T => {
  return class extends controller {
    usesTransaction = true
  }
}