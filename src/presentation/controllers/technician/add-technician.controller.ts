// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { Technician, Company, technicianSchema, CreateTechnicianDto } from '@/domain/entities'
import { AddTechnicianUseCase } from '@/domain/usecases'

@InjectableController()
export class AddTechnicianController implements Controller<CreateTechnicianDto, Technician> {

  constructor (
    @Inject()
    private readonly addTechnicianUseCase: AddTechnicianUseCase
  ) { }

  @HandleError
  @Validate({
    planLimitFor: 'technician',
    body: {
      schema: technicianSchema
    }
  })
  async handle (request: HttpRequest<CreateTechnicianDto>): HandleResponse<Technician> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const createTechnicianDto = request.body as CreateTechnicianDto

    const createdTechnician = await this.addTechnicianUseCase.call(createTechnicianDto, activeCompanyId)

    return ok(createdTechnician)
  }
}