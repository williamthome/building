// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, ok } from '@/presentation/factories/http.factory'
import { technicianSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { TechnicianEntity, technicianKeys, CompanyEntity, PlanEntity } from '@/domain/entities'
import { AddTechnicianUseCase, GetCompanyTechnicianCountUseCase } from '@/domain/usecases'
import { TechnicianEntityDto } from '@/domain/protocols'
import { PlanLimitExceededError } from '@/presentation/errors'

@Injectable()
export class AddTechnicianController implements Controller<TechnicianEntityDto, TechnicianEntity> {

  constructor (
    @Inject()
    private readonly getCompanyTechnicianCountUseCase: GetCompanyTechnicianCountUseCase,

    @Inject()
    private readonly addTechnicianUseCase: AddTechnicianUseCase
  ) { }

  @Validate<TechnicianEntityDto, TechnicianEntity>({
    body: {
      schema: technicianSchema,
      keys: technicianKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<TechnicianEntityDto>): HandleResponse<TechnicianEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const activeCompanyPlanLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']

    if (activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyTechnicianCount = await this.getCompanyTechnicianCountUseCase.call(activeCompanyId)
      if (activeCompanyTechnicianCount === activeCompanyPlanLimits.technician)
        return forbidden(new PlanLimitExceededError('technicians'))
    }

    const requestTechnicianDto = request.body as TechnicianEntityDto

    const createdTechnician = await this.addTechnicianUseCase.call(requestTechnicianDto, activeCompanyId)

    return ok(createdTechnician)
  }
}