// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
// < Out: only domain layer
import { Building, Company } from '@/domain/entities'
import { GetCompanyBuildingsUseCase } from '@/domain/usecases'

@InjectableController({
  usesTransaction: true
})
export class GetCompanyBuildingsController implements Controller<undefined, Building[]> {
  constructor(@Inject() private readonly getCompanyBuildingsUseCase: GetCompanyBuildingsUseCase) {}

  @HandleError
  async handle(request: HttpRequest): HandleResponse<Building[]> {
    const companyId = request.activeCompanyInfo?.id as Company['id']

    const buildings = await this.getCompanyBuildingsUseCase.call(companyId)

    return ok(buildings)
  }
}
