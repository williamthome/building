import { ExtractDto, ExtractEntity, ExtractUpdateDto } from '@/domain/protocols/entity.protocol'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { Schema, string, number } from '../../protocols/schema'

export const memberSchema = new Schema({
  userId: string().required(),
  companyRole: number<CompanyRole>().required(),
  features: number<UserFeatures>().required()
})

export type Member = ExtractEntity<typeof memberSchema>

export type CreateMemberDto = ExtractDto<typeof memberSchema>

export type UpdateMemberDto = ExtractUpdateDto<typeof memberSchema, 'userId'>
