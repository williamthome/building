import container, { Injectable } from '@/shared/dependency-injection'
import { Entity } from '@/domain/protocols'
import { Controller, Route } from '../protocols'

type ControllerOptions<E> = Omit<Route<E>, 'controller'>

export const InjectableController = <E extends Entity> (
  { method, path, requirement, permissions }: ControllerOptions<E>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => <T extends { new(...args: any[]): Controller<E> }> (controller: T): T => {
  Injectable()(controller)

  container
    .define<string, Route<E>>('routes')
    .asArray({
      method,
      path,
      controller: container.resolve(controller),
      requirement,
      permissions
    })
    .done()

  return controller
}