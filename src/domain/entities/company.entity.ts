import { reserved } from '../protocols'
import { entitySchema, ExtractDto, ExtractEntity, ExtractUpdateDto } from '../protocols/entity.protocol'
import { string, array } from '../protocols/schema'
import { Member } from './nested'

export const companySchema = entitySchema({
  planId: string().required(),
  name: string().required(),
  members: array<Member, reserved>().nonWritable()
})

export type Company = ExtractEntity<typeof companySchema>

export type CreateCompanyDto = ExtractDto<typeof companySchema>

export type UpdateCompanyDto = ExtractUpdateDto<typeof companySchema, 'planId'>

// export type CompanyMembers = ExtractEntity<typeof companySchema, 'name' | 'planId'>