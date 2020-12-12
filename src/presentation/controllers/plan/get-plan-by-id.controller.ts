// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Plan } from '@/domain/entities'
import { GetPlanByIdUseCase } from '@/domain/usecases'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class GetPlanByIdController implements Controller<undefined, Plan> {

  constructor (
    @Inject() private readonly getPlanByIdUseCase: GetPlanByIdUseCase,
  ) { }

  @HandleError
  @Validate({
    params: {
      schema: idSchema
    }
  })
  async handle (request: HttpRequest): HandleResponse<Plan> {
    const planId = request.params?.id as Plan['id']

    const findedPlan = await this.getPlanByIdUseCase.call(planId)
    if (!findedPlan)
      return notFound(new EntityNotFoundError('Plan'))

    return ok(findedPlan)
  }
}