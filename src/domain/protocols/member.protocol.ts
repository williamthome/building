import { MemberEntity } from '../entities/nested'

export type MemberEntityDto = Partial<Omit<MemberEntity, 'userId'>>