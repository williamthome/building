import fakeData from '@/__tests__/shared/fake-data'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const mockCompanyEntity = (companyDto?: Partial<Omit<CompanyEntity, 'id'>>): CompanyEntity => ({
  id: fakeData.entity.id(),
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    role: 'owner',
    features: UserFeatures.None
  }],
  ...companyDto
})