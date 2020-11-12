import { UserEntity } from '../entities'

export type UserDto = Partial<Omit<UserEntity, 'id'>>