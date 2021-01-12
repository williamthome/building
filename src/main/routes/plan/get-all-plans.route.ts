import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetAllPlansController } from '@/presentation/controllers'
import { Plan } from '@/domain/entities'

export const getAllPlansPath = new RoutePath('GET', '/plan')

@InjectableRoute(getAllPlansPath)
export class GetAllPlansRoute implements Route<undefined, Plan[]> {
  constructor(
    @InjectRouteController(GetAllPlansController)
    public readonly controller: GetAllPlansController
  ) {}

  get middlewares(): Middleware[] {
    return []
  }
}
