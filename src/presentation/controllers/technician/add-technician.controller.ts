// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { technicianSchema } from '@/presentation/schemas'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { TechnicianEntity, technicianKeys, CompanyEntity } from '@/domain/entities'
import { AddTechnicianUseCase } from '@/domain/usecases'
import { TechnicianEntityDto } from '@/domain/protocols'

@InjectableController()
export class AddTechnicianController implements Controller<TechnicianEntityDto, TechnicianEntity> {

  constructor (
    @Inject()
    private readonly addTechnicianUseCase: AddTechnicianUseCase
  ) { }

  @HandleError
  @Validate<TechnicianEntityDto, TechnicianEntity>({
    planLimitFor: 'technician',
    body: {
      schema: technicianSchema,
      keys: technicianKeys
    }
  })
  async handle (request: HttpRequest<TechnicianEntityDto>): HandleResponse<TechnicianEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const requestTechnicianDto = request.body as TechnicianEntityDto

    const createdTechnician = await this.addTechnicianUseCase.call(requestTechnicianDto, activeCompanyId)

    return ok(createdTechnician)
  }
}