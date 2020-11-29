// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, ValidateParams } from '@/presentation/decorators'
// < Out: only domain layer
import { PlanEntity } from '@/domain/entities'
import { GetPlanByIdUseCase } from '@/domain/usecases'
import { EntityNotFoundError } from '@/presentation/errors'

@Injectable()
export class GetPlanByIdController implements Controller<undefined, PlanEntity> {

  constructor (
    @Inject() private readonly getPlanByIdUseCase: GetPlanByIdUseCase,
  ) { }

  @ValidateParams<undefined, PlanEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest<undefined>): HandleResponse<PlanEntity> {
    const id = request.params?.id as PlanEntity['id']

    const plan = await this.getPlanByIdUseCase.call(id)
    if (!plan)
      return notFound(new EntityNotFoundError('Plan'))

    return ok(plan)
  }
}