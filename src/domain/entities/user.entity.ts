import { addressSchema } from './nested'
import { ExtractSchema, object, string, boolean, pickSchema, email } from '../protocols/schema'
import { optional, reserved } from '../protocols'
import { entitySchema, ExtractEntity, ExtractUpdateDto } from '../protocols/entity.protocol'
import { Company } from './company.entity'
import { CompanyRole, UserFeatures } from '@/shared/constants'

export const userSchema = entitySchema({
  email: email().required(),
  password: string().required().minLength(6),
  verified: boolean<reserved>(),
  accessToken: string<reserved | optional>(),
  name: string().required(),
  address: object<optional>().schemas({
    ...addressSchema['schemas']
  }),
  activeCompanyId: string<reserved | optional>()
})

export type User = ExtractEntity<typeof userSchema>

export const createUserSchema = pickSchema(userSchema, ['email', 'password'])

export type CreateUserDto = ExtractSchema<typeof createUserSchema>

export type UpdateUserDto = ExtractUpdateDto<typeof userSchema>

export interface UserRights {
  company: Pick<Company, 'id' | 'members'>
  role: CompanyRole
  features: UserFeatures
}

/// AUTHENTICATION ------------------------------------------------------- >>>>

export const authenticationSchema = pickSchema(userSchema, ['email', 'password'])

export type Authentication = ExtractSchema<typeof authenticationSchema>