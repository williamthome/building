// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Company, companySchema, CreateCompanyDto, User } from '@/domain/entities'
import {
  AddCompanyUseCase,
  GetPlanByIdUseCase,
  UpdateUserActiveCompanyUseCase
} from '@/domain/usecases'

@InjectableController({
  usesTransaction: true
})
export class AddCompanyController implements Controller<CreateCompanyDto, Company> {
  constructor(
    @Inject()
    private readonly getPlanByIdUseCase: GetPlanByIdUseCase,

    @Inject()
    private readonly addCompanyUseCase: AddCompanyUseCase,

    @Inject()
    private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) {}

  @HandleError
  @Validate({
    body: {
      schema: companySchema
    }
  })
  async handle(request: HttpRequest<CreateCompanyDto>): HandleResponse<Company> {
    const loggedUserId = request.loggedUserInfo?.id as User['id']
    const createCompanyDto = request.body as CreateCompanyDto
    const { planId } = createCompanyDto

    const findedPlan = await this.getPlanByIdUseCase.call(planId)
    if (!findedPlan) return notFound(new EntityNotFoundError('Plan'))

    const createdCompany = await this.addCompanyUseCase.call(createCompanyDto, loggedUserId)

    await this.updateUserActiveCompanyUseCase.call(loggedUserId, createdCompany.id)

    return ok(createdCompany)
  }
}
