import container from '@/shared/dependency-injection'
import { AddCompanyContract } from '@/data/contracts'
import { AddCompanyRepositorySpy } from '@/__tests__/data/__spys__'
import { mockCreateCompanyData } from '@/__tests__/data/__mocks__/models'
import fakeData from '@/__tests__/shared/fake-data'
import { CompanyRole, UserFeatures } from '@/shared/constants'

//#region Factories

interface SutTypes {
  sut: AddCompanyContract
  addCompanyRepositorySpy: AddCompanyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCompanyRepositorySpy = container.resolve<AddCompanyRepositorySpy>('addCompanyRepository')
  const sut = container.resolve(AddCompanyContract)
  return {
    sut,
    addCompanyRepositorySpy
  }
}

//#endregion Factories

describe('AddCompany Contract', () => {
  beforeEach(() => {
    container.define('addCompanyRepository').asNewable(AddCompanyRepositorySpy).done()
    container.define(AddCompanyContract).asNewable(AddCompanyContract).done()
  })

  describe('AddCompany Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addCompanyRepositorySpy } = makeSut()
      const dto = mockCreateCompanyData()
      const loggedUserId = fakeData.entity.id()
      await sut.call(dto, loggedUserId)
      dto.members = [{
        userId: loggedUserId,
        companyRole: CompanyRole.owner,
        features: UserFeatures.None
      }]
      expect(addCompanyRepositorySpy.dto).toEqual(dto)
    })

    it('should throw if method throws', async () => {
      const { sut, addCompanyRepositorySpy } = makeSut()
      addCompanyRepositorySpy.shouldThrow = true
      await expect(sut.call(mockCreateCompanyData(), fakeData.entity.id())).rejects.toThrow()
    })
  })

  it('shold return a new company', async () => {
    const { sut, addCompanyRepositorySpy } = makeSut()
    const company = await sut.call(mockCreateCompanyData(), fakeData.entity.id())
    expect(company).toBeTruthy()
    expect(company).toEqual(addCompanyRepositorySpy.company)
  })
})