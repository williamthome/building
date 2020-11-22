import { CompanyEntity } from '@/domain/entities'
import { GetCompanyByIdUseCase } from '@/domain/usecases'
import { mockCompanyEntity } from '@/__tests__/domain/__mocks__/entities'

export class GetCompanyByIdUseCaseSpy implements GetCompanyByIdUseCase {
  id?: CompanyEntity['id']
  companyEntity?: CompanyEntity | null
  override?: Partial<CompanyEntity>
  shouldReturnNull = false
  shouldThrow = false

  call = async (id: CompanyEntity['id']): Promise<CompanyEntity | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.companyEntity = this.shouldReturnNull
      ? null
      : { ...mockCompanyEntity(), id, ...this.override }

    return this.companyEntity
  }
}