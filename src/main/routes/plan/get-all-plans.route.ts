import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { GetAllPlansController } from '@/presentation/controllers'
import { PlanEntity } from '@/domain/entities'

export const getAllPlansPath = new RoutePath(
  'GET',
  '/plan'
)

@InjectableArray('routes')
export class GetAllPlansRoute implements Route<undefined, PlanEntity[]> {
  constructor (
    @InjectRouteController(GetAllPlansController)
    public readonly controller: GetAllPlansController
  ) { }

  get path (): RoutePath { return getAllPlansPath }
  get middlewares (): Middleware[] { return [] }
}