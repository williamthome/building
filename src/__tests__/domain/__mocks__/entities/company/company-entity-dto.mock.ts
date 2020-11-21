import fakeData from '@/__tests__/shared/fake-data'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const mockCompanyEntityDto = (): Omit<CompanyEntity, 'id'> => ({
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    role: 'owner',
    features: UserFeatures.None
  }]
})