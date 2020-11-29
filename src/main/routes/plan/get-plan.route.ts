import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { GetPlanController } from '@/presentation/controllers'
import { PlanEntity } from '@/domain/entities'

export const getPlanPath = new RoutePath(
  'GET',
  '/plan/:id'
)

@InjectableArray('routes')
export class GetPlanRoute implements Route<undefined, PlanEntity> {
  constructor (
    @InjectRouteController(GetPlanController)
    public readonly controller: GetPlanController
  ) { }

  get path (): RoutePath { return getPlanPath }
  get middlewares (): Middleware[] { return [] }
}