import heinjector, { Injectable } from 'heinjector'
import { Entity } from '@/domain/protocols'
import { Controller, Route } from '../protocols'

type ControllerOptions<E> = Omit<Route<E>, 'controller'>

export const InjectableController = <E extends Entity> (
  { method, path, requirement, permissions }: ControllerOptions<E>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => <T extends { new(...args: any[]): Controller<E> }> (controller: T): T => {
  Injectable()(controller)

  heinjector.define<Route<E>>({
    identifier: 'routes',
    value: {
      method,
      path,
      controller: heinjector.resolve<Controller<E>>(controller) as Controller<E>,
      requirement,
      permissions
    },
    overrideIfArray: false,
    updateDependencies: true
  })

  return controller
}