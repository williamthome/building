import { Company } from '@/domain/entities'

export interface DeleteCompanyUseCase {
  call: (id: Company['id']) => Promise<Company | null>
}