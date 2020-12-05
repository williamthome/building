import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetPlanByIdController } from '@/presentation/controllers'
import { PlanEntity } from '@/domain/entities'

export const getPlanByIdPath = new RoutePath(
  'GET',
  '/plan/:id'
)

@InjectableRoute(getPlanByIdPath)
export class GetPlanByIdRoute implements Route<undefined, PlanEntity> {
  constructor (
    @InjectRouteController(GetPlanByIdController)
    public readonly controller: GetPlanByIdController
  ) { }

  get middlewares (): Middleware[] { return [] }
}