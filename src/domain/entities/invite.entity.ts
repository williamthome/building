import { UserFeatures } from '@/shared/constants'
import {
  entitySchema,
  ExtractDto,
  ExtractEntity,
  entityIdSchema
} from '../protocols/entity.protocol'
import { email, number } from '../protocols/schema'

export const inviteSchema = entitySchema({
  from: entityIdSchema,
  to: email().required(),
  companyId: entityIdSchema,
  features: number<UserFeatures>().required()
})

export type Invite = ExtractEntity<typeof inviteSchema>

export type CreateInviteDto = ExtractDto<typeof inviteSchema>
