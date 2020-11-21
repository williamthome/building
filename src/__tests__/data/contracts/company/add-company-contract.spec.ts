import container from '@/shared/dependency-injection'
import { AddCompanyContract } from '@/data/contracts'
import { AddCompanyRepositorySpy } from '@/__tests__/data/__spys__'
import { mockCompanyModelDto } from '@/__tests__/data/__mocks__/models'

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
    container.clear()
    container.bind('addCompanyRepository').asNewable(AddCompanyRepositorySpy)
    container.bind(AddCompanyContract).asNewable(AddCompanyContract)
  })

  describe('AddCompany Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addCompanyRepositorySpy } = makeSut()
      const dto = mockCompanyModelDto()
      await sut.call(dto)
      expect(addCompanyRepositorySpy.companyDto).toEqual(dto)
    })

    it('should throw if method throws', async () => {
      const { sut, addCompanyRepositorySpy } = makeSut()
      addCompanyRepositorySpy.shouldThrow = true
      await expect(sut.call(mockCompanyModelDto())).rejects.toThrow()
    })
  })

  it('shold return a new company', async () => {
    const { sut, addCompanyRepositorySpy } = makeSut()
    const company = await sut.call(mockCompanyModelDto())
    expect(company).toBeTruthy()
    expect(company).toEqual(addCompanyRepositorySpy.companyModel)
  })
})