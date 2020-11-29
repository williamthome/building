import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { GetPlanByIdController } from '@/presentation/controllers'
import { PlanEntity } from '@/domain/entities'

export const getPlanByIdPath = new RoutePath(
  'GET',
  '/plan/:id'
)

@InjectableArray('routes')
export class GetPlanByIdRoute implements Route<undefined, PlanEntity> {
  constructor (
    @InjectRouteController(GetPlanByIdController)
    public readonly controller: GetPlanByIdController
  ) { }

  get path (): RoutePath { return getPlanByIdPath }
  get middlewares (): Middleware[] { return [] }
}