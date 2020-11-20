// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { ServerErrorHandler, ValidateRequest } from '@/presentation/decorators'
// < Out: only domain layer
import { CompanyEntity, companyKeys } from '@/domain/entities'
import { AddCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable()
export class AddCompanyController implements Controller<CompanyEntity> {

  constructor (
    @Inject() private readonly addCompanyUseCase: AddCompanyUseCase
  ) { }

  @ServerErrorHandler
  @ValidateRequest<CompanyDto, CompanyEntity>({
    schema: companySchema,
    keys: companyKeys,
    nullable: false
  })
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const companyDto = request.body as CompanyDto
    const newCompany = await this.addCompanyUseCase.call(companyDto)
    return ok(newCompany)
  }
}