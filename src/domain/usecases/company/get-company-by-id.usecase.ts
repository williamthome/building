import { Company } from '@/domain/entities'

export interface GetCompanyByIdUseCase {
  call: (id: Company['id']) => Promise<Company | null>
}