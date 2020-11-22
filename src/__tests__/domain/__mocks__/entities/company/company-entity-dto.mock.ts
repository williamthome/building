import fakeData from '@/__tests__/shared/fake-data'
import { CompanyEntity, UserEntity } from '@/domain/entities'
import { CompanyRole, UserFeatures } from '@/shared/constants'

export const mockCompanyEntityDto = (owner?: UserEntity): Omit<CompanyEntity, 'id'> => ({
  name: fakeData.person.fullName(),
  members: [{
    userId: owner ? owner.id : fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }]
})