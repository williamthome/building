import { Company } from '@/domain/entities'
import { GetCompanyByIdUseCase } from '@/domain/usecases'
import { mockCompany } from '@/__tests__/domain/__mocks__/entities'

export class GetCompanyByIdUseCaseSpy implements GetCompanyByIdUseCase {
  id?: Company['id']
  company?: Company | null
  override?: Partial<Company>
  shouldReturnNull = false
  shouldThrow = false

  call = async (id: Company['id']): Promise<Company | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.company = this.shouldReturnNull ? null : { ...mockCompany(), id, ...this.override }

    return this.company
  }
}
