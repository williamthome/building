// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
// < Out: only domain layer
import { PlanEntity } from '@/domain/entities'
import { GetAllPlansUseCase } from '@/domain/usecases'

@InjectableController()
export class GetAllPlansController implements Controller<undefined, PlanEntity[]> {

  constructor (
    @Inject() private readonly getAllPlansUseCase: GetAllPlansUseCase
  ) { }

  @HandleError
  async handle (): HandleResponse<PlanEntity[]> {
    const allPlans = await this.getAllPlansUseCase.call()

    return ok(allPlans)
  }
}