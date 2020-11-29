// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError } from '@/presentation/decorators'
// < Out: only domain layer
import { PlanEntity } from '@/domain/entities'
import { GetAllPlansUseCase } from '@/domain/usecases'

@Injectable()
export class GetAllPlansController implements Controller<undefined, PlanEntity[]> {

  constructor (
    @Inject() private readonly getAllPlansUseCase: GetAllPlansUseCase
  ) { }

  @HandleError
  async handle (): HandleResponse<PlanEntity[]> {
    const plans = await this.getAllPlansUseCase.call()
    return ok(plans)
  }
}