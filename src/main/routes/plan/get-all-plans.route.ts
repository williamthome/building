import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetAllPlansController } from '@/presentation/controllers'
import { PlanEntity } from '@/domain/entities'

export const getAllPlansPath = new RoutePath(
  'GET',
  '/plan'
)

@InjectableRoute(getAllPlansPath)
export class GetAllPlansRoute implements Route<undefined, PlanEntity[]> {
  constructor (
    @InjectRouteController(GetAllPlansController)
    public readonly controller: GetAllPlansController
  ) { }

  get middlewares (): Middleware[] { return [] }
}