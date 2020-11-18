import { UserEntity } from '../entities'

export type UserDto = Partial<Omit<UserEntity, 'id'>>

export type AuthDto = Pick<UserEntity, 'email' | 'password'>