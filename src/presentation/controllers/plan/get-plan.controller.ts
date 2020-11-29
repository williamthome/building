// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, ValidateParams } from '@/presentation/decorators'
// < Out: only domain layer
import { PlanEntity } from '@/domain/entities'
import { GetPlanUseCase } from '@/domain/usecases'
import { EntityNotFoundError } from '@/presentation/errors'

@Injectable()
export class GetPlanController implements Controller<undefined, PlanEntity> {

  constructor (
    @Inject() private readonly getPlanUseCase: GetPlanUseCase,
  ) { }

  @ValidateParams<undefined, PlanEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest<undefined>): HandleResponse<PlanEntity> {
    const id = request.params?.id as PlanEntity['id']

    const plan = await this.getPlanUseCase.call(id)
    if (!plan)
      return notFound(new EntityNotFoundError('Plan'))

    return ok(plan)
  }
}