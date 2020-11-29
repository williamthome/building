import fakeData from '@/__tests__/shared/fake-data'
import { CompanyEntity } from '@/domain/entities'
import { CompanyRole, UserFeatures } from '@/shared/constants'

export const mockCompanyEntity = (companyDto?: Partial<Omit<CompanyEntity, 'id'>>): CompanyEntity => ({
  id: fakeData.entity.id(),
  planId: fakeData.entity.id(),
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }],
  ...companyDto
})